import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import OneCard from "../sharedUI/OneCard";
import { Container } from "@mui/material";

export default function Favorite(props) {
  const { user, axiosClient, favoriteList, setFavoriteList } = props;

  useEffect(() => {
    axiosClient
      .get(`/account/${user.userid}/favorite/movies`, {
        params: { session_id: user.sessionid },
      })
      .then((res) => setFavoriteList(res.data.results))
      .then(() => console.log("get favorites list current", favoriteList));
  }, []);

  const cardComponents = favoriteList.map((each) => {
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
    <>
      <h1 className="title">Favorite</h1>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {cardComponents}
        </Grid>
      </Container>
    </>
  );
}
