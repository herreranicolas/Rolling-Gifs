const SearchData = ({ handleSearch }) => {
  return (
    <input
      type="search"
      className=" form-control form-control-dark text-dark"
      placeholder="Search GIFs..."
      aria-label="Search"
      onChange={handleSearch}
    />
  );
};

export default SearchData;
