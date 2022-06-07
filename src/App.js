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
        setTotalPages(results.data.total_pages);
        setPage(results.data.page);
        setMovies([...results.data.results]);
        setUser(JSON.parse(localStorage.getItem("user")));
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='App'>
      <BrowserRouter>
        <ResponsiveAppBar user={user} axiosClient={client} setUser={setUser} />
        <Routes>
          <Route
            path='/'
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
            path='/favorite'
            element={
              user?.username ? (
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
            path='/rated'
            element={
              user?.username ? (
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
          <Route
            path='/login'
            element={
              <Login user={user} setUser={setUser} axiosClient={client} />
            }
          ></Route>
          <Route
            path='/movie/:movieId'
            element={<SingleMovie axiosClient={client} user={user} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
