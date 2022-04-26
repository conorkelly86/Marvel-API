import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = "3aa86d938a10214b54013b56089dad10";

const url = "https://gateway.marvel.com:443/v1/public/characters";
const useFetchData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(url, {
          params: {
            apikey: API_KEY,
            limit: 100,
          },
        });
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchData;
