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
  const {
    user,
    page,
    totalPages,
    movies,
    type,
    setType,
    favoriteList,
    setFavoriteList,
    setPage,
    setMovies,
    setTotalPages,
  } = props;
  const { axiosClient } = props;
  console.log("page", page);
  console.log("total pages", totalPages);
  console.log("type", type);
  console.log("results", movies);
  console.log("username", user);

  // useEffect(() => {
  //   axiosClient
  //     .get(`movie/${type}`, { params: { language: "en-US", page: page } })
  //     .then((results) => {
  //       console.log("api", results);
  //       // const newData = data.results.map((each) => {
  //       //   return { ...each, favorite: false };
  //       // });
  //       setTotalPages(results.data.total_pages);
  //       setPage(results.data.page);
  //       setMovies([...results.data.results]);
  //     });
  // }, []);

  // handel the prev/next pagination and data updating
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
    axiosClient
      .get(`movie/${type}`, { params: { language: "en-US", page: nextPage } })
      .then((results) => {
        console.log("api", results);
        setTotalPages(results.data.total_pages);
        setPage(results.data.page);
        setMovies([...results.data.results]);
      });
  }

  // handel movie categories
  function handelType(e) {
    const selectedType = e.target.value;
    axiosClient
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

  const cardComponents = movies.map((each) => {
    const foundFavorite = Boolean(
      favoriteList.find((eachFav) => eachFav.id === each.id)
    );

    return (
      <Grid item container key={each.id} xs={3} alignItems="stretch">
        <OneCard
          user={user}
          movie={each}
          clickToRate={props.clickToRate}
          isFavorite={foundFavorite ? true : false}
          setFavoriteList={setFavoriteList}
          axiosClient={axiosClient}
          clickFavorite={props.clickFavorite}
        ></OneCard>
      </Grid>
    );
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          {/* <ArrowBackIosNewIcon onClick={() => props.clickPage("back", page)} /> */}
          <ArrowBackIosNewIcon onClick={() => handelPage("back", page)} />
        </Grid>
        <Grid item>
          <Typography variant="body2" component="span" xs={{ pb: 4 }}>
            {page}/{totalPages}
          </Typography>
        </Grid>
        <Grid item>
          {/* <ArrowForwardIosIcon
            onClick={() => props.clickPage("forward", page)}
          /> */}
          <ArrowForwardIosIcon onClick={() => handelPage("forward", page)} />
        </Grid>
      </Grid>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        {/* <Select
          id="demo-simple-select-standard"
          inputProps={{ "aria-label": "Without label" }}
          defaultValue="now_playing"
          onChange={props.clickType}
        > */}
        <Select
          id="demo-simple-select-standard"
          inputProps={{ "aria-label": "Without label" }}
          defaultValue="now_playing"
          onChange={handelType}
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
