//지역 저장하는 모듈

import produce from "immer";
import {createAction, handleActions} from "redux-actions";

const initialState = [
    {
        "ID": "11",
        "LocalizedName": "Seoul"
    }, {
        "ID": "26",
        "LocalizedName": "Busan"
    }, {
        "ID": "27",
        "LocalizedName": "Daegu"
    }, {
        "ID": "28",
        "LocalizedName": "Incheon"
    }, {
        "ID": "29",
        "LocalizedName": "Gwangju"
    }, {
        "ID": "30",
        "LocalizedName": "Daejeon"
    }, {
        "ID": "31",
        "LocalizedName": "Ulsan"
    }, {
        "ID": "41",
        "LocalizedName": "Gyeonggi-do"
    }, {
        "ID": "42",
        "LocalizedName": "Gangwon-do"
    }, {
        "ID": "43",
        "LocalizedName": "Chungcheongbuk-do"
    }, {
        "ID": "44",
        "LocalizedName": "Chungcheongnam-do"
    }, {
        "ID": "45",
        "LocalizedName": "Jeollabuk-do"
    }, {
        "ID": "46",
        "LocalizedName": "Jeollanam-do"
    }, {
        "ID": "47",
        "LocalizedName": "Gyeongsangbuk-do"
    }, {
        "ID": "48",
        "LocalizedName": "Gyeongsangnam-do"
    }, {
        "ID": "49",
        "LocalizedName": "Jeju-do"
    }, {
        "ID": "50",
        "LocalizedName": "Sejong"
    }
];

