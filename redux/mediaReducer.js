import { LOADING_DATA, SET_TRACKS, LOADING_FAILED, LOADING_PLAYBACKINSTANCE, SET_PLAYBACKINSTANCE } from "./types";

export default function (state, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        loading: false,
      };
    case LOADING_FAILED:
      return {
        ...state,
        message: action.message,
        loading: false,
      };
    case LOADING_PLAYBACKINSTANCE:
      return {
        ...state,
        loadingPlaybackInstance: true,
      };
    case SET_PLAYBACKINSTANCE:
      return {
        ...state,
        playbackInstance: action.payload
      }
    default:
      throw new Error(`Not supported action ${action.type}`);
      // return state;
  }
}
