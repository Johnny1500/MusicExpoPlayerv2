import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import mediaReducer from "./mediaReducer";

const initialState = {
  tracks: [],
  currentTrackId: 0,
  loading: false,
};

const store = createStore(mediaReducer, initialState, applyMiddleware(thunk));

export default store;