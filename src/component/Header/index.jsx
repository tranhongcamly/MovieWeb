import "./style.css";

import { Button, Col, Row, Space } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import flagusa from "../../assects/images/flagUSA.svg"
import flagvn from "../../assects/images/flagVN.svg"
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

function Navigation() {
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
      setChangeLang(true);
    }
    if (lang === "en") {
      flagEN.classList.add("active");
      flagVN.classList.remove("active");
      flagEN.style.backgroundColor = "white";
      flagEN.style.color = "black";
      flagVN.style.backgroundColor = "transparent";
      flagVN.style.color = "white";
      setChangeLang(false);
    }
  };

  return (
    <Row className="container">
      <Col className="navleft" span={20}>
        <p>
          <Link to="/" className="logo">
            TMDB
          </Link>
        </p>
        <p>{t("nav-movies")}</p>
        <p>{t("nav-tvshows")}</p>
        <p>
          <Link to={"/people"} style={{ color: "white" }}>
            {t("nav-people")}
          </Link>
        </p>
        <p>{t("nav-more")}</p>
      </Col>
      <Col className="navright" span={4}>
        {/* <div className="div-lang">
          <Button className='btn-vi' onClick={() => handleChangeLang('vi')}>VI</Button>
          <Button className='btn-en' onClick={() => handleChangeLang('en')}>EN</Button>
        </div> */}
        <Space className="lang">
          <Space className="la-vn" onClick={() => handleChangeLang("vi")}>
            <img src={flagvn} alt="" />
            <span>VIE</span>
          </Space>
          <Space className="la-usa" onClick={() => handleChangeLang("en")}>
            <img src={flagusa} alt="" />
            <span>ENG</span>
          </Space>
          </Space>
        <Button className="btn-search">
          <Link to="/search">
            <SearchOutlined />
          </Link>
        </Button>
      </Col>
    </Row>
  );
}

export default Navigation;
