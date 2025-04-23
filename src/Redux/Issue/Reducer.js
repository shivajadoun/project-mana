import * as types from './ActionTypes';

const initialState = {
  issues: [],
  issue: null,
  loading: false,
  error: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch All Issues
    case types.FETCH_ISSUES_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_ISSUES_SUCCESS:
      return { ...state, loading: false, issues: action.payload };
    case types.FETCH_ISSUES_FAILURE:
      return { ...state, loading: false, error: action.error };

    // Fetch Issue by ID
    case types.FETCH_ISSUE_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_ISSUE_BY_ID_SUCCESS:
      return { ...state, loading: false, issue: action.payload };
    case types.FETCH_ISSUE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.error };

    // Create Issue
    case types.CREATE_ISSUE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.CREATE_ISSUE_SUCCESS:
      return { ...state, loading: false, issues: [...state.issues, action.payload] };
    case types.CREATE_ISSUE_FAILURE:
      return { ...state, loading: false, error: action.error };

    // Update Issue
    case types.UPDATE_ISSUE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.UPDATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map(issue =>
          issue.id === action.payload.id ? action.payload : issue
        ),
      };
    case types.UPDATE_ISSUE_FAILURE:
      return { ...state, loading: false, error: action.error };

    // Update Issue Status
    case types.UPDATE_ISSUE_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case types.UPDATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map(issue =>
          issue.id === action.payload.id ? action.payload : issue
        ),
      };
    case types.UPDATE_ISSUE_STATUS_FAILURE:
      return { ...state, loading: false, error: action.error };

    // Assign User to Issue
    case types.ASSINGED_ISSUE_TO_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case types.ASSINGED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map(issue =>
          issue.id === action.payload.id ? action.payload : issue
        ),
      };
      
    case types.ASSINGED_ISSUE_TO_USER_FAILURE:
      return { ...state, loading: false, error: action.error };
        // Delete Issue
        case types.DELETE_ISSUE_REQUEST:
          return { ...state, loading: true, error: null };
        case types.DELETE_ISSUE_SUCCESS:
          return {
            ...state,
            loading: false,
            issues: state.issues.filter(issue => issue.id !== action.payload),
          };
        case types.DELETE_ISSUE_FAILURE:
          return { ...state, loading: false, error: action.error };
      

    default:
      return state;
  }
};

export default issueReducer;
