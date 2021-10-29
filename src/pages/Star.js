import React from "react";
import axios from "axios";
import styled from "styled-components";
import dfs_xy_conv from "../transitionXY";
import {apis} from "../lib/axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import ic_sunny from "../img/main-star/weather/ic_sunny.svg";
import ic_finedust1 from "../img/main-star/weather/ic_finedust_1.svg";
import ic_umbrella from "../img/main-star/weather/ic_umbrella.svg";
import ic_humidity from "../img/main-star/weather/ic_humidity.svg";
import ic_moonrise from "../img/main-star/moon/ic_moonrise.svg";
import ic_moonset from "../img/main-star/moon/ic_moonset.svg";
import ic_star from "../img/main-star/ic_star.svg";
import ic_map from "../img/main-star/ic_map.svg";
import ic_location_off from "../img/main-star/ic_location_off.svg";

//임시 이미지
import image_sample from "../img/main-star/Rectangle 16.png";

const Star = () => {
    const [text, setText] = React.useState("지금 내 위치!");
    const [latitude, setLatitude] = React.useState();
    const [longitude, setLongitude] = React.useState();
    const [hour, setHour] = React.useState();


    const image = 'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg'

    //시간이 변하면 수행!
    const timeChange = ()=>{
        const thisTime = new Date();
        console.log("now time:::",thisTime.getHours());
        setHour(thisTime.getHours())
    }
    // setInterval(timeChange,1000)

    // React.useEffect(() => {
    //     alert("지금 시간이 바뀌었습니다!")
    // }, [hour])



    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const success = (x) => {
        const position = x.coords;
        const latitude = position.latitude;
        const longitude = position.longitude;
        // setText(position)
        console.log("위도 :::", latitude)
        console.log("경도 :::", longitude)

        setLatitude(latitude);
        setLongitude(longitude);
    }

    const error = (x) => {
        setText(x.code + ":::" + x.message);
    }

    React.useEffect(() => {
        const Number_ = dfs_xy_conv("toXY", 37.5330228, 127.0264359);
        setText("X: " + Number_.x + ", Y: " + Number_.y);
        console.log(Number_.x);
        console.log(Number_.y);
        if ('geolocation' in navigator) {
            /* 위치정보 사용 가능 */
            console.log("useEffect")
            navigator
                .geolocation
                .getCurrentPosition(success, error, options);

            const coord = new window
                .kakao
                .maps
                .LatLng(37.5330228, 127.0264359);

        } else {
            /* 위치정보 사용 불가능 */
            setText("확인할 수 없다 ㅠㅠ");

        }
        // window.naver.maps.Service.reverseGeocode({     location: new
        // window.naver.maps.LatLng(37.3595316, 127.1052133), }, function(status,
        // response) {     if (status !== window.naver.maps.Service.Status.OK) { return
        // alert('Something wrong!');     }     const result = response.result; 검색 결과의
        // 컨테이너        const items = result.items;  검색 결과의 배열
        // console.log("items:::",items)      do Something });

        const params = [Number_.x, Number_.y];

        axios
            .get('https://openapi.naver.com/v1/map/reversegeocode', {params})
            .then((res) => {
                console.log(res);
            })

        apis
            .getStarPhotoAX()
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err)
            });

        apis
            .getNoticeNowAX(1)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err)
            })

        }, [])

        const liArray = Array.from(new Array(11).keys())

    return (
        <React.Fragment>
            <div className="CommonPageStyle">
            <Header/>
            <StyledStar>
                <div>
                    <LocationBox className="contentsBox">
                        <img src={ic_map} alt="map icon"/>
                        <h3>서울시 강남구</h3>
                        <img src={ic_location_off} alt="location icon"/>
                    </LocationBox>
                    <WeatherBox className="contentsBox">
                        <WeatherTemperature>
                            <div>
                                <img src={ic_sunny} alt="weather logo"/>
                                <div className="temperature">
                                    <h3>10<span>°C</span></h3>
                                    <p>7° /  18°</p>
                                </div>
                            </div>
                            <p className="comment">맑음, 어제보다 2도 낮아요.</p>
                        </WeatherTemperature>
                        <span className="line"/>
                        <WeatherETC>
                            <section>
                                <h3>미세먼지</h3>
                                <img src={ic_finedust1} alt="finedust icon"/>
                                <p>13</p>
                            </section>
                            <section>
                                <h3>강수확률</h3>
                                <img src={ic_umbrella} alt="ultra finedust icon"/>
                                <p>40<span>%</span></p>
                            </section>
                            <section>
                                <h3>습도</h3>
                                <img src={ic_humidity} alt="humidity icon"/>
                                <p>20<span>%</span></p>
                            </section>
                        </WeatherETC>
                    </WeatherBox>
                    <VisiblityBox className="contentsBox" visiblity={5}>
                        <div className="title">
                            <img src={ic_star} alt="star icon"/>
                            <h3>관측지수</h3>
                            <p>별보기 좋은날</p>
                        </div>
                        <div className="bar">
                            <div><span/></div>
                            <ul>
                                {
                                    liArray.map((l,idx)=>{
                                        return(
                                            <li key={idx}>{l}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </VisiblityBox>
                    <MoonBox>
                        <section className="contentsBox">
                            <h3><img src={ic_moonrise} alt="moon icon"/>월출</h3>
                            <p>16:00</p>
                        </section>
                        <section className="contentsBox">
                            <h3><img src={ic_moonset} alt="moon icon"/>월몰</h3>
                            <p>6:00</p>
                        </section>
                    </MoonBox>
                </div>
                <div>
                    <ImageBox  className="contentsBox">
                        <button>?</button>
                        <img src={image_sample} alt="star" />
                    </ImageBox>
                    <EmptyBox className="contentsBox">
                        <h3>새로운 컨텐츠</h3>
                        <p>머가 있을고...ㅠ</p>
                    </EmptyBox>
                </div>
            </StyledStar>
            
            </div>
        </React.Fragment>
    )
}

const StyledStar = styled.main `

display: flex;
gap:24px;

& > div {
    display:flex; 
    flex-direction:column; 
    gap:20px;
}
& > div:first-child{width:32%;}
& > div:last-child{width:66%;}

.contentsBox{
    background: #303136;
    border-radius: 10px;
    width: 100%;
}
`

const LocationBox = styled.section`
display: flex;
align-items: center;
padding: 0 24px;
height: 68px;

    h3{
        width:100%;
        margin-left: 4px;
    }
`
const WeatherBox = styled.div`
height: 404px;

.line{
    width: 100%;
    padding: 0 24px;
    height: 1px;
    display: block;
    &::after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: #545454;
    }
}
`

const WeatherTemperature = styled.section`
padding: 40px 0;

& > div{
display: flex;
align-items: center;
justify-content: center;
margin-left: -5px;
gap:12px;
}

.temperature{
    h3{
        font-size: 52px;
        font-weight: 700;
        width: fit-content;
        height: 71px;
        line-height: 71px;
        text-align: right;
        position: relative;
        span{
            font-size: 28px;
            font-weight: 400;
            position: absolute;
            top:11px;
            right: -32px;
            width: 30px;
            height: 38px;
            line-height: 38px;
        }
    }
    p{
        font-size: 16px;
        margin-left: 8px;

    }
}
.comment{
    font-size: 18px;
    text-align: center;
    margin-top: 16px;
}
`

const WeatherETC = styled.div`
display: flex;
width: fit-content;
gap: 60px;
margin: 0 auto;
padding: 40px 0;
section{
    text-align: center;
    h3{
        font-size:14px;
        font-weight: 400;
    }
    img{
        margin: 8px 0;
    }
    p{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 27px;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 27px;
        gap:2px;
        span{
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            margin-top: 4px;
            display: block;
        }
    }
}
`

const VisiblityBox = styled.section`
height:146px;
padding: 32px 0;
.title{
    display: flex;
    align-items: center;
    margin-left: 16.5%;
    h3{
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #EFEFEF;
        margin-left: 4px;
    }
    p{
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #999999;
        margin-left: 12px;
    }
}
.bar{ 
    margin: 22px auto 0;
    &>div{
        width: 67%;
        height: 12px;
        background: white;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 auto;
        span{
            display: block;
            width: ${(props)=>props.visiblity*10}%;
            height: 12px;
            background-color: #418DFF;
        }
    }
}
ul{
    display: flex;
    width: 70%;
    justify-content: space-between;
    margin: 8px auto 0;
    li{
        font-size: 12px;
        color: #999999;
    }
    li:nth-child(${props=>Number(props.visiblity)+1}){
        color:white;
        font-weight: bold;
    }
}
`
const MoonBox = styled.div`
display: flex;
gap:20px;
    & > section {
        width:100%; 
        height:148px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    img{margin-right:5px;}
    h3{
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
    }
    p{
        font-size: 36px;
        margin-top: 12px;
        font-weight: 700;
    }
`

const ImageBox = styled.div`
height: 594px;
overflow: hidden;
position: relative;
button{
    position: absolute;
    bottom: 28px;
    right: 28px;
    width: 48px;
    height: 48px;
    background: #000;
    border-radius: 100%;
    font-size: 24px;
    line-height: 33px;
    border: none;
    color:white
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

`
const EmptyBox = styled.section`
height: 212px;
`


export default Star;