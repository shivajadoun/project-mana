import * as types from './ActionTypes';
import api from '@/config/api'; // Adjust this path to your setup

// Get User Subscription
export const getUserSubscription = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: types.GET_USER_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.get(`/api/subscription/user`,{headers:{"Authorization":`Bearer ${jwt}`}});
      console.log("user susbcription",response.data);
      dispatch({ type: types.GET_USER_SUBSCRIPTION_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.GET_USER_SUBSCRIPTION_FAILURE, error: error.message });
    }
  };
};

// Upgrade Subscription
export const upgradeSubscription = (planData) => {
  return async (dispatch) => {
    dispatch({ type: types.UPGRADE_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.api(`/api/subscription/upgrade`,null, {params:{planType: planData},});

      console.log("upgrade successfully  ---:",response.data)
      dispatch({ type: types.UPGRADE_SUBSCRIPTION_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.UPGRADE_SUBSCRIPTION_FAILURE, error: error.message });
    }
  };
};
