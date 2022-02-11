import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./sharedUI/HeaderBar";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import FavoriteWithoutUser from "./components/FavoriteWithoutUser";
import RatedWithoutUser from "./components/RatedWithoutUser";
import Rated from "./components/Rated";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState({});
  const client = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: 1000,
    params: {
      api_key: "1ffee81271c6424b117014332c4bb778",
    },
  });
  // const movieCrud = axios.create({
  //   baseURL: "https://api.themoviedb.org/3/movie/",
  //   timeout: 1000,
  //   params: {
  //     api_key: "1ffee81271c6424b117014332c4bb778",
  //     language: "en-US",
  //   },
  // });
  useEffect(() => {
    client
      .get(`movie/${type}`, { params: { language: "en-US", page: page } })
      .then((results) => {
        console.log("api", results);
        // const newData = data.results.map((each) => {
        //   return { ...each, favorite: false };
        // });
        setTotalPages(results.data.total_pages);
        setPage(results.data.page);
        setMovies([...results.data.results]);
      });
  }, []);

  function handelPage(direction, curpage) {
    let nextPage = curpage;
    if (direction === "forward") {
      if (curpage < totalPages) {
        nextPage = curpage + 1;
      }
    } else {
      if (curpage > 1) {
        nextPage = curpage - 1;
      }
    }
    client
      .get(`movie/${type}`, { params: { language: "en-US", page: nextPage } })
      .then((results) => {
        console.log("api", results);
        setTotalPages(results.data.total_pages);
        setPage(results.data.page);
        setMovies([...results.data.results]);
      });
  }

  function handelType(e) {
    const selectedType = e.target.value;
    client
      .get(`movie/${selectedType}`, {
        params: { language: "en-US", page: "1" },
      })
      .then((results) => {
        console.log("api", results);
        setTotalPages(results.data.total_pages);
        setPage(results.data.page);
        setType(selectedType);
        setMovies([...results.data.results]);
      });
  }

  function handelLogin(username, password) {
    console.log("handel submit");
    client
      .get("authentication/token/new")
      .then((res) => res.data.request_token)
      .then((token) => {
        console.log("first token", token);
        return client.post("authentication/token/validate_with_login", {
          username: username,
          password: password,
          request_token: token,
        });
      })
      .then((returnData) => returnData.data.request_token)
      .then((requestToken) => {
        console.log("request token", requestToken);
        return client.post("/authentication/session/new", {
          request_token: requestToken,
        });
      })
      .then((sessionData) => sessionData.data.session_id)
      .then(
        (sessionId) =>
          (client.defaults.params = {
            ...client.defaults.params,
            session_id: sessionId,
          })
      )
      .then(() => client.get("/account"))
      .then((userInfo) => {
        console.log("user info", userInfo);
        console.log("user", user);
        const userData = {
          ...user,
          username: userInfo.data.username,
          userid: userInfo.data.id,
          sessionid: userInfo.config.params.session_id,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser({ ...userData });
      })
      .then(() => console.log("success", user));
  }

  function handelToRated(movieid) {
    console.log("rated clicked, movie id is", movieid);
  }

  function handelFavorite(userid) {
    console.log("favorite cliked, user id is", userid);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar user={user} />
        <Routes>
          <Route
            path="/"
            element={
              Object.keys(movies).length !== 0 && (
                <Home
                  user={user}
                  movies={movies}
                  page={page}
                  type={type}
                  totalPages={totalPages}
                  clickType={handelType}
                  clickPage={handelPage}
                  clickToRate={handelToRated}
                  clickFavorite={handelFavorite}
                />
              )
            }
          ></Route>
          <Route
            path="/favorite"
            element={
              user.username ? <Favorite user={user} /> : <FavoriteWithoutUser />
            }
          ></Route>
          <Route
            path="/rated"
            element={
              user.username ? <Rated user={user} /> : <RatedWithoutUser />
            }
          ></Route>
          <Route
            path="/login"
            element={<Login user={user} clickLogin={handelLogin} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
