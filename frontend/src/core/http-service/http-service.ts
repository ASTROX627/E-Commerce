import { API_URL } from "@/configs/global";
import { ofetch } from "ofetch";

const api = ofetch.create({
  baseURL: API_URL,
  headers:{
    "Content-Type": "application/json"
  },
  onResponseError: ({response, error}) => {
    
  }
})
