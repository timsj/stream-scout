import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

import reducer from "./reducers";
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
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
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

const initialGlobalState = {
  userLoading: true,
  isLoading: false,
  isFavLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  positionZoom: { p: [38, -96], z: 4 },
  boundingBox: [],
  sites: [],
  siteData: [],
  isFavorite: false,
  user: null,
  favs: [],
  totalFavs: 0,
  numOfPages: 1,
  page: 1,
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

//create application context
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //create reducers for global state management
  const [globalState, dispatch] = useReducer(reducer, initialGlobalState);

  //axios setup
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  //end axios setup

  //global state functions below
  const changePositionZoom = (positionZoom) => {
    //updates position & zoom global state on Map move
    dispatch({ type: CHANGE_POSITION_ZOOM, payload: { positionZoom } });
  };

  const getSites = async (favBox) => {
    //gets bounding box from Map and fetches sites within
    const { boundingBox } = globalState;
    let bBox = String(boundingBox);

    dispatch({ type: GET_SITES_BEGIN });

    try {
      const { data } = await axios.get(
        "https://waterservices.usgs.gov/nwis/iv/",
        {
          params: {
            format: "json",
            bBox: favBox || bBox,
            parameterCd: "00060",
            siteType: "ST",
            siteStatus: "active",
          },
        }
      );
      const sites = data.value.timeSeries;
      dispatch({
        type: GET_SITES_SUCCESS,
        payload: {
          sites,
        },
      });
    } catch (error) {
      dispatch({ type: GET_SITES_ERROR });
    }
  };

  const getSite = async (id, period) => {
    //fetches one site for View page
    dispatch({ type: GET_SITE_BEGIN });
    try {
      const { data } = await axios.get(
        "https://waterservices.usgs.gov/nwis/iv/",
        {
          params: {
            format: "json",
            sites: id,
            period,
            parameterCd: "00060,00065",
            siteType: "ST",
            siteStatus: "active",
          },
        }
      );
      //separate flow and height data from response
      const siteData = [data.value.timeSeries[0], data.value.timeSeries[1]];
      dispatch({
        type: GET_SITE_SUCCESS,
        payload: {
          siteData,
        },
      });
    } catch (error) {
      dispatch({ type: GET_SITE_ERROR });
    }
  };

  const displayInputAlert = () => {
    //empty input validation for front-end
    dispatch({ type: DISPLAY_INPUT_ALERT });
    clearAlert();
  };

  const clearAlert = (delay) => {
    //resuable for clearing any alert
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, delay || 5000);
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/register", currentUser);
      const { user } = data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user },
      });
      clearAlert(2000);
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user },
      });
      clearAlert(2000);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  //keeps user logged in on page refresh
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/auth/getCurrentUser");
      const { user } = data;
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user } });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  //run getCurrentUser on every page refresh
  useEffect(() => {
    getCurrentUser();
    //eslint-disable-next-line
  }, []);

  const setFavorite = (bool) => {
    //set isFavorite global state
    if (bool === true) {
      dispatch({ type: SET_FAVORITE });
    } else {
      dispatch({ type: REMOVE_FAVORITE });
    }
  };

  const addFavorite = async ({ siteId, agencyCode, siteName, latLng }) => {
    dispatch({ type: FAV_SITE_BEGIN });
    try {
      await authFetch.post("/favs", { siteId, agencyCode, siteName, latLng });
      setFavorite(true);
      dispatch({ type: FAV_SITE_SUCCESS });
    } catch (error) {
      logoutUser();
    }
  };

  const checkFavorite = async (id) => {
    try {
      const { data } = await authFetch.get(`/favs/${id}`);
      if (!data.msg) {
        setFavorite(true);
      }
    } catch (error) {
      logoutUser();
    }
  };

  const getFavorites = async () => {
    const { page, sort } = globalState;

    dispatch({ type: GET_FAVS_BEGIN });
    try {
      const { data } = await authFetch.get(`/favs?page=${page}&sort=${sort}`);
      const { favs, totalFavs, numOfPages } = data;
      dispatch({
        type: GET_FAVS_SUCCESS,
        payload: { favs, totalFavs, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const removeFavorite = async (id, reload) => {
    dispatch({ type: UNFAV_SITE_BEGIN });
    try {
      await authFetch.delete(`/favs/${id}`);
      setFavorite(false);
      if (reload) {
        //rerenders Favorites page only to avoid unnecessary API call on View pages
        getFavorites();
      }
      dispatch({ type: UNFAV_SITE_SUCCESS });
    } catch (error) {
      logoutUser();
    }
  };

  const handleSort = (value) => {
    dispatch({ type: HANDLE_SORT, payload: { value } });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...globalState,
        changePositionZoom,
        getSites,
        getSite,
        displayInputAlert,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        setFavorite,
        addFavorite,
        removeFavorite,
        checkFavorite,
        getFavorites,
        handleSort,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//called from components to use context easily
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialGlobalState };
