import { Type } from "lucide-react"
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes"
import { API_BASE_URL } from "@/config/api"
import axios from "axios"

export const register=userData=>async(dispatch)=>{
    dispatch({Type:REGISTER_REQUEST})
    try{
        const {data}=await axios.post(`${API_BASE_URL}/auth/signup`,userData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
            dispatch({type:REGISTER_SUCCESS,payload:data})
    }
        console.log("register success",data)

    }catch(error)
    {
            console.log(error)
    }
}


export const login=userData=>async(dispatch)=>{
    dispatch({Type:LOGIN_REQUEST})
    try{
        const {data}=await axios.post(`${API_BASE_URL}/auth/signin`,userData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
            dispatch({type:LOGIN_SUCCESS,payload:data})
    }
        console.log("login successFully",data)

    }catch(error)
    {
            console.log(error)
    }
}


export const getUser=()=>async(dispatch)=>{
    dispatch({Type:GET_USER_REQUEST})
    try{
        const {data}=await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        });
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
            dispatch({type:GET_USER_SUCCESS,payload:data})
    }
        console.log("GET-User success",data)

    }catch(error)
    {
            console.log(error)
    }
}


export const logout=()=>async(dispatch) =>{
    dispatch({type:LOGOUT})
    localStorage.clear();
}