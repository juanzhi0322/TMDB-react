import React from "react";
import OneCard from "../sharedUI/OneCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Home(props) {
  const { user, page, totalPages, movies, type } = props;
  console.log("page", page);
  console.log("total pages", totalPages);
  console.log("type", type);
  console.log("results", movies);
  console.log("clickToRate function home", props.clickToRate);
  console.log("clickFavorite function home", props.clickFavorite);
  console.log("username", user);
  const cardComponents = movies.map((each) => {
    return (
      <Grid item container key={each.id} xs={3} alignItems="stretch">
        <OneCard
          user={user}
          movie={each}
          clickToRate={props.clickToRate}
          clickFavorite={props.clickFavorite}
        ></OneCard>
      </Grid>
    );
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <ArrowBackIosNewIcon onClick={() => props.clickPage("back", page)} />
        </Grid>
        <Grid item>
          <Typography variant="body2" component="span" xs={{ pb: 4 }}>
            {page}/{totalPages}
          </Typography>
        </Grid>
        <Grid item>
          <ArrowForwardIosIcon
            onClick={() => props.clickPage("forward", page)}
          />
        </Grid>
      </Grid>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          id="demo-simple-select-standard"
          inputProps={{ "aria-label": "Without label" }}
          defaultValue="now_playing"
          onChange={props.clickType}
        >
          <MenuItem value="now_playing">Now Playing</MenuItem>
          <MenuItem value="top_rated">Top rated</MenuItem>
          <MenuItem value="popular">Popular</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {cardComponents}
      </Grid>
    </Container>
  );
}