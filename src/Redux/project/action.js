// Updated action.js with proper error handling and consistency
import api, { API_BASE_URL } from "@/config/api"
import { 
    ACCEPT_INVITATION_SUCCESS, 
    CREATE_PROJECT_REQUEST, 
    CREATE_PROJECT_SUCCESS, 
    CREATE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST, 
    DELETE_PROJECT_SUCCESS, 
    DELETE_PROJECT_FAILURE,
    FETCH_PROJECT_BY_ID_FAILURE, 
    FETCH_PROJECT_BY_ID_REQUEST, 
    FETCH_PROJECT_BY_ID_SUCCESS, 
    FETCH_PROJECT_REQUEST, 
    FETCH_PROJECT_SUCCESS, 
    FETCH_PROJECT_FAILURE,
    INVITE_TO_PROJECT_SUCCESS, 
    SEARCH_PROJECT_REQUEST, 
    SEARCH_PROJECT_SUCCESS,
    SEARCH_PROJECT_FAILURE
} from "./ActionTypes"

export const fetchProjects = ({ category, tag } = {}) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST })
    try {
        const params = {};
        if (category && category !== 'all') params.category = category;
        if (tag && tag !== 'all') params.tag = tag;
        
        const { data } = await api.get("/api/projects", { params })
        console.log("fetch projects", data)
        dispatch({ type: FETCH_PROJECT_SUCCESS, payload: data })
        return data;
    } catch (error) {
        console.log("fetch projects error", error);
        dispatch({ type: FETCH_PROJECT_FAILURE, payload: error.response?.data?.message || error.message })
        throw error;
    }
}

export const searchProjects = (keyword) => async (dispatch) => {
    dispatch({ type: SEARCH_PROJECT_REQUEST })
    try {
        const { data } = await api.get("/api/projects", { params: { keyword } })
        console.log("search projects", data)
        dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: data })
        return data;
    } catch (error) {
        console.log("search projects error", error);
        dispatch({ type: SEARCH_PROJECT_FAILURE, payload: error.response?.data?.message || error.message })
        throw error;
    }
}

export const createProjects = (projectData) => async (dispatch) => {
    dispatch({ type: CREATE_PROJECT_REQUEST })
    try {
        console.log("Creating project with data:", projectData);
        const { data } = await api.post("/api/projects", projectData)
        console.log("create project success", data)
        dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data })
        
        // Optionally refresh the projects list after creation
        dispatch(fetchProjects({}));
        
        return data;
    } catch (error) {
        console.log("create project error", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to create project";
        dispatch({ type: CREATE_PROJECT_FAILURE, payload: errorMessage })
        throw error;
    }
}

export const fetchProjectById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/projects/details/${id}`)
        console.log("fetch project by id", data)
        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, payload: data })
        return data;
    } catch (error) {
        console.log("fetch project by id error", error);
        dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE, payload: error.response?.data?.message || error.message })
        throw error;
    }
}

export const deleteProject = ({ projectId }) => async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST })
    try {
        const { data } = await api.delete(`/api/projects/delete/${projectId}`)
        console.log("delete project success", data)
        dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId })
        return data;
    } catch (error) {
        console.log("delete project error", error);
        dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.response?.data?.message || error.message })
        throw error;
    }
}

export const inviteToProject = ({ email, projectId }) => async (dispatch) => {
    try {
        const { data } = await api.post("/api/projects/invite", { email, projectId })
        console.log("user invited", data)
        dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data })
        return data;
    } catch (error) {
        console.log("invite error", error);
        throw error;
    }
}

export const acceptInvitation = ({ invitationToken, navigate }) => async (dispatch) => {
    try {
        const { data } = await api.post("/api/projects/accept_invitation", invitationToken)
        navigate(`/project/${data.projectID}`)
        console.log("accept invitation", data)
        dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data })
        return data;
    } catch (error) {
        console.log("accept invitation error", error);
        throw error;
    }
}
