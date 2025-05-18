import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.jsx';
import CatalogPage from './pages/Catalog/CatalogPage.jsx';
import CarDetailsPage from './pages/CarDetail/CarDetailsPage.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (

    <>

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;