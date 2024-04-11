import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";

import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "@/context/AuthContext";

export function setUpAPIClient(ctx = undefined){
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
      Authorization: `Bearer ${cookies['@Barber.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if(error.response.status === 401){
      if(typeof window !== undefined){
        signOut();
      }else{
        return Promise.reject(new   AuthTokenError())
      }
    }

    return Promise.reject(error);

  })

  return api;
}