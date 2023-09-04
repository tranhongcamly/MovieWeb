import React from "react";
import { Col, Row } from "antd";
import footerItems from "./footerItems";
import "./style.css"

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-body">
        <Row justify={"center"}>
            <Col className="itemlogo">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"></img>
                <div>
                    <p>Hi!</p>
                </div>
            </Col>
            {footerItems.map((item, id) => (
                <Col key={id} className="footeritems">
                    <h3>{item.title}</h3>
                    {item.children.map((it, index) => (
                        <p key={index}>{it.item}</p>
                    ))}
                </Col>
            ))}
            <Col span={2}></Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
