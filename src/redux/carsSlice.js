import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://car-rental-api.goit.global/cars';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (
    { page = 1, limit = 8, brand = '', rentalPrice = '', minMileage = '', maxMileage = '' },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          page,
          limit,
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
        },
      });
      return { ...response.data, page }; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    selectedCar: null,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    filters: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' },
    page: 1,
    limit: 8,
    totalPages: 1,
    loading: false,
    isFetchingMore: false, 
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
    },
    resetItems: (state) => {
      state.items = [];
      state.page = 1;
    },
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter(id => id !== carId);
      } else {
        state.favorites.push(carId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    incrementPage: (state) => {
      if (state.page < state.totalPages) state.page += 1;
    },
    resetSelectedCar: (state) => {
      state.selectedCar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        state.error = null;

        
        if (action.meta.arg.page > 1) {
          state.isFetchingMore = true;
        } else {
          state.loading = true;
        }
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, totalPages, page } = action.payload;

        if (page > 1) {
          state.items = [...state.items, ...cars];
          state.isFetchingMore = false;
        } else {
          state.items = cars;
          state.loading = false;
        }

        state.totalPages = totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.isFetchingMore = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  resetItems,
  toggleFavorite,
  incrementPage,
  resetSelectedCar,
} = carsSlice.actions;

export default carsSlice.reducer;
