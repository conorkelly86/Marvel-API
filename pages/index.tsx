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
  var marvelApiStart =
    "https://gateway.marvel.com:443/v1/public/characters?&apikey=";
  var marvelPublicKey = "3aa86d938a10214b54013b56089dad10";
  var marvelPrivateKey = "19a623ba37422d5c45fe99989a8e56f64dda3d0f";

  var ts = new Date().getTime();
  var hash = md5(ts + marvelPrivateKey + marvelPublicKey);
  var requestUrl =
    marvelApiStart + marvelPublicKey + "&ts=" + ts + "&hash=" + hash;
  const [heroes, setHeroes] = useState<any[]>([]);
  const [error, setError] = useState({});
  const [search, setSearch] = useState("");

  interface Person {
    name: string;
    person: string;
    id: any;
    description: string;
    thumbnail: any;
    apiKey: any;
  }

  useEffect(() => {
    fetch(requestUrl, {
      method: "GET",
      params: {
        apikey: marvelPublicKey,
      },
    })
      .then((response) => response.json())
      .then((res) => setHeroes(res.data.results))
      .catch((err) => setError("ERROR FOUND: HAIL HYDRA"));
  }, []);

  const filteredHeroes = heroes.filter((hero) => {
    return hero.name.toLowerCase().includes(search.toLowerCase());
  });
  console.log(heroes);
  return (
    <>
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-5 mr-4"
        ></button>
      </div>
      <div className="flex justify-center ">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5  justify-center">
          {filteredHeroes.map((hero: Person) => (
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
