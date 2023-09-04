import "./style.css";

import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

function Trending({
  data,
  t,
  sliderRef,
  movieRef,
  handleScrollLeft,
  handleScrollRight,
}) {
  return (
    <div className="trending-container">
      <h1>{t("trending")}</h1>
      <MoviesSlider
        className="movieslider"
        ref={sliderRef}
        style={
          data && data?.length > 0
            ? {
                gridTemplateColumns: `repeat(${data?.length}, 150px)`,
              }
            : {}
        }
      >
        {data?.length !== 0 ? (
          data?.map((data, index) => (
            <Link
              to={`/movie/${data.id}`}
              style={{ color: "white" }}
              key={index}
            >
              <div className="movieitem" ref={movieRef}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  alt=""
                />
                <div className="moviename">{data.title || data.name}</div>
              </div>
            </Link>
          ))
        ) : (
          <></>
        )}
      </MoviesSlider>
      {data?.length !== 0 ? (
        <>
          <div className="btnleft" onClick={handleScrollLeft}>
            <CaretLeftOutlined className="icon" />
          </div>
          <div className="btnright" onClick={handleScrollRight}>
            <CaretRightOutlined className="icon" />
          </div>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: "700",
            color: "rgb(90, 205, 243)",
            gap: "18px",
          }}
        >
          <Spin></Spin>
          {t("loading")}
        </div>
      )}
    </div>
  );
}

export default Trending;

const MoviesSlider = styled.div`
  &:hover .movieitem {
    opacity: 0.7;
  }
  .movieitem {
    &:hover {
      opacity: 1;
    }
  }
`;
