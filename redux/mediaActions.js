import { LOADING_DATA, SET_TRACKS, LOADING_FAILED } from "./types";
import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-media-b0cc7.cloudfunctions.net/api";

// export const setTracks = () => {
//   console.log('test1 setTracks');
// }

// export function setTracks() {
//   console.log('test3 setTracks');
  
//   return (dispatch) => {
//     console.log('test2 setTracks');
//     dispatch({ type: LOADING_DATA });
//     axios.get("https://europe-west1-media-b0cc7.cloudfunctions.net/api/tracks/").then((res) => {
//       dispatch({ type: SET_TRACKS, payload: res.data });
//     })
//     .catch((err) => console.log("err:", err));
//   };
// }

// const tracks = {
//   "1": { author: "May Gillington Byron", title: "A Day With John Milton" },
// };

// export const setTracks = async (dispatch) => {
//   console.log("test setTracks");

//   try {
//     dispatch({ type: LOADING_DATA });

//     let res = await new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(tracks);
//       }, 1000);
//     });

//     console.log("res :>> ", res);

//     dispatch({ type: SET_TRACKS, payload: res });
//   } catch (e) {
//     dispatch({ type: LOADING_FAILED, message: e.message });
//   }
// };

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
