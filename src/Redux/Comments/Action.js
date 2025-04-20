import * as types from './ActionTypes';
import api from '@/cofig/api'; // Adjust the path to your actual API helper

// Create Comment
export const createComment = (commentData) => {
  return async (dispatch) => {
    dispatch({ type: types.CREATE_COMMENT_REQUEST });
    try {
      const response = await api.post('/api/messages/send', commentData);
      console.log("comment created",response.data);
      dispatch({
        type: types.CREATE_COMMENT_SUCCESS,
        message: response.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.CREATE_COMMENT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Fetch Comments
export const fetchComments = (targetId) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_COMMENTS_REQUEST });
    try {
      const response = await api.get(`/api/comments/${targetId}`);
      dispatch({
        type: types.FETCH_COMMENTS_SUCCESS,
        comments: response.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.FETCH_COMMENTS_FAILURE,
        error: error.message,
      });
    }
  };
};

// Delete Comment
export const deleteComment = (commentId) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_COMMENT_REQUEST });
    try {
      await api.delete(`/api/comments/${commentId}`);
      dispatch({
        type: types.DELETE_COMMENT_SUCCESS,
        payload: commentId,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.DELETE_COMMENT_FAILURE,
        error: error.message,
      });
    }
  };
};
