import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import mediaReducer from "./mediaReducer";

const initialState = {
  tracks: [],
  favoriteTracks: [],
  currentTrack: {
    author: "May Gillington Byron",
    duration: "00:42:41",
    imageSource:
      "https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg",
    title: "A Day With John Milton",
    uri:
      "https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/a_day_with_great_poets_01_byron_128kb.mp3",
  },
  currentIndex: 0,
  loading: true,
  loadingPlaybackInstance: false,
  isPlaying: false,
  playbackInstance: null,
  volume: 1.0,
  isBuffering: false,
};

const store = createStore(mediaReducer, initialState, applyMiddleware(thunk));

// console.log('store :>> ', store);

export default store;
