import { useEffect, useState } from "react";

import React from "react";
import TVTopRated from "./TV Top Rated/TVTopRated";
import Trending from "./Trending/Trending";
import WhatPopular from "./What's Popular/WhatPopular";

function MoviesRow({
  changeLang,
  t,
  sliderRef,
  movieRef,
  handleScrollLeft,
  handleScrollRight,
}) {
  const API_TRENDING = `https://api.themoviedb.org/3/trending/all/day?api_key=9b00e03c6d53581effb063d999d11128&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }`;
  const API_TVTOPRATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=9b00e03c6d53581effb063d999d11128&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }&page=1`;
  const API_WHATPOPULAR = `https://api.themoviedb.org/3/tv/top_rated?api_key=9b00e03c6d53581effb063d999d11128&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }&page=1`;
  const [movies, setMovies] = useState([]);
  const [similarTVShow, setSimilarTVShow] = useState([]);
  const [whatpopular, setWhatpopular] = useState([]);

  // const fetchMovie = (api) => {
  //   fetch(api)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       return response?.results;
  //     });
  // };

  useEffect(() => {
    fetch(API_TRENDING)
      .then((res) => res.json())
      .then((response) => {
        setMovies(response?.results);
      });
  }, [changeLang]);
  useEffect(() => {
    fetch(API_TVTOPRATED)
      .then((res) => res.json())
      .then((response) => {
        setSimilarTVShow(response?.results);
      });
  }, [changeLang]);

  useEffect(() => {
    fetch(API_WHATPOPULAR)
      .then((res) => res.json())
      .then((response) => {
        setWhatpopular(response?.results);
      });
  }, [changeLang]);

  return (
    <div>
      <Trending
        data={movies}
        changeLang={changeLang}
        t={t}
        sliderRef={sliderRef}
        movieRef={movieRef}
        handleScrollLeft={handleScrollLeft}
        handleScrollRight={handleScrollRight}
      />
      <TVTopRated
        data={similarTVShow ? similarTVShow : []}
        changeLang={changeLang}
        t={t}
      />
      <WhatPopular
        data={whatpopular}
        changeLang={changeLang}
        t={t}
      />
    </div>
  );
}

export default MoviesRow;
