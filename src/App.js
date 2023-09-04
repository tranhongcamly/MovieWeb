import { Button, Col, Layout, Row, Space, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import {Route, Routes} from "react-router-dom"

import DetailMovie from "./component/DetailMovie/DetailMovie";
import DetailPeople from "./component/DetailPeople/DetailPeople";
import DetailTV from "./component/DetailTV/DetailTV";
import Footer from "./component/Footer/Footer";
import HomePage from "./component/HomePage";
import { Link } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import PopularMovies from "./pages/Movies/PopularMovies/PopularMovies";
import PopularPeople from "./component/Popular People/PopularPeople";
import PopularTV from "./pages/TV/PopularTV/PopularTV";
import Search from "./component/Search/Search";
import { SearchOutlined } from "@ant-design/icons";
import { SmoothHorizontalScrolling } from './component/Content/utils/index';
import flagusa from "./assects/images/flagUSA.svg";
import flagvn from "./assects/images/flagVN.svg";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";

const { Header, Content } = Layout;

function App() {
  const { t, i18n } = useTranslation();
  const [changeLang, setChangeLang] = useState(false);

  const flagVN = document.querySelector(".la-vn");
  const flagEN = document.querySelector(".la-usa");

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);

    if (lang === "vi") {
      flagVN.classList.add("active");
      flagEN.classList.remove("active");
      flagVN.style.backgroundColor = "white";
      flagVN.style.color = "black";
      flagEN.style.backgroundColor = "transparent";
      flagEN.style.color = "white";
      setChangeLang(!changeLang);
    }
    if (lang === "en") {
      flagEN.classList.add("active");
      flagVN.classList.remove("active");
      flagEN.style.backgroundColor = "white";
      flagEN.style.color = "black";
      flagVN.style.backgroundColor = "transparent";
      flagVN.style.color = "white";
      setChangeLang(!changeLang);
    }
  };

  const sliderRef = useRef()
  const movieRef = useRef()
  const handleScrollRight = () => {
    const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if(sliderRef.current.scrollLeft < maxScrollLeft){
      SmoothHorizontalScrolling(sliderRef.current,
        250,
        movieRef.current.clientWidth * 4,
        sliderRef.current.scrollLeft)
    }
  }
  const handleScrollLeft = () => {
    if(sliderRef.current.scrollLeft > 0){
      SmoothHorizontalScrolling(sliderRef.current,
        250,
        - movieRef.current.clientWidth * 4,
        sliderRef.current.scrollLeft)
    }
  }
  
  return (
    <div className="App">
      <Layout>
        <Header style={{boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"}}>
          <Row justify={"center"}>
            <Col span={2} />
            <Col span={20}>
              <Row className="container">
                <Col className="navleft" span={20}>
                  <p>
                    <Link to="/" className="logo">
                      TMDB
                    </Link>
                  </p>
                  <button className="btn-style2">
                    <Link to={"/movies-popular"} style={{ color: "white" }}>
                      {t("nav-movies")}
                    </Link>
                  </button>
                  <button className="btn-style2">
                    <Link to={"/tv-popular"} style={{ color: "white" }}>
                      {t("nav-tvshows")}
                    </Link>
                  </button>
                  <button className="btn-style2">
                    <Link to={"/people"} style={{ color: "white" }}>
                      {t("nav-people")}
                    </Link>
                  </button>
                  <button className="btn-style2">
                    <Link to={"/more"} style={{ color: "white" }}>{t("nav-more")}</Link>
                  </button>
                </Col>
                <Col className="navright" span={4}>
                  <Space className="lang">
                    <Space
                      className="la-vn"
                      onClick={() => handleChangeLang("vi")}
                    >
                      <img src={flagvn} alt="" />
                      <span>VIE</span>
                    </Space>
                    <Space
                      className="la-usa"
                      onClick={() => handleChangeLang("en")}
                    >
                      <img src={flagusa} alt="" />
                      <span>ENG</span>
                    </Space>
                  </Space>
                  <Tooltip title="Search" placement="bottom" color="#108ee9">
                    <Button className="btn-search">
                      <Link to="/search">
                        <SearchOutlined />
                      </Link>
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            </Col>
            <Col span={2} />
          </Row>
        </Header>
        <Content>
          <Row justify={"center"}>
            <Col span={2} />
            <Col span={20}>
              <Routes>
                <Route path="/" element={<HomePage t={t} i18n={i18n} changeLang={changeLang} sliderRef={sliderRef} 
                    movieRef={movieRef} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}/>} />
                <Route path="/search" element={<Search t={t} changeLang={changeLang}/>}/>
                <Route path="/movies-popular" element={<PopularMovies t={t} changeLang={changeLang}/>}/>
                <Route path="/tv-popular" element={<PopularTV t={t} changeLang={changeLang}/>}/>
                <Route path="/people" element={<PopularPeople t={t} changeLang={changeLang}/>}/>
                <Route path="/more" element={<NotFound t={t} changeLang={changeLang}/>}/>
              </Routes>
            </Col>
            <Col span={2} />
          </Row>
        </Content>
        <Routes>
          <Route path="/movie/:id" element={<DetailMovie t={t} changeLang={changeLang} sliderRef={sliderRef} 
                    movieRef={movieRef} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}/>}/>
          <Route path="/tv/:id" element={<DetailTV t={t} changeLang={changeLang} sliderRef={sliderRef} 
          movieRef={movieRef} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}/>}/>
          <Route path="/person/:id" element={<DetailPeople t={t} changeLang={changeLang} sliderRef={sliderRef} 
                    movieRef={movieRef} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}/>}/>
        </Routes>
        <Footer t={t}/>
      </Layout>
    </div>
  );
}

export default App;
