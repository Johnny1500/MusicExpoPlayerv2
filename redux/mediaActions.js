import { LOADING_DATA, SET_TRACKS, LOADING_FAILED } from "./types";
import axios from "axios";

export const setTracks = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });

    let res = await axios.get("/tracks/");

    dispatch({ type: SET_TRACKS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOADING_FAILED, message: e.message });
  }
};
