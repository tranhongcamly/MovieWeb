import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import imgPageNF from "../../assects/images/pageNF.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        margin: "15px 0px 0px 0px"
      }}
    >
      <img
        style={{width: "600px", margin: "15px 0px 15px 0px"}}
        src={imgPageNF}
        alt="page-not-found"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <p style={{width: "35%", textAlign: "center"}}>{t("page-not-found")}</p>
      <Button
        type="primary"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px"
        }}
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        <HomeOutlined /> {t("go-homepage")}
      </Button>
    </div>
  );
}

export default NotFound;
