import { combineReducers } from 'redux';
import { SEARCH_PROJECT_FAILURE, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from '../project/ActionTypes';
import * as types from './ActionTypes';
 
export const sendMessage=(messageData) =>{
    return async (dispatch) =>{
        dispatch({type:SEND_MESSAGE_REQUEST});
        try {
            const response=await api.post("api/messages/send",messageData);
            dispatch({type:SEARCH_PROJECT_SUCCESS,message:response.data,});
            
        } catch (error) {
            console.log(error);
            dispatch({type:SEARCH_PROJECT_FAILURE,error:error.message,})
        }
    };
}

export const fetchChatByProjectId = (projectId) => {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_CHAT_BY_PROJECT_REQUEST });
      try {
        const response = await api.get(`api/chat/project/${projectId}/chat`);
        console.log("fetch chat",response.data)
        dispatch({
          type: types.FETCH_CHAT_BY_PROJECT_SUCCESS,
          chat: response.data,
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: types.FETCH_CHAT_BY_PROJECT_FAILURE,
          error: error.message,
        });
      }
    };
  };


  export const fetchChatMessage = (chatId) => {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_CHAT_MESSAGE_REQUEST });
      try {
        const response = await api.get(`api/messages/chat/${chatId}`);
        console.log("fetch message ",response.data)
        dispatch({
          type: types.FETCH_CHAT_MESSAGE_SUCCESS,
          chatId,
          message: response.data,
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: types.FETCH_CHAT_MESSAGE_FAILURE,
          error: error.message,
        });
      }
    };
  };

