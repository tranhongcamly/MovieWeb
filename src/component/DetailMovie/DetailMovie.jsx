import "./style.css";

import { Button, Col, Modal, Row, Tooltip, Typography } from "antd";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Layout, Skeleton, Spin } from "antd";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Recommendations from "./Recommendations/Recommendations";
import YouTube from "react-youtube";
import imgPosterY from "../../assects/images/img-poster-y.jpg";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const { Header, Content } = Layout;
const { Text } = Typography;

function DetailMovie({
  data,
  t,
  changeLang,
  sliderRef,
  movieRef,
  handleScrollLeft,
  handleScrollRight,
}) {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [casts, setCasts] = useState([]);
  const [recs, setRecs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_DETAIL = `https://api.themoviedb.org/3/movie/${id}?api_key=9b00e03c6d53581effb063d999d11128&append_to_response=videos&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }`;
  const API_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9b00e03c6d53581effb063d999d11128&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }`;
  const API_REC = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=9b00e03c6d53581effb063d999d11128&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }&page=1`;
  const API_VIDEOS = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9b00e03c6d53581effb063d999d11128`;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(API_DETAIL)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        console.log("detail.backdrop_path", detail.backdrop_path);
      });
  }, [changeLang, id]);

  useEffect(() => {
    fetch(API_VIDEOS)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  useEffect(() => {
    fetch(API_CAST)
      .then((res) => res.json())
      .then((data) => {
        setCasts(data?.cast);
      });
  }, [changeLang, id]);

  useEffect(() => {
    fetch(API_REC)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecs(data?.results);
      });
  }, [changeLang, id]);

  const renderTrailer = () => {
    const trailer = videos?.results?.find(
      (vid) => vid.name === "Official Trailer"
    );
    return (
      <YouTube
        videoId={trailer ? trailer.key : videos?.results[0].key}
        opts={{
          width: "100%",
          height: "500",
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
    );
  };

  return (
    <div>
      <Layout>
        <Content>
          <Row justify={"center"}>
            <Col className="detail-container">
              {/* <Row style={{ padding: 20 }}></Row> */}
              {
                <Row
                  justify={"center"}
                  className="row-body"
                  style={{
                    backgroundImage:
                      detail.backdrop_path !== null &&
                      `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
                    backgroundPosition: "top right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: `${
                      detail.backdrop_path === null && "rgba(50, 48, 48, 0.453)"
                    }`,
                  }}
                >
                  <Col span={1}></Col>
                  <Col span={7} className="col-img">
                    {detail.poster_path === null ? (
                      <div className="img-posterX-null"></div>
                    ) : (
                      <img
                        src={`https://www.themoviedb.org/t/p/original${detail.poster_path}`}
                      ></img>
                    )}
                  </Col>
                  <Col span={15} className="col-detail">
                    <h1>{detail.title || detail.name}</h1>
                    <Button className="btn-playtrailer" onClick={showModal}>
                      <CaretRightOutlined className="icon-btn-playtrailer" />
                      {t("play-trailer")}
                    </Button>
                    <Modal
                      style={{ height: "1000px" }}
                      cancelButtonProps={{ style: { display: "none" } }}
                      okButtonProps={{ style: { display: "none" } }}
                      title={t("play-trailer")}
                      open={isModalOpen}
                      onCancel={handleCancel}
                      width={1000}
                    >
                      {videos?.results?.length !== 0 && isModalOpen === true ? (
                        renderTrailer()
                      ) : (
                        <Text>{t("video-err")}</Text>
                      )}
                    </Modal>
                    <p>
                      <i style={{ paddingTop: 30 }}>{detail.tagline}</i>
                    </p>
                    <h3>{t("overview")}</h3>
                    <p className="detail-overview">{detail.overview}</p>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              }
              <Row justify={"center"}>
                <Col span={1}></Col>
                <Col span={17} className="trending-container">
                  <h1>{t("top-billed-cast")}</h1>
                  <CastSlider
                    className="movieslider"
                    ref={sliderRef}
                    style={
                      casts && casts?.length > 0
                        ? {
                            gridTemplateColumns: `repeat(${casts?.length}, 150px)`,
                          }
                        : {}
                    }
                  >
                    {casts?.length !== 0 ? (
                      casts?.map((cast) => (
                        <Link to={`/person/${cast.id}`} key={cast.id}>
                          <div
                            className="movieitem1"
                            ref={movieRef}
                            style={{ color: "white" }}
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                              alt=""
                            />
                            <div className="moviename1">
                              <p>{cast.name}</p>
                              <p>{cast.character}</p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <></>
                    )}
                  </CastSlider>
                  {data?.length !== 0 ? (
                    <>
                      <div className="btnleft1" onClick={handleScrollLeft}>
                        <CaretLeftOutlined className="icon" />
                      </div>
                      <div className="btnright1" onClick={handleScrollRight}>
                        <CaretRightOutlined className="icon" />
                      </div>
                    </>
                  ) : (
                    <div style={{ color: "black" }}>{t("no-data")}</div>
                  )}
                  <Recommendations recs={recs} t={t} />
                </Col>
                <Col span={5} style={{ marginLeft: 15, marginTop: 37 }}>
                  <Row justify={"left"} style={{ marginBottom: 15 }}>
                  <Col className="col-icon">
                    <Tooltip title="Facebook" color="#001529">
                      <FacebookOutlined />
                    </Tooltip>
                  </Col>
                  <Col className="col-icon">
                    <Tooltip title="Twitter" color="#001529">
                      <TwitterOutlined />
                    </Tooltip>
                  </Col>
                  <Col className="col-icon">
                    <Tooltip title="Instagram" color="#001529">
                      <InstagramOutlined />
                    </Tooltip>
                </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("ori-title")}</h4>
                      <p>{detail.original_title}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("genres-movie")}</h4>
                      <p
                        style={{
                          display: "inline"
                        }}
                      >
                        {detail?.genres?.map((genre) => (
                          <span style={{marginRight: "10px"}}>{genre.name}</span>
                        ))}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("status-movie")}</h4>
                      <p>{detail.status}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("lang-movie")}</h4>
                      <p
                        style={{
                          display: "inline"
                        }}
                      >
                        {detail?.spoken_languages?.map((lang) => (
                          <span style={{marginRight: "10px"}}>{lang.name}</span>
                        ))}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("budget")}</h4>
                      <p>{`$ ${detail.budget}`}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("revenue")}</h4>
                      <p>{`$ ${detail.revenue}`}</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default DetailMovie;

const CastSlider = styled.div`
  &:hover .movieitem1 {
    opacity: 0.7;
  }
  .movieitem1 {
    &:hover {
      opacity: 1;
    }
  }
`;
