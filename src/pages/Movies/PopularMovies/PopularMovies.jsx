import "./style.css";

import {Button, Card, Col, Pagination, Row, Space, Spin} from "antd";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import React from "react";

function PopularMovies({ changeLang, t }) {
    var [selectedGenres, setSelectedGenres] = useState([]);
    const [pageP, setPageP] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    
    const API_MOVIES_POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=9b00e03c6d53581effb063d999d11128&with_genres=${selectedGenres}&language=${
        changeLang === true ? "vi-VN" : "en-US"
    }&page=${pageP}`

    const [moviesPoular, setMoviesPopular] = useState();
    const [isFilters, setIsFilters] = useState(false)
    const [isChooseFilter, setIsChooseFilter] = useState(false)
    const [isNotChooseFilter, setIsNotChooseFilter] = useState(false)

    const genres =[
        { id: 28, name: t("ge-mv-action") },
        { id: 12, name: t("ge-mv-adventure") },
        { id: 16, name: t("ge-mv-animation") },
        { id: 35, name: t("ge-mv-comedy") },
        { id: 80, name: t("ge-mv-crime") },
        { id: 99, name: t("ge-mv-documentary") },
        { id: 18, name: t("ge-mv-drama")},
        { id: 10751, name: t("ge-mv-family") },
        { id: 14, name: t("ge-mv-fantasy") },
        { id: 36, name: t("ge-mv-history")},
        { id: 27, name: t("ge-mv-horror") },
        { id: 10402, name: t("ge-mv-music") },
        { id: 9648, name: t("ge-mv-mystery") },
        { id: 10749, name: t("ge-mv-romance") },
        { id: 878, name: t("ge-mv-science") },
        { id: 10770, name: t("ge-mv-tvmovie") },
        { id: 53, name: t("ge-mv-thriller") },
        { id: 10752, name: t("ge-mv-war")},
        { id: 37, name: t("ge-mv-western") },
    ];

    useEffect(() => {
        fetch(API_MOVIES_POPULAR)
            .then((res) => res.json())
            .then((response) => {
                setMoviesPopular(response);
                console.log("response", response)
                setTotalPages(response.total_pages);
            });
    }, [changeLang, API_MOVIES_POPULAR, moviesPoular, pageP]);

    
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
        setMoviesPopular(moviesPoular);
        console.log(selectedGenres)
    };

    const clearFilter = () => {
        selectedGenres = [];
        setSelectedGenres(selectedGenres);
        handleGenreClick();
        setIsFilters(false);
        setMoviesPopular(moviesPoular);
        setIsChooseFilter(false);
    }

    return(
        <>
            <h1 style={{marginLeft: "30px", marginBottom: "0px"}}>{t("pp-movies")}</h1>
            <Space>
                <Row gutter={20} justify={'center'} style={{marginTop: "40px"}}>
                    <Col span={5}>
                        <Card title={t("filter")}>
                            <h3 className="title-genres">{t("genres-movie")}</h3>
                            {
                                genres.map((genre) => (
                                    <Button className={((isChooseFilter === true || isNotChooseFilter === true) && selectedGenres.includes(genre.id) === true)? "tag-genre-choose" : "tag-genre"} key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                                        {t(genre.name)}
                                    </Button>
                                ))
                            }
                            {
                                isFilters === true && <button className="btn-clear" onClick={clearFilter}>{t("clear")}</button>
                            }
                        </Card>
                    </Col>
                    <Col span={18}>
                        <Row justify={'center'}>
                            <Col>
                                <Card className='content-search'>
                                    <Row className='grid' justify={"center"}>
                                        {moviesPoular?.results?.map((movie) => (
                                            <Col span={5} className='grid-item' key={movie.id}>
                                                <div className='grid-item-movie'>
                                                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                                                    <div className='movieName'>{movie.title || movie.name}</div>
                                                </div>
                                                <Link to={`/movie/${movie.id}`}>{t("view-more")}</Link>
                                            </Col>
                                        ))}
            
                                    </Row>
                                    <Row justify={"center"} style={{marginTop: 20}}>
                                        <Col>
                                            {
                                                moviesPoular?.length !== 0 ? 
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

export default PopularMovies;
