import "./style.css";

import {Button, Card, Col, Pagination, Row, Space, Spin} from "antd";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import React from "react";

function PopularTV({ changeLang, t }) {
    var [selectedGenres, setSelectedGenres] = useState([]);
    const [pageP, setPageP] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    
    const API_TV_POPULAR = `https://api.themoviedb.org/3/discover/tv?api_key=9b00e03c6d53581effb063d999d11128&with_genres=${selectedGenres}&language=${
        changeLang === true ? "vi-VN" : "en-US"
    }&page=${pageP}`

    const [TVPoular, setTVPopular] = useState();
    const [isFilters, setIsFilters] = useState(false)
    const [isChooseFilter, setIsChooseFilter] = useState(false)
    const [isNotChooseFilter, setIsNotChooseFilter] = useState(false)

    const genresTV =[
        {
            id: 10759,
            name: t("ge-tv-act-advent")
        },
        {
            id: 16,
            name: t("ge-mv-animation")
        },
        {
            id: 35,
            name: t("ge-mv-comedy")
        },
        {
            id: 80,
            name: t("ge-mv-crime")
        },
        {
            id: 99,
            name: t("ge-mv-documentary")
        },
        {
            id: 18,
            name: t("ge-mv-drama")
        },
        {
            id: 10751,
            name: t("ge-mv-family")
        },
        {
            id: 10762,
            name: t("ge-tv-act-kid")
        },
        {
            id: 9648,
            name: t("ge-mv-mystery")
        },
        {
            id: 10763,
            name: t("ge-tv-act-new")
        },
        {
            id: 10764,
            name: t("ge-tv-act-real")
        },
        {
            id: 10765,
            name: t("ge-tv-act-sci")
        },
        {
            id: 10766,
            name: t("ge-tv-act-soap")
        },
        {
            id: 10767,
            name: t("ge-tv-act-talk")
        },
        {
            id: 10768,
            name: t("ge-tv-act-war")
        },
        {
            id: 37,
            name: t("ge-mv-western")
        }
    ];

    useEffect(() => {
        fetch(API_TV_POPULAR)
            .then((res) => res.json())
            .then((response) => {
                setTVPopular(response);
                setTotalPages(response.total_pages);
            });
    }, [changeLang, API_TV_POPULAR, TVPoular, pageP]);

    
    const handleGenreClick = (genreId) => {
        setIsFilters(true);
        if(selectedGenres.length == 0){
            selectedGenres.push(genreId);
        }
        else
        {
            if(selectedGenres.includes(genreId)){
                selectedGenres.forEach((id, idx) => {
                    if(id == genreId){
                        selectedGenres.splice(idx, 1);
                        setIsNotChooseFilter(true);
                    }
                })
            }else{
                selectedGenres.push(genreId);
            }
        }
        
        if(selectedGenres.length !== 0){   
            selectedGenres.forEach(id => {
                if(id === genreId){
                    setIsChooseFilter(true);
                }
            })
        }
        setTVPopular(TVPoular);
        console.log(selectedGenres)
    };

    const clearFilter = () => {
        selectedGenres = [];
        setSelectedGenres(selectedGenres);
        handleGenreClick();
        setIsFilters(false);
        setTVPopular(TVPoular);
        setIsChooseFilter(false);
    }

    return(
        <>
            <h1 style={{marginLeft: "30px", marginBottom: "0px"}}>{t("pp-tvs")}</h1>
            <Space>
                <Row gutter={20} style={{marginTop: "40px"}} justify={'center'}>
                    <Col span={5}>
                        <Card title={t("filter")}>
                            <h3 className="title-genres">{t("type")}</h3>
                            {
                                genresTV.map((genre) => (
                                    <Button className={((isChooseFilter === true || isNotChooseFilter === true) && selectedGenres.includes(genre.id) === true)? "tag-genre-choose" : "tag-genre"} key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                                        {t(genre.name)}
                                    </Button>
                                ))
                            }
                            {
                                isFilters === true && <Button className="btn-clear" onClick={clearFilter}>{t("clear")}</Button>
                            }
                        </Card>
                    </Col>
                    <Col span={18}>
                        <Row justify={'center'}>
                            <Col>
                                <Card className='content-search'>
                                    <Row className='grid' justify={"center"}>
                                        {TVPoular?.results?.map((tv) => (
                                            <Col span={5} className='grid-item' key={tv.id}>
                                                <div className='grid-item-movie'>
                                                    <img src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}></img>
                                                    <div className='movieName'>{tv.title || tv.name}</div>
                                                </div>
                                                <Link to={`/tv/${tv.id}`}>{t("view-more")}</Link>
                                            </Col>
                                        ))}
            
                                    </Row>
                                    <Row justify={"center"} style={{marginTop: 20}}>
                                        <Col>
                                            {
                                                TVPoular?.length !== 0 ? 
                                                (
                                                    <Pagination 
                                                        showTotal={(total, range) => {
                                                            return range[0] >= total
                                                                ? `1 - ${total} of ${total}`
                                                                : `${range[0]}-${range[1]} of ${total}`;
                                                            }}
                                                            onChange={(e) => {
                                                                setPageP(e);
                                                            }}
                                                            defaultCurrent={pageP}
                                                            current={pageP}
                                                            pageSize={10}
                                                            total={totalPages}
                                                            showSizeChanger={false}
                                                            showQuickJumper
                                                    />
                                                )
                                                :
                                                (
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
                                                )
                                            }
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Space>
        </>
    ) 
}

export default PopularTV;
