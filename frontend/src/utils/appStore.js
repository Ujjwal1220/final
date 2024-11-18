import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import userReducer from "./userSlice";
const appStore = configureStore({
  reducer: {
    feed: feedReducer,
    user: userReducer,
  },
});
export default appStore;
