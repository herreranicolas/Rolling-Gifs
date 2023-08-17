import { useEffect, useState } from "react";

const useSearch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSearch = async () => {
    try {
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [url]);

  return { data, isLoading, error };
};

export default useSearch;
