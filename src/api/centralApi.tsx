import axios from "axios";

//Se obtiene el dominio del .env
const _BASE_URL = process.env.REACT_APP_CENTRAL_API;

export const centralApi = axios.create({
    baseURL:_BASE_URL,
    headers:{
        'Content-Type' : 'application/json; charset=utf-8'
    },
});