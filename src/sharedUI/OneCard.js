import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OneCard(props) {
  const navigate = useNavigate();
  const { id, title, vote_average, poster_path } = props.movie;
  const { user, isFavorite, axiosClient, setFavoriteList, favoriteList } =
    props;
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  function handelFavorite(userid, sessionid, movieid, isFavorite) {
    console.log("favorite cliked, user id is", userid);
    axiosClient
      .post(
        `/account/${userid}/favorite`,
        {
          media_type: "movie",
          media_id: movieid,
          favorite: !isFavorite,
        },
        { params: { session_id: sessionid } }
      )
      .then((res) => console.log("favorite this movie", res))
      .then(() =>
        axiosClient
          .get(`/account/${user.userid}/favorite/movies`, {
            params: { session_id: user.sessionid },
          })
          .then((res) => setFavoriteList(res.data.results))
          .then(() => console.log("second time get favorite", favoriteList))
      );
  }

  // handel function when user click the movie image/title
  function handelToRated(movieid, sessionid) {
    console.log("rated clicked, movie id is", movieid);
    axiosClient
      .post(
        `/movie/${movieid}/rating`,
        { value: 7 },
        { params: { session_id: sessionid } }
      )
      .then((res) => console.log("rated this movie 7 pointes", res))
      .then(() => navigate("/movie"));
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={`${IMAGE_BASE}${poster_path}`}
        alt={title}
        to="/movie"
        onClick={user.username && (() => handelToRated(id, user.sessionid))}
      />
      <CardContent
        to="/movie"
        onClick={user.username && (() => handelToRated(id, user.sessionid))}
      >
        <Typography gutterBottom variant="h7" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={10}>
            <Rating
              name="read-only"
              value={vote_average / 2}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" component="span" xs={{ pb: 4 }}>
              {vote_average}
            </Typography>
          </Grid>
          {/* <Grid
            item
            onClick={
              user.username &&
              (() => {
                props.clickFavorite(
                  user.userid,
                  user.sessionid,
                  id,
                  isFavorite
                );
              })
            }
          > */}
          <Grid
            item
            onClick={
              user.username &&
              (() => {
                handelFavorite(user.userid, user.sessionid, id, isFavorite);
              })
            }
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
