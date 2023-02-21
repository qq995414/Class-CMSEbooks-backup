import axios from "axios";
import { UPLOAD_URL } from "../constants";

//export const HOST = UPLOAD_URL+"Portal";
export const HOST = UPLOAD_URL + "/Portal";


const LOCALSTORAGE_KEY = "Portal";

const headerConfig = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Function: "PORTAL",
};

export const getDataFromLocalStorage = () =>
  JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
export const setDataToLocalStorage = (data) =>
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
export const removeDataFromLocalStorage = () =>
  localStorage.removeItem(LOCALSTORAGE_KEY);
export const isExpired = (expiresAt) => new Date().getTime() >= expiresAt;
export const getExpiresAt = (expiresIn) =>
  new Date().getTime() + expiresIn * 1_000;

export const checkAndRefreshAccessToken = async (config) => {
  let { accessToken } = getDataFromLocalStorage();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const onRequestFulfilled = (config) => checkAndRefreshAccessToken(config);
const onRequestRejected = (error) => console.error(error);

const onResponseFulfilled = (response) => response;
const onResponseRejected = (error) => {
  alert(error.response.message);
  if (error.response.status === 403) {
    removeDataFromLocalStorage();
    window.location = "/login";
  }
  return Promise.reject(error);
};
export const service = ({
  host = HOST,
  url,
  method = "get",
  headers = headerConfig,
  data = {},
  params,
  responseType
}) => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({});
    instance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
    instance.interceptors.response.use(onResponseFulfilled, onResponseRejected);
    instance
      .request({
        headers,
        url: `${host}${url}`,
        method,
        params,
        data,
        responseType
      })
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
