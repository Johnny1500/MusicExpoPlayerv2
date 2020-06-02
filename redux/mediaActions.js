import {
  LOADING_DATA,
  SET_TRACKS,
  LOADING_FAILED,
  LOADING_PLAYBACKINSTANCE,
  SET_PLAYBACKINSTANCE,
  SET_PLAY,
  SET_CURRENT_INDEX,
  SET_CURRENT_POSITIION,
  SET_PHONE_ORIENTATION,
  SHUFFLE_TRACKS,
  SET_TIMER,
} from "./types";
import { Audio } from "expo-av";
import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-media-b0cc7.cloudfunctions.net/api";

export const setTracks = () => async (dispatch) => {
  // console.log('test1 setTracks');

  try {
    // console.log('test2 setTracks');

    console.log("mediaActions start loading tracks");
    dispatch({ type: LOADING_DATA });

    let res = await axios.get("/tracks/");

    // console.log('res.data :>> ', res.data);

    dispatch({ type: SET_TRACKS, payload: res.data });
    console.log("mediaActions tracks have been loaded");
    // console.log('mediaActions setTracks() res.data :>> ', res.data);
  } catch (e) {
    console.log(e);
    dispatch({ type: LOADING_FAILED, message: e.message });
  }
};

export const loadAudio = (uri, isPlaying) => async (dispatch) => {
  try {
    console.log("mediaActions loadAudio uri :>> ", uri);
    console.log("mediaActions loadAudio isPlaying :>> ", isPlaying);

    dispatch({ type: LOADING_PLAYBACKINSTANCE });

    const playbackInstance = new Audio.Sound();

    const status = {
      shouldPlay: isPlaying,
    };

    const source = {
      uri: uri,
    };

    // playbackInstance.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
    await playbackInstance.loadAsync(source, status, false);

    dispatch({ type: SET_PLAYBACKINSTANCE, payload: playbackInstance });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOADING_FAILED, message: e.message });
  }

  // _onPlaybackStatusUpdate = playbackStatus => {
  //   if(playbackStatus.isLoaded) {
  //     // console.log('mediaActions _onPlaybackStatusUpdate track loaded');
  //     // console.log('mediaActions _onPlaybackStatusUpdate track uri :>> ', playbackStatus.uri);
  //     // console.log('mediaActions _onPlaybackStatusUpdate volume :>> ', playbackStatus.volume);
  //   } else {
  //     console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
  //   }
  // }
};

export const handlePlayPauseAction = (isPlaying) => (dispatch) => {
  dispatch({ type: SET_PLAY, payload: !isPlaying });
  // console.log("mediaActions handlePlayPauseAction isPlaying :>> ", !isPlaying);
};

export const handleChangeTrackAction = (currentIndex) => (dispatch) => {
  dispatch({ type: SET_CURRENT_INDEX, payload: currentIndex });
  // console.log(
  //   "mediaActions handleChangeTrackAction currentIndex :>> ",
  //   currentIndex
  // );
};

export const setCurrentPosition = (value) => (dispatch) => {
  dispatch({ type: SET_CURRENT_POSITIION, payload: value });
  console.log("mediaActions setCurrentPosition currentPosition :>> ", value);
};

export const setPhoneOrientation = (value) => (dispatch) => {
  dispatch({ type: SET_PHONE_ORIENTATION, payload: value });
  // console.log("mediaActions setPhoneOrientation phoneOrientation :>> ", value);
};

export const shuffleTracks = (value) => (dispatch) => {
  dispatch({ type: SHUFFLE_TRACKS, payload: value });
  // console.log("mediaActions shuffleTracks :>> ", value);
};

export const setTimer = (value) => (dispatch) => {
  dispatch({ type: SET_TIMER, payload: value });
  console.log("mediaActions setTimer timerId :>> ", value);
};

export const setCurrentPositionWithTimer = (value) => (dispatch) => {
  const timerId = setInterval(() => {
    value += 1;
    dispatch({ type: SET_CURRENT_POSITIION, payload: value });
    console.log("mediaActions setCurrentPositionWithTimer currentPosition :>> ", value);
  }, 1000);
  console.log("mediaActions setCurrentPositionWithTimer timerId :>> ", value);
  dispatch({ type: SET_TIMER, payload: timerId });
};
