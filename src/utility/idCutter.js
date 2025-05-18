function truncateId(id) {
    if (!id || id.length <= 12) return id;
    return `${id.slice(0, 8)}...${id.slice(-4)}`;
}
export default truncateId;  