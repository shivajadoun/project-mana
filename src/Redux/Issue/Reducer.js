import * as types from './ActionTypes';

const initialState = {
  issues: [],
  selectedIssue: null,
  loading: false,
  error: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ISSUES_REQUEST:
    case types.FETCH_ISSUE_BY_ID_REQUEST:
    case types.CREATE_ISSUE_REQUEST:
    case types.UPDATE_ISSUE_REQUEST:
    case types.UPDATE_ISSUE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.payload,
      };

    case types.FETCH_ISSUE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedIssue: action.payload,
      };

    case types.CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [...state.issues, action.payload],
      };

    case types.UPDATE_ISSUE_SUCCESS:
    case types.UPDATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id ? action.payload : issue
        ),
        selectedIssue:
          state.selectedIssue?.id === action.payload.id
            ? action.payload
            : state.selectedIssue,
      };

    case types.FETCH_ISSUES_FAILURE:
    case types.FETCH_ISSUE_BY_ID_FAILURE:
    case types.CREATE_ISSUE_FAILURE:
    case types.UPDATE_ISSUE_FAILURE:
    case types.UPDATE_ISSUE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default issueReducer;
