import "./style.css"

import {Card, Col, Row, Tooltip} from "antd"
import {CaretLeftOutlined, CaretRightOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined} from '@ant-design/icons';
import {Layout, Space} from "antd"
import React, { useState } from 'react'

import Footer from '../Footer/Footer'
import {Link} from "react-router-dom"
import styled from "styled-components"
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const { Header, Content } = Layout;

function DetailPeople({
    t,
    changeLang,
    sliderRef,
    movieRef,
    handleScrollLeft,
    handleScrollRight,}) {

    const {id} = useParams()
    const [people, setPeople] = useState([])
    const [personMovie, setPersonMovie] = useState([])

    const API_PEOPLE = `https://api.themoviedb.org/3/person/${id}?api_key=9b00e03c6d53581effb063d999d11128&language=${
        changeLang === true ? "vi-VN" : "en-US"
    }`
    const API_PERSON_MOVIE = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=9b00e03c6d53581effb063d999d11128&language=${
        changeLang === true ? "vi-VN" : "en-US"
    }`
    
    useEffect(() => {
        fetch(API_PEOPLE)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPeople(data)
            console.log("people", data)
        })
    }, [changeLang])

    useEffect(() => {
        fetch(API_PERSON_MOVIE)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPersonMovie(data.cast)
        })
    }, [changeLang])

  return (
    <div>
        <Layout>
            <Content>
                {
                    <Card style={{marginTop: 40}}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={7} className="col-image">
                                <img src={`https://www.themoviedb.org/t/p/original/${people.profile_path}`} alt="" />
                                <Space className="spc-popular-pp">
                                    <Row justify={"left"} style={{paddingTop: 15}}>
                                        <Col className='col-icon'>
                                            <Tooltip title="Facebook" color="#001529">
                                                <FacebookOutlined />
                                            </Tooltip>
                                        </Col>
                                        <Col className='col-icon'>
                                            <Tooltip title="Twitter" color="#001529">
                                                <TwitterOutlined />
                                            </Tooltip>
                                        </Col>
                                        <Col className='col-icon'>
                                            <Tooltip title="Instagram" color="#001529">
                                                <InstagramOutlined />
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                    <h3 className='personInfo'>{t("pp-info")}</h3>
                                    <Row>
                                        <Col>
                                            <h4>{t("known-for")}</h4>
                                            <p>{people.known_for_department}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4>{t("gender")}</h4>
                                            <p>{people.gender === 2 ? t("male") : t("female")}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4>{t("birthday")}</h4>
                                            <p>{people.birthday}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4>{t("place-bthd")}</h4>
                                            <p>{people.place_of_birth}</p>
                                        </Col>
                                    </Row>
                                </Space>
                            </Col>
                            <Col span={14} className="col-content">
                                <h1>{people.name}</h1>
                                <h3>{t("bio")}</h3>
                                <p>{people.biography}</p>
                                <h3>{t("known-for-mv")}</h3>
                                <MoviesSlider id="style-scroll" className='movieslider4' ref={sliderRef}
                                style={
                                personMovie && personMovie.length > 0
                                ? {
                                    gridTemplateColumns: `repeat(${personMovie.length}, 150px)`
                                }
                                : {}
                                }
                                >
                                    {personMovie?.length !== 0 ? personMovie?.map((data, index) => (
                                    <Link to={`/movie/${data.id}`} style={{color: "white"}} key={index}>
                                        <div className='movieitem' ref={movieRef}>
                                        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="" />
                                        <div className='moviename'>{data.title || data.name}</div>
                                        </div>
                                    </Link>
                                    )) : <div style={{ color: "black" }}>{t("no-data")}</div>}
                        
                                </MoviesSlider>
                            </Col>
                            <Col span={3}></Col>
                        </Row>
                    </Card>
                }
            </Content>
        </Layout>
    </div>
  )
}

export default DetailPeople;;

const MoviesSlider = styled.div `
    &:hover .movieitem{
      opacity: 0.7;
    }
    .movieitem{

      &:hover{
        opacity: 1;
      }
    }
`