import { useState } from "react";
import Banner from "./components/Banner";
import DataCard from "./components/DataCard";
import Navbar from "./components/Navbar";
import SearchData from "./components/SearchData";
import SelectData from "./components/SelectData";
import useFetch from "./hooks/useFetch";
import useSearch from "./hooks/useSearch";
import Footer from "./components/Footer";
import Toast from "./components/ui/Toast";

const API_URL = import.meta.env.VITE_GIPHY_API_URL;
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const INITIAL_SEARCH = "cats";
const LIMIT = 15;
const INITIAL_OFFSET = 0;

export const RollingGifs = () => {
  const { data: categories } = useFetch(
    `${API_URL}categories?api_key=${API_KEY}`
  );

  const [search, setSearch] = useState(INITIAL_SEARCH);
  const [offset, setOffset] = useState(INITIAL_OFFSET);

  const { data } = useSearch(
    `${API_URL}search?api_key=${API_KEY}&q=${search}&limit=${LIMIT}&offset=${offset}&rating=g&bundle=messaging_non_clips`,
    search
  );

  const handleSelect = (e) => {
    const selectedCategory = e.target.value;
    setSearch(selectedCategory);
    setOffset(INITIAL_OFFSET);
  };

  const handleLoadMore = () => {
    const maxGifsToLoad = 100;
    if (offset < maxGifsToLoad) {
      setOffset((prevOffset) => prevOffset + LIMIT);
    } else {
      Toast.fire({
        iconColor: "#ffc107",
        icon: "warning",
        title: "Oh, sorry! You've reached the limit of loaded GIFs!",
      });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <div className="col-md-8">
              <SearchData
                setSearch={setSearch}
                setOffset={setOffset}
                INITIAL_OFFSET={INITIAL_OFFSET}
              />
            </div>
          </div>
        </div>
        <div className="container pb-3">
          {data.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                <DataCard data={data} />
              </div>
              <div className="text-center pt-4 pb-3">
                <button className="btn btn-light me-2" onClick={handleLoadMore}>
                  Load more
                </button>
                <button className="btn btn-light" onClick={handleBackToTop}>
                  Back to TOP
                  <span>
                    <i className="bi bi-arrow-up-circle ms-2"></i>
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="lead text-white">
                Oops, no matching GIFs! Try a different search or explore
                categories.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
