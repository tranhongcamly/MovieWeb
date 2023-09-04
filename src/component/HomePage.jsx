import "./style.css";

import React, { useState } from "react";

import MoviesRow from "./Content/MoviesRow";
import Slider from "./Content/Slider/Slider";

function HomePage({t, changeLang, sliderRef, movieRef, handleScrollLeft, handleScrollRight}) {

  return (
    <div>
      <Slider changeLang={changeLang} t={t}/>
      <MoviesRow changeLang={changeLang} t={t} sliderRef={sliderRef} movieRef={movieRef} 
                  handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}/>
    </div>
  );
}

export default HomePage;
