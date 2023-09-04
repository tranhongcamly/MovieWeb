import "./style.css";

import { Button, Col, Modal, Row, Tooltip, Typography } from "antd";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import { Link } from "react-router-dom";
import Recommendations from "./Recommendations/RecommentTV";
import YouTube from "react-youtube";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const { Header, Content } = Layout;
const { Text } = Typography;

function DetailTV({
  data,
  t,
  changeLang,
  sliderRef,
  movieRef,
  handleScrollLeft,
  handleScrollRight,
}) {
  const { id } = useParams();
  const [detailTV, setDetailTV] = useState({});
  const [castsTV, setCastsTV] = useState([]);
  const [recsTV, setRecsTV] = useState([]);
  const [videosTV, setVideosTV] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_DETAIL_TV = `https://api.themoviedb.org/3/tv/${id}?api_key=9b00e03c6d53581effb063d999d11128&append_to_response=videos&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }`;
  const API_CAST_TV = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=9b00e03c6d53581effb063d999d11128&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }`;
  const API_REC_TV = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=9b00e03c6d53581effb063d999d11128&language=${
    changeLang === true ? "vi-VN" : "en-US"
  }&page=1`;
  const API_VIDEOS_TV = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=9b00e03c6d53581effb063d999d11128`;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(API_DETAIL_TV)
      .then((res) => res.json())
      .then((data) => {
        setDetailTV(data);
        console.log(data)
      });
  }, [changeLang, id]);

  useEffect(() => {
    fetch(API_VIDEOS_TV)
      .then((res) => res.json())
      .then((data) => {
        setVideosTV(data);
      });
  }, []);

  useEffect(() => {
    fetch(API_CAST_TV)
      .then((res) => res.json())
      .then((data) => {
        setCastsTV(data?.cast);
      });
  }, [changeLang, id]);

  useEffect(() => {
    fetch(API_REC_TV)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecsTV(data?.results);
      });
  }, [changeLang, id]);

  const renderTrailer = () => {
    const trailer = videosTV?.results?.find(
      (vid) => vid.name === "Official Trailer"
    );
    return (
      <YouTube
        videoId={trailer ? trailer.key : videosTV?.results[0].key}
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
                      detailTV.backdrop_path !== null &&
                      `url(https://image.tmdb.org/t/p/original${detailTV.backdrop_path})`,
                    backgroundPosition: "top right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: `${
                      detailTV.backdrop_path === null && "rgba(50, 48, 48, 0.453)"
                    }`,
                  }}
                >
                  <Col span={1}></Col>
                  <Col span={7} className="col-img">
                    {detailTV.poster_path === null ? (
                      <div className="img-posterX-null"></div>
                    ) : (
                      <img
                        src={`https://www.themoviedb.org/t/p/original${detailTV.poster_path}`}
                      ></img>
                    )}
                  </Col>
                  <Col span={15} className="col-detail">
                    <h1>{detailTV.title || detailTV.name}</h1>
                    <Button className="btn-playtrailer" onClick={showModal}>
                      <CaretRightOutlined className="icon-btn-playtrailer"/>
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
                      {videosTV?.results?.length !== 0 && isModalOpen === true ? (
                        renderTrailer()
                      ) : (
                        <Text>{t("video-err")}</Text>
                      )}
                    </Modal>
                    <p>
                      <i style={{ paddingTop: 30 }}>{detailTV.tagline}</i>
                    </p>
                    <h3>{t("overview")}</h3>
                    <p className="detail-overview">{detailTV.overview}</p>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              }
              <Row justify={"center"}>
                <Col span={1}></Col>
                <Col span={17} className="trending-container">
                  <h1>{t("series-cast")}</h1>
                  <CastSlider
                    className="movieslider"
                    ref={sliderRef}
                    style={
                      castsTV && castsTV?.length > 0
                        ? {
                            gridTemplateColumns: `repeat(${castsTV?.length}, 150px)`,
                          }
                        : {}
                    }
                  >
                    {castsTV?.length !== 0 ? (
                      castsTV?.map((cast) => (
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
                  <Recommendations recsTV={recsTV} t={t} />
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
                      <h4>{t("status-movie")}</h4>
                      <p>{detailTV.status}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("network")}</h4>
                      {detailTV?.networks?.length !== 0 ?
                        detailTV?.networks?.map((network) => (
                          <img style={{width: "60px", height: "20px", marginRight: "5px"}} src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}/>
                        ))
                        : <p>-</p>
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("type")}</h4>
                      <p>{detailTV.type}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{t("lang-movie")}</h4>
                      {detailTV?.spoken_languages?.length !== 0 ?
                        detailTV?.spoken_languages?.map((lang) => (
                          <p>{lang.name}</p>
                        ))
                        : <p>-</p>
                      }
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

export default DetailTV;

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
