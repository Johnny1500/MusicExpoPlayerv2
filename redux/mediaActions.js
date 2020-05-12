import { LOADING_DATA, SET_TRACKS, LOADING_FAILED } from "./types";
import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-media-b0cc7.cloudfunctions.net/api";

export const setTracks = () => async (dispatch) => {

  // console.log('test1 setTracks');

  try {

    // console.log('test2 setTracks');

    dispatch({ type: LOADING_DATA });

    let res = await axios.get("/tracks/");

    // console.log('res.data :>> ', res.data);

    dispatch({ type: SET_TRACKS, payload: res.data });
  } catch (e) {
    dispatch({ type: LOADING_FAILED, message: e.message });
  }
};
