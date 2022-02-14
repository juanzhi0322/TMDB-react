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
import { pink } from "@mui/material/colors";

export default function OneCard(props) {
  const navigate = useNavigate();
  const { id, title, vote_average, poster_path, rating } = props.movie;
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

  function handelToSingleMovie(movieid, rating) {
    navigate(`/movie/${movieid}`, {
      state: { rating: rating, replace: false },
    });
    console.log("hande to a signle movie", movieid, rating);
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={`${IMAGE_BASE}${poster_path}`}
        alt={title}
        to="/movie"
        onClick={user.username && (() => handelToSingleMovie(id, rating))}
      />
      <CardContent
        to="/movie"
        onClick={user.username && (() => handelToSingleMovie(id, rating))}
      >
        <Typography gutterBottom variant="h7" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item container xs={10}>
            <Rating
              name="read-only"
              value={vote_average / 2}
              precision={0.5}
              readOnly
            />
            <Typography
              variant="body2"
              component="div"
              sx={{ alignContent: "center", m: 0.5 }}
            >
              {vote_average} {rating && <span> / {rating}</span>}
            </Typography>
          </Grid>
          <Grid
            item
            onClick={
              user.username &&
              (() => {
                handelFavorite(user.userid, user.sessionid, id, isFavorite);
              })
            }
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: pink[500] }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
