import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/connection";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Body />}>
              <Route path={"/"} element={<Feed />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/connections"} element={<Connections />} />
              <Route path={"/profile"} element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
