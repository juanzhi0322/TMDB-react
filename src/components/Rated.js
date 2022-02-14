import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import OneCard from "../sharedUI/OneCard";
import { Container } from "@mui/material";

export default function Rated(props) {
  const {
    user,
    axiosClient,
    favoriteList,
    myRating,
    setMyRating,
    setFavoriteList,
  } = props;
  useEffect(() => {
    axiosClient
      .get(`/account/${user.userid}/rated/movies`, {
        params: { session_id: user.sessionid },
      })
      .then((res) => setMyRating(res.data.results))
      .then(() => console.log("set my rating", myRating));
  }, []);
  const cardComponents = myRating.map((each) => {
    const foundFavorite = Boolean(
      favoriteList.find((eachFav) => eachFav.id === each.id)
    );
    return (
      <Grid item container key={each.id} xs={3} alignItems="stretch">
        <OneCard
          user={user}
          movie={each}
          isFavorite={foundFavorite ? true : false}
          setFavoriteList={setFavoriteList}
          axiosClient={axiosClient}
          clickToRate={props.clickToRate}
          clickFavorite={props.clickFavorite}
        ></OneCard>
      </Grid>
    );
  });
  return (
    myRating.length !== 0 && (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {cardComponents}
        </Grid>
      </Container>
    )
  );
}
