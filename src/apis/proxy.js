import {url } from './config';

import axios from 'axios';

export async function post(endpoint, data) {
  const params = {
    baseURL: url,
  };


  try{
    const result = await axios.post(`${endpoint}`, data, params);
    return result;
  }catch(e){
    return e.response;
  }
}

export async function postReq(baseURL, endpoint, data) {
  const params = { baseURL };
  
  try{
    const result = await axios.post(`${endpoint}`, data, params);
    return result;
  }catch(e){
    return e.response;
  }
}

export async function get(baseURL, endpoint) {
  const params = {
    baseURL: baseURL,
  };
  
  const result = await axios.get(`${endpoint}`, params);
  return result;
}

export async function getReq(baseURL, endpoint, id, query) {
  let params = {
    baseURL: baseURL,
    headers: {
    },
  };
  if(query){
    params.params = query;
  }else{query = null}
  const result = await axios.get(`${endpoint}/${id}`, params);
  return result;
}

export async function deleteReq(baseURL, endpoint, id, query) {
  let params = {
    baseURL: baseURL,
    headers: {
    },
  };
  if(query){
    params.params = query;
  }else{query = null}
  const result = await axios.delete(`${endpoint}/${id}`, params);
  return result;
}