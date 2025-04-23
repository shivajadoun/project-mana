import * as types from './ActionTypes';

const initialState = {
  subscription: null,
  loading: false,
  error: null,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Subscription
    case types.GET_USER_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true, error: null };
    case types.GET_USER_SUBSCRIPTION_SUCCESS:
      return { ...state, loading: false, subscription: action.payload };
    case types.GET_USER_SUBSCRIPTION_FAILURE:
      return { ...state, loading: false, error: action.error };

    // Upgrade Subscription
    case types.UPGRADE_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true, error: null };
    case types.UPGRADE_SUBSCRIPTION_SUCCESS:
      return { ...state, loading: false, subscription: action.payload };
    case types.UPGRADE_SUBSCRIPTION_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default subscriptionReducer;
