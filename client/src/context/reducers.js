import {
  CHANGE_POSITION_ZOOM,
  GET_SITES_BEGIN,
  GET_SITES_SUCCESS,
  GET_SITES_ERROR,
  GET_SITE_BEGIN,
  GET_SITE_SUCCESS,
  GET_SITE_ERROR,
  DISPLAY_INPUT_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_FAVORITE,
  REMOVE_FAVORITE,
  FAV_SITE_BEGIN,
  FAV_SITE_SUCCESS,
  UNFAV_SITE_BEGIN,
  UNFAV_SITE_SUCCESS,
  GET_FAVS_BEGIN,
  GET_FAVS_SUCCESS,
  HANDLE_SORT,
  CHANGE_PAGE,
} from "./actions";

import { initialGlobalState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === CHANGE_POSITION_ZOOM) {
    return {
      ...state,
      positionZoom: action.payload.positionZoom,
    };
  }
  if (action.type === GET_SITES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_SITES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      sites: action.payload.sites,
    };
  }
  if (action.type === GET_SITES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Error getting sites from USGS API",
    };
  }
  if (action.type === GET_SITE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_SITE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      siteData: action.payload.siteData,
    };
  }
  if (action.type === GET_SITE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Error getting site info from USGS API",
    };
  }
  if (action.type === DISPLAY_INPUT_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "All fields must be filled out",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false, alertType: "", alertText: "" };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User created! Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Login success! Redirecting...",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialGlobalState,
      positionZoom: { p: [38, -96], z: 4 },
      boundingBox: [],
      user: null,
      token: null,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User profile updated!",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SET_FAVORITE) {
    return {
      ...state,
      isFavorite: true,
    };
  }
  if (action.type === REMOVE_FAVORITE) {
    return {
      ...state,
      isFavorite: false,
    };
  }
  if (action.type === FAV_SITE_BEGIN) {
    return { ...state, isFavLoading: true };
  }
  if (action.type === FAV_SITE_SUCCESS) {
    return {
      ...state,
      isFavLoading: false,
    };
  }
  if (action.type === UNFAV_SITE_BEGIN) {
    return { ...state, isFavLoading: true };
  }
  if (action.type === UNFAV_SITE_SUCCESS) {
    return {
      ...state,
      isFavLoading: false,
    };
  }
  if (action.type === GET_FAVS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_FAVS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      favs: action.payload.favs,
      totalFavs: action.payload.totalFavs,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === HANDLE_SORT) {
    return {
      ...state,
      page: 1,
      sort: action.payload.value,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
