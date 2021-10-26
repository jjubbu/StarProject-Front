import React from "react";
import axios from "axios";
import dfs_xy_conv from "../transitionXY";

const Star = () => {
    const [text, setText] = React.useState("지금 내 위치!");
    const [latitude, setLatitude] = React.useState();
    const [longitude, setLongitude] = React.useState();
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
        setText("위도는 " + latitude + "경도는 " + longitude);
        setLatitude(latitude);
        setLongitude(longitude);
    }

    const error = (x) => {
        setText(x.code + ":::" + x.message);
    }
    

    React.useEffect(() => {
        const Number_ = dfs_xy_conv("toXY",37.5330228,127.0264359);
        console.log(Number_.x);
        console.log(Number_.y);
        if ('geolocation' in navigator) {
            /* 위치정보 사용 가능 */
            console.log("useEffect")
            navigator
                .geolocation
                .getCurrentPosition(success, error, options);
       
            const coord = new window.kakao.maps.LatLng(37.5330228,127.0264359);
            

        } else {
            /* 위치정보 사용 불가능 */
            setText("확인할 수 없다 ㅠㅠ");

        }
        // window.naver.maps.Service.reverseGeocode({
        //     location: new window.naver.maps.LatLng(37.3595316, 127.1052133),
        // }, function(status, response) {
        //     if (status !== window.naver.maps.Service.Status.OK) {
        //         return alert('Something wrong!');
        //     }
    
        //     const result = response.result; // 검색 결과의 컨테이너
        //        const items = result.items; // 검색 결과의 배열
    
        //        console.log("items:::",items)
        //     // do Something
        // });
        const params = [Number_.x,Number_.y];

        axios.get('https://openapi.naver.com/v1/map/reversegeocode',{params}).then((res)=>{
           console.log(res);
        })
    }, [])

    return (
        <React.Fragment>

            <section>
                <div>
                    <h3>안내사항</h3>
                    <p></p>
                </div>
                <div>
                    <h3>미세먼지</h3>
                    <p></p>
                </div>
                <div>
                    <p>온도에 맞는 옷차림 추천</p>
                    <h3>습도</h3>
                    <h3>날씨</h3>
                </div>
                <div>
                    <h3>월출</h3>
                </div>
            </section>
            <section>
                <div>
                    <img src="#" alt="별자리"/>
                    <p>별자리 이름 밎 1줄 설명</p>
                </div>
                <div>
                    <h3>현재위치</h3>
                    <p>{text}</p>
                    <p>별 보러 가자~</p>
                </div>
            </section>

        </React.Fragment>
    )
}

export default Star;