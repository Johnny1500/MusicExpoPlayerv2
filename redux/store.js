import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import mediaReducer from "./mediaReducer";

const initialState = {
  tracks: [{"id":1, title:"test title", uri:"https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/a_day_with_great_poets_01_byron_128kb.mp3", imageSource: "https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg"}],
  currentTrackId: 0,
  loading: false,
};

const store = createStore(mediaReducer, initialState, applyMiddleware(thunk));

// console.log('store :>> ', store);

export default store;