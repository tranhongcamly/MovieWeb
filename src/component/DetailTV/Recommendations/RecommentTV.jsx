import "./style.css";

import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import React from "react";
import { SmoothHorizontalScrolling } from "../../Content/utils";
import styled from "styled-components";
import { useRef } from "react";

function Recommendations({ recsTV, t }) {
  
  const sliderRef = useRef();
  const movieRef = useRef();
  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        movieRef.current.clientWidth * 4,
        sliderRef.current.scrollLeft
      );
    }
  };
  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        -movieRef.current.clientWidth * 4,
        sliderRef.current.scrollLeft
      );
    }
  };
  return (
    <div className="trending-container2">
      <h1>{t("recomment")}</h1>
      <RecSlider
        className="movieslider2"
        ref={sliderRef}
        style={
          recsTV && recsTV?.length > 0
            ? {
                gridTemplateColumns: `repeat(${recsTV?.length}, 300px)`,
              }
            : {}
        }
      >
        {recsTV?.length !== 0 ? (
          recsTV?.map((rec, index) => (
            <Link to={`/movie/${rec.id}`} key={index}>
              <div className="movieitem2" ref={movieRef} style={{ color: "white" }}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${rec.backdrop_path}`}
                  alt=""
                />
                <div className="moviename2">{rec.title || rec.name}</div>
              </div>
            </Link>
          ))
        ) : (
          <></>
        )}
      </RecSlider>
      {recsTV?.length !== 0 ? (
        <>
          <div className="btnleft2" onClick={handleScrollLeft}>
            <CaretLeftOutlined className="icon" />
          </div>
          <div className="btnright2" onClick={handleScrollRight}>
            <CaretRightOutlined className="icon" />
          </div>
        </>
      ) : (
        <div style={{ color: "black" }}>{t("no-data")}</div>
      )}
    </div>
  );
}

export default Recommendations;

const RecSlider = styled.div`
  &:hover .movieitem2 {
    opacity: 0.7;
  }
  .movieitem2 {
    &:hover {
      opacity: 1;
    }
  }
`;
