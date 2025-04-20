import * as types from './ActionTypes'
const initialState={messgaes:[],
    loading:false,
    error:null,
    chat:null
};

const chatReducer=(state = initialState,action)=>{
    switch (action.type) {
        case types.FETCH_MESSAGE_REQUEST:
        case types.FETCH_CHAT_BY_PROJECT_REQUEST:
        case types.FETCH_CHAT_MESSAGE_REQUEST:
            return{
                ...state,loading:true,error:null
            };
        case types.FETCH_CHAT_MESSAGE_SUCCESS:
        case types.FETCH_MESSAGE_SUCCESS:
            return {...state,loading:false,messages:action.messages};
        case types.SEND_MESSAGE_SUCCESS:
            return {...state,loading:false,messages:[...state.messgaes,action.message]};
            
            case types.FETCH_CHAT_BY_PROJECT_SUCCESS:
                return{...state,loading:false,chat:action.chat};
            case types.FETCH_CHAT_BY_PROJECT_FAILURE:
            case types.FETCH_CHAT_MESSAGE_FAILURE:
            case types.FETCH_MESSAGE_FAILURE:
                return{...state,loading:false,error:action.error}           
    
        default:
            return state;
    }
};

export default chatReducer;