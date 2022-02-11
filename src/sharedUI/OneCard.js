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

export default function OneCard(props) {
  const { id, title, vote_average, poster_path } = props.movie;
  const user = props.user;
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  return (
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={`${IMAGE_BASE}${poster_path}`}
        alt={title}
        onClick={user.username && (() => props.clickToRate(id))}
      />
      <CardContent onClick={user.username && (() => props.clickToRate(id))}>
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
          <Grid
            item
            onClick={user.username && (() => props.clickFavorite(user.userid))}
          >
            <FavoriteBorderIcon />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
