import axios from "axios";

// const server = `${(new URL(document.location.href)).origin}/api/`;
const server = 'http://ch4n3.kr:3000/';

const http = axios.create({
    baseURL: server,
});

export default http;
