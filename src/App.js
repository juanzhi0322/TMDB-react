import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ResponsiveAppBar from "./sharedUI/HeaderBar";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import FavoriteWithoutUser from "./components/FavoriteWithoutUser";
import RatedWithoutUser from "./components/RatedWithoutUser";
import Rated from "./components/Rated";
import Login from "./components/Login";
import SingleMovie from "./components/singleMovie";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState({});
  const [favoriteList, setFavoriteList] = useState([]);
  const [myRating, setMyRating] = useState([]);
  const client = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: 2000,
    params: {
      api_key: "1ffee81271c6424b117014332c4bb778",
    },
  });

  // fetch backend movie data when loading at first time
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

  // handel the prev/next pagination and data updating
  // function handelPage(direction, curpage) {
  //   let nextPage = curpage;
  //   if (direction === "forward") {
  //     if (curpage < totalPages) {
  //       nextPage = curpage + 1;
  //     }
  //   } else {
  //     if (curpage > 1) {
  //       nextPage = curpage - 1;
  //     }
  //   }
  //   client
  //     .get(`movie/${type}`, { params: { language: "en-US", page: nextPage } })
  //     .then((results) => {
  //       console.log("api", results);
  //       setTotalPages(results.data.total_pages);
  //       setPage(results.data.page);
  //       setMovies([...results.data.results]);
  //     });
  // }

  // handel movie categories
  // function handelType(e) {
  //   const selectedType = e.target.value;
  //   client
  //     .get(`movie/${selectedType}`, {
  //       params: { language: "en-US", page: "1" },
  //     })
  //     .then((results) => {
  //       console.log("api", results);
  //       setTotalPages(results.data.total_pages);
  //       setPage(results.data.page);
  //       setType(selectedType);
  //       setMovies([...results.data.results]);
  //     });
  // }

  // handel login process and redirection
  // function handelLogin(username, password) {
  //   console.log("handel submit");
  //   client
  //     .get("authentication/token/new")
  //     .then((res) => res.data.request_token)
  //     .then((token) => {
  //       console.log("first token", token);
  //       return client.post("authentication/token/validate_with_login", {
  //         username: username,
  //         password: password,
  //         request_token: token,
  //       });
  //     })
  //     .then((returnData) => returnData.data.request_token)
  //     .then((requestToken) => {
  //       console.log("request token", requestToken);
  //       return client.post("/authentication/session/new", {
  //         request_token: requestToken,
  //       });
  //     })
  //     .then((sessionData) => sessionData.data.session_id)
  //     .then(
  //       (sessionId) =>
  //         (client.defaults.params = {
  //           ...client.defaults.params,
  //           session_id: sessionId,
  //         })
  //     )
  //     .then(() => client.get("/account"))
  //     .then((userInfo) => {
  //       console.log("user info", userInfo);
  //       console.log("user", user);
  //       const userData = {
  //         ...user,
  //         username: userInfo.data.username,
  //         userid: userInfo.data.id,
  //         sessionid: userInfo.config.params.session_id,
  //       };
  //       localStorage.setItem("user", JSON.stringify(userData));
  //       setUser({ ...userData });
  //     })
  //     .then(() => console.log("success", user));
  // }

  // handel function when user click the movie image/title
  // function handelToRated(movieid, sessionid) {
  //   console.log("rated clicked, movie id is", movieid);
  //   client
  //     .post(
  //       `/movie/${movieid}/rating`,
  //       { value: 7 },
  //       { params: { session_id: sessionid } }
  //     )
  //     .then((res) => console.log("rated this movie 7 pointes", res));
  // }

  // handel function when user click favorite icon
  // function handelFavorite(userid, sessionid, movieid, isFavorite) {
  //   console.log("favorite cliked, user id is", userid);
  //   client
  //     .post(
  //       `/account/${userid}/favorite`,
  //       {
  //         media_type: "movie",
  //         media_id: movieid,
  //         favorite: !isFavorite,
  //       },
  //       { params: { session_id: sessionid } }
  //     )
  //     .then((res) => console.log("favorite this movie", res))
  //     .then(() =>
  //       client
  //         .get(`/account/${user.userid}/favorite/movies`, {
  //           params: { session_id: user.sessionid },
  //         })
  //         .then((res) => setFavoriteList(res.data.results))
  //         .then(() => console.log("second time get favorite", favoriteList))
  //     );
  // }

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
                  axiosClient={client}
                  user={user}
                  movies={movies}
                  setMovies={setMovies}
                  page={page}
                  setPage={setPage}
                  type={type}
                  setType={setType}
                  favoriteList={favoriteList}
                  setFavoriteList={setFavoriteList}
                  totalPages={totalPages}
                  setTotalPages={setTotalPages}
                />
              )
            }
          ></Route>
          <Route
            path="/favorite"
            element={
              user.username ? (
                <Favorite
                  user={user}
                  axiosClient={client}
                  favoriteList={favoriteList}
                  setFavoriteList={setFavoriteList}
                />
              ) : (
                <FavoriteWithoutUser />
              )
            }
          ></Route>
          <Route
            path="/rated"
            element={
              user.username ? (
                <Rated
                  user={user}
                  axiosClient={client}
                  favoriteList={favoriteList}
                  setFavoriteList={setFavoriteList}
                  myRating={myRating}
                  setMyRating={setMyRating}
                />
              ) : (
                <RatedWithoutUser />
              )
            }
          ></Route>
          {/* <Route
            path="/login"
            element={<Login user={user} clickLogin={handelLogin} />}
          ></Route> */}
          <Route
            path="/login"
            element={
              <Login user={user} setUser={setUser} axiosClient={client} />
            }
          ></Route>
          <Route path="/movie/" element={<SingleMovie />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
