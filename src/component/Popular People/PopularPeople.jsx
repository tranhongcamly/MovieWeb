import {Card, Col, Pagination, Row, Spin} from 'antd';
import React, { useEffect, useState } from 'react'

import Footer from '../Footer/Footer';
import {Layout} from "antd"
import { Link } from 'react-router-dom';
import Navigation from '../Header';

const { Header, Content } = Layout;

function PopularPeople({t, changeLang}) {
    const [pageP, setPageP] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const API_PP_PEOPLE = `https://api.themoviedb.org/3/person/popular?api_key=9b00e03c6d53581effb063d999d11128&language=${
        changeLang === true ? "vi-VN" : "en-US"
    }&page=${pageP}`
    const [pppeople, setPppeople] = useState([])
    const [page, setPage] = useState('1')
    
    useEffect(() => {
        fetch(API_PP_PEOPLE)
        .then(res => res.json())
        .then(data => {
            console.log("pp_people", data)
            setPppeople(data.results)
            setTotalPages(data.total_pages);
        })
    }, [changeLang, pageP])

    const searchPage = async()=>{
        const url=`https://api.themoviedb.org/3/person/popular?api_key=9b00e03c6d53581effb063d999d11128&language=en-US&page=${page}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setPppeople(data.results);
    }

    const handleChange=(e)=>{
        setPage(e.target.value);
    }

  return (
    <div>
        <h1 style={{marginBottom: "0px"}}>{t("pp-people")}</h1>
        <Row justify={'center'}>
            <Col>
                <Card className='content-search' style={{marginTop: 40}}>
                        <Row className='grid' justify={"center"}>
                            {pppeople?.map((data) => (
                                    <Col span={5} className='grid-item' key={data.id}>
                                        <div className='grid-item-data'>
                                            <img src={`https://image.tmdb.org/t/p/original/${data.profile_path}`}></img>
                                            <div>
                                                <p style={{textAlign: "center"}}>{data.name}</p>
                                            </div>
                                        </div>
                                        <Link to={`/person/${data.id}`}>{t("view-more")}</Link>
                                    </Col>
                            ))}
                        
                        </Row>
                        <Row justify={"center"} style={{marginTop: 20}}>
                            <Col>
                                {
                                    pppeople?.length !== 0 ? 
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
    </div>
  )
}

export default PopularPeople