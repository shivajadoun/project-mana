import * as types from './ActionTypes';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request Actions
    case types.CREATE_COMMENT_REQUEST:
    case types.FETCH_COMMENTS_REQUEST:
    case types.DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success Actions
    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.comment],
      };

    case types.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };

    case types.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };

    // Failure Actions
    case types.CREATE_COMMENT_FAILURE:
    case types.FETCH_COMMENTS_FAILURE:
    case types.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default commentReducer;
