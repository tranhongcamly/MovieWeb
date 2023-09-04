import "./style.css"

import {Button, Card, Form, Input, Pagination, Spin} from "antd"
import {Col, Row} from "antd"
import { useEffect, useState } from 'react'

import {Link} from "react-router-dom"
import React from 'react'

function ContentSearch({t, changeLang}) {
    const [pageP, setPageP] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const API_URL=`https://api.themoviedb.org/3/movie/popular?api_key=9b00e03c6d53581effb063d999d11128&language=${
        changeLang === true ? "vi-VN" : "en-US"
    }&page=${pageP}`;
    const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=9b00e03c6d53581effb063d999d11128&query";
    
    const [movies, setMovies]=useState([]);
    const [query, setQuery]=useState('');

    // const showModal = (id) => {
    //     const newMovies = movies.filter((i) => i.id === id)
    //     if(movies.filter((i) => i.id === id))
    //     {
    //         setMovies([...newMovies])
    //         console.log("newMovies", newMovies)
    //         setIsModalOpen(true);
    //     }
    // };

    useEffect(() => {
        fetch(API_URL)
        .then((res)=>res.json())
        .then(data=>{
        console.log(data);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        })
    }, [query, changeLang, pageP])

    const searchMovie = async()=>{
        const url=`https://api.themoviedb.org/3/search/movie?api_key=9b00e03c6d53581effb063d999d11128&query=${query}&language=${
            changeLang === true ? "vi-VN" : "en-US"
        }&page=${pageP}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
            setTotalPages(data.total_pages);
    }

    const handleChange=(e)=>{
        setQuery(e.target.value);
    }

  return (
    <div>
        <div className='input-search'>
            <Form onFinish={searchMovie}>
                <Input.Group compact  style={{paddingTop: 40}}>
                    <Input style={{ width: 'calc(70% - 200px)' }} placeholder="Search for a movie, tv shows, person, ..."
                        size="large"
                        value={query} onChange={handleChange}
                    />
                    <Button type="primary" size='large'>Search</Button>
                </Input.Group>
            </Form>
        </div>
        <Row justify={'center'}>
            <Col>
                <Card className='content-search' style={{marginTop: 40}}>
                        <Row className='grid' justify={"center"}>
                            {movies.map((movie) => (
                                <Col span={5} className='grid-item' key={movie.id}>
                                    <div className='grid-item-movie'>
                                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                                        <div className='movieName'>{movie.title || movie.name}</div>
                                    </div>
                                    {/* <p><Button onClick={() => showModal(movie.id)}>View more</Button></p> */}
                                    <Link to={`/movie/${movie.id}`}>{t("view-more")}</Link>
                                </Col>
                            ))}
                        </Row>
                        <Row justify={"center"} style={{marginTop: 20}}>
                            <Col>
                                {
                                    movies?.length !== 0 ? 
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
                                        <div style={{ color: "black" }}>{t("no-data")}</div>
                                    )
                                }
                            </Col>
                        </Row>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default ContentSearch