import * as types from './ActionTypes';
import api from '@/config/api'; // Adjust to your actual API path

// Fetch All Issues
export const fetchIssues = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get('/api/issues');
      dispatch({ type: types.FETCH_ISSUES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.FETCH_ISSUES_FAILURE, error: error.message });
    }
  };
};

// Fetch Issue by ID
export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_ISSUE_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${id}`);
      dispatch({ type: types.FETCH_ISSUE_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.FETCH_ISSUE_BY_ID_FAILURE, error: error.message });
    }
  };
};

// Create Issue
export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: types.CREATE_ISSUE_REQUEST });
    try {
      const response = await api.post('/api/issues', issueData);
      dispatch({ type: types.CREATE_ISSUE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.CREATE_ISSUE_FAILURE, error: error.message });
    }
  };
};

// Update Issue
export const updateIssue = (id, updateData) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_ISSUE_REQUEST });
    try {
      const response = await api.put(`/api/issues/${id}`, updateData);
      dispatch({ type: types.UPDATE_ISSUE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.UPDATE_ISSUE_FAILURE, error: error.message });
    }
  };
};

// Update Issue Status
export const updateIssueStatus = (id, status) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.patch(`/api/issues/${id}/status`, { status });
      dispatch({ type: types.UPDATE_ISSUE_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.UPDATE_ISSUE_STATUS_FAILURE, error: error.message });
    }
  };
};
