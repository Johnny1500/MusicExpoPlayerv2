import { LOADING_DATA, SET_TRACKS, LOADING_FAILED } from "./types";
import { Audio } from "expo-av";
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

export const setAudio = async (track) => dispatch => {
  try {
    {
      await Audio.setAudioModeAsync({
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      loadAudio(track);
    }
  } catch (e) {
    console.log(e);
  }
}

const loadAudio = async () => {

}