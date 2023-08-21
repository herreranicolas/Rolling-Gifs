import { useForm } from "react-hook-form";
import Toast from "./ui/Toast";

const SearchData = ({ setSearch, setOffset, INITIAL_OFFSET }) => {
  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const handleSearch = (data) => {
    const { search } = data;
    const searchedText = search.trim();
    if (searchedText.length < 3 || searchedText.length > 30) {
      if (searchedText === "") {
        Toast.fire({
          icon: "warning",
          iconColor: "#ffc107",
          title: "Oops! Looks like you forgot to enter a search term.",
        });
        return;
      }
      Toast.fire({
        icon: "warning",
        iconColor: "#ffc107",
        title: "Search must be between 3 and 30 characters.",
      });
      return;
    }
    setSearch(searchedText);
    setOffset(INITIAL_OFFSET);
    reset();
  };

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit(handleSearch)}>
      <input
        type="search"
        name="search"
        className="form-control form-control-dark text-dark"
        placeholder="Search GIFs..."
        aria-label="Search"
        maxLength={30}
        {...register("search", {})}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchData;
