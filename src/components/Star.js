import React from "react";
import axios from "axios";
import styled from "styled-components";
import dfs_xy_conv from "../transitionXY";
import {apis} from "../lib/axios";

const Star = () => {
    const [text, setText] = React.useState("지금 내 위치!");
    const [latitude, setLatitude] = React.useState();
    const [longitude, setLongitude] = React.useState();

    const [photoData, setPhotoData] = React.useState(
        {"url": "", "starName": "", "comment": ""}
    )
    const [noticeData, setNoticeData] = React.useState({
        "moonrise": "",
        "moonset": "",
        "visibility": "",
        "humidity": "",
        "weather": "",
        "temperature": ""
    })

    const image = 'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg'

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

    return (
        <React.Fragment>
            <StyledPage background={image}>
                <div>

                    <section className="notice">
                        <div>
                            <h3>안내사항</h3>
                            <p></p>
                        </div>
                    </section>

                    <section className="data">
                        <div>
                            <h3>미세먼지</h3>
                            <p>공기 완전 안좋음</p>
                        </div>
                        <div>
                            <h3>온도</h3>
                            <p>섭씨</p>
                        </div>
                        <div>
                            <h3>가시거리</h3>
                            <p>km</p>
                        </div>
                        <div>
                            <h3>습도</h3>
                            <p>%</p>
                        </div>
                        <div>
                            <h3>날씨</h3>
                            <p>흐림</p>
                        </div>
                    </section>
                    <section className="moon">
                        <div>
                            <h3>월출</h3>
                            <p>시간</p>
                        </div>
                        <div>
                            <h3>월몰</h3>
                            <p>시간</p>
                        </div>
                    </section>
                    <img
                        src={image}
                        alt="별자리"/>
                        <section className="starInfo">
                            <h3>어쩌구자리</h3>
                            <p>어쩌구한 이유로 생긴 별자리이다.</p>
                        </section>
                        <section className="clientLocation">
                            <h3>현재위치</h3>
                            <p>{text}</p>
                        </section>
                </div>
                <span className="background"/>

            </StyledPage>
        </React.Fragment>
    )
}

const StyledPage = styled.article `
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0,0,0,.5);
display: flex;
align-items: center;
justify-content: center;

& > div {
    display: grid;
    width: 100%;
    max-width: 780px;
    height: 100%;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr 3fr .5fr .5fr;
    grid-gap: 20px;
    padding: 100px 20px 50px 20px;

    .notice{
        grid-column: 1/2;
        grid-row: 1/2;
    }
    .data{
        grid-column: 1/2;
        grid-row: 2/3;
    }
    .moon{
        grid-column: 1/2;
        grid-row: 3/5;
    }
    img{
        grid-column: 2/3;
        grid-row: 1/3;
        overflow: hidden;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 0;
    }
    .starInfo{
        grid-column: 2/3;
        grid-row: 3/4;
    }
    .clientLocation{
        grid-column: 2/3;
        grid-row: 4/5;
    }
}

.background{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    width: 100%;
    height: 100%;
    background-image: url(${props=>props.background});
    background-repeat: none;
    background-position: center;
    background-size: cover;
}

section, img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:40px;
    padding: 20px;
    color: white;
    background: rgba( 0, 0, 0, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    div {flex-grow:1;}
    h3 {margin-bottom:15px;}
    p{text-align:right;}
}
`

export default Star;