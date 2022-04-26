import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import md5 from "md5";
import { resourceLimits } from "worker_threads";
import { getDataApi } from "../utils/getDataApi";
import useFetchData from "../utils/useFetchData";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const API_KEY = "3aa86d938a10214b54013b56089dad10";

  const url =
    "https://gateway.marvel.com:443/v1/public/characters?offset=300&limit=100&apikey=3aa86d938a10214b54013b56089dad10";
  const [count, setCount] = useState(0);

  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState({});

  interface Person {
    name: string;
    person: string;
    id: any;
    description: string;
    thumbnail: any;
    apiKey: any;
  }

  useEffect(() => {
    fetch(url, {
      method: "GET",
      params: {
        apikey: API_KEY,
        limit: 10,
      },
    })
      .then((response) => response.json())
      .then((res) => setHeroes(res.data.results))
      .catch((err) => setError("ERROR FOUND: HAIL HYDRA"));
  }, []);
  console.log(heroes);
  return (
    <>
      <div className="flex justify-center ">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5  justify-center">
          {heroes.map((hero: Person) => (
            <>
              <div className="flex w-1/2 flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
                <img
                  src={hero.thumbnail.path + "." + hero.thumbnail.extension}
                  className=""
                />
                <div className="p-4">
                  <h1>{hero.name}</h1>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
