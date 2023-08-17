import { useState } from "react";
import Banner from "./components/Banner";
import DataCard from "./components/DataCard";
import Navbar from "./components/Navbar";
import SearchData from "./components/SearchData";
import SelectData from "./components/SelectData";
import useFetch from "./hooks/useFetch";
import useSearch from "./hooks/useSearch";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_GIPHY_API_URL;
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const RollingGifs = () => {
  const { data: categories } = useFetch(
    `${API_URL}categories?api_key=${API_KEY}`
  );

  const [search, setSearch] = useState("cats");

  const { data } = useSearch(
    `${API_URL}search?api_key=${API_KEY}&q=${search}&limit=15&offset=0&rating=g&lang=es&bundle=messaging_non_clips`
  );

  const handleSelect = (e) => {
    const selectedCategory = e.target.value;
    setSearch(selectedCategory);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    if (searchText.length > 2) {
      // setSearch(searchText);
    }

    if (searchText === "java") {
      console.log(searchText);
    }
  };

  return (
    <>
      <Navbar />
      <Banner
        title="Explore, Laugh and Repeat!"
        description="Search, copy and share the best GIFs with your friends. Keep the fun rolling!"
      />
      <div className="mainSection">
        <div className="container pb-3">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <SelectData categories={categories} handleSelect={handleSelect} />
            </div>
            <div className="col-md-6">
              <SearchData handleSearch={handleSearch} />
            </div>
          </div>
        </div>
        <div className="container pb-3">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            <DataCard data={data} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
