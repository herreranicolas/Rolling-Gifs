import { useEffect, useState } from "react";

const useSearch = (url, search) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasDataFetched, setHasDataFetched] = useState(false);
  const [currentSearch, setCurrentSearch] = useState(search);

  const getSearch = async () => {
    try {
      const response = await fetch(url);
      const { data: responseData, pagination: responsePagination } =
        await response.json();
      if (!hasDataFetched) {
        setData(responseData);
        setHasDataFetched(true);
      } else {
        setData((prevData) => [...prevData, ...responseData]);
      }
      setPagination(responsePagination);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [url]);

  useEffect(() => {
    if (currentSearch !== search) {
      setData([]);
    }
  }, [search]);

  return { data, pagination, isLoading, error };
};

export default useSearch;
