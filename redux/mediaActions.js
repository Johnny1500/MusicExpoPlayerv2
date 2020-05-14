import { LOADING_DATA, SET_TRACKS, LOADING_FAILED, LOADING_PLAYBACKINSTANCE, SET_PLAYBACKINSTANCE, SET_PLAY, SET_CURRENT_INDEX, SET_CURRENT_TRACK } from "./types";
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
    console.log(e);
    dispatch({ type: LOADING_FAILED, message: e.message });
  }
};

// export const setAudio = async () => dispatch => {
//   try {
//     {
//       await Audio.setAudioModeAsync({
//         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//         playsInSilentModeIOS: true,
//         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
//         staysActiveInBackground: true,
//         playThroughEarpieceAndroid: true,
//       });
//       }
//   } catch (e) {
//     console.log(e);
//   }
// }

export const loadAudio = async (uri, isPlaying) => dispatch => {
 
  try {
    console.log('loadAudio uri :>> ', uri);
    console.log('loadAudio isPlaying :>> ', isPlaying);
    dispatch({ type: LOADING_PLAYBACKINSTANCE });

    const playbackInstance = new Audio.Sound();

      const status = {
        shouldPlay: isPlaying,
      };

      const source = {
        uri: uri,
      };

      playbackInstance.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);

      dispatch({ type: SET_PLAYBACKINSTANCE, payload: playbackInstance });

  } catch(e) {
    console.log(e);
    dispatch({ type: LOADING_FAILED, message: e.message });
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    if(playbackStatus.isLoaded) {
      console.log('track loaded');
      console.log('track uri :>> ', playbackStatus.uri);
      console.log('volume :>> ', playbackStatus.volume);
    } else {
      console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
    }
  }

}

export const handlePlayPauseAction = isPlaying => dispatch => {
  
  dispatch({ type: SET_PLAY, payload: !isPlaying });
  console.log('isPlaying :>> ', !isPlaying);
};

export const handleChangeTrackAction = (currentIndex, tracks) => dispatch => {
  
        dispatch({ type: SET_CURRENT_INDEX, payload: currentIndex });
        console.log('currentIndex :>> ', currentIndex);
        dispatch({ type: SET_CURRENT_TRACK, payload: tracks[currentIndex] });
        console.log('currentTrack :>> ', tracks[currentIndex]);
};

// export const handleNextTrackAction = (currentIndex, tracks) => dispatch => {
  
//         dispatch({ type: SET_CURRENT_INDEX, payload: currentIndex });
//         console.log('currentIndex :>> ', currentIndex);
// };