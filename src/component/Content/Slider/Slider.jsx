import "./style.css"

import {Button, Carousel, Form, Input} from "antd";
import { useEffect, useState } from 'react';

import {Link} from "react-router-dom";
import React from 'react'
import imgSlider1 from "../../../assects/images/slider-img-1.jpg";
import imgSlider2 from "../../../assects/images/slider-img-2.jpg";
import imgSlider3 from "../../../assects/images/slider-img-3.jpg";
import imgSlider4 from "../../../assects/images/slider-img-4.jpg";
import imgSlider5 from "../../../assects/images/slider-img-5.jpg";
import imgSlider6 from "../../../assects/images/slider-img-6.jpg";
import imgSlider7 from "../../../assects/images/slider-img-7.jpg";
import imgSlider8 from "../../../assects/images/slider-img-8.jpg";
import imgSlider9 from "../../../assects/images/slider-img-9.jpg";
import { t } from "i18next";

function Slider() {
  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  const contentStyle = {
    height: '300px',
    width: '100%',
  };

  const searchMovie = async()=>{
    const url=`https://api.themoviedb.org/3/search/movie?api_key=9b00e03c6d53581effb063d999d11128&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
}

  const handleChange=(e)=>{
      setQuery(e.target.value);
  }

  return (
    <div className='slider'>
      <Carousel autoplay>
        <div>
          <img style={contentStyle} src={imgSlider1} alt="Slider-Img-1" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider2} alt="Slider-Img-2" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider3} alt="Slider-Img-3" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider4} alt="Slider-Img-4" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider5} alt="Slider-Img-5" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider6} alt="Slider-Img-6" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider7} alt="Slider-Img-7" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider8} alt="Slider-Img-8" />
        </div>
        <div>
          <img style={contentStyle} src={imgSlider9} alt="Slider-Img-9" />
        </div>
      </Carousel>
      <div className="slider-body">
        <h1>{t("slider-welcome")}</h1>
        <h2>{t("slider-millions")}</h2>
        <Form className="slider-search"  
          // onFinish={searchMovie}
        >
            <Link to="/search">
              <Input.Group compact  style={{paddingTop: 40}}>
                <Input style={{ width: 'calc(100% - 100px)' }} className="input-slider" placeholder={t("slider-input")}
                  size="large"
                  value={query} onChange={handleChange}
                />
                <Button type="primary" className="slider-btn-search" size='large' onClick={searchMovie}><Link to={`/search/${query}`}>{t("slider-search")}</Link></Button>
              </Input.Group>
            </Link>
        </Form>
      </div>
    </div>
  )
}

export default Slider
