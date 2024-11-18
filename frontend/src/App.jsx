import Login from "./components/Login";
import { Provider } from "react-redux";
import Add from "./components/Add";
import Feed from "./components/Feed";
// import Update from "./components/Update";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import appStore from "./utils/appStore";
export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<Add />} />

            {/* <Route path="/update" element={<Update />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
