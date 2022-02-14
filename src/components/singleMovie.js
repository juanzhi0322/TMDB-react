import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { CardContent } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function SingleMovie(props) {
  const { axiosClient, user } = props;
  const { movieId } = useParams();
  const [singleMovieData, setSingleMovieData] = useState([]);
  const [scores, setScores] = useState();
  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();
  console.log("single movie id", movieId, "user session id", user);

  useEffect(() => {
    axiosClient
      .get(`/movie/${movieId}`)
      .then((res) => setSingleMovieData(res.data));
  }, []);
  function handelRatingChange(e) {
    setScores(e.target.value);
    console.log(e.target.value);
  }

  function handelRatingSubmit() {
    axiosClient
      .post(
        `/movie/${movieId}/rating`,
        { value: scores },
        { params: { session_id: user.sessionid } }
      )
      .then((res) => console.log("rated this movie", scores, "pointes", res))
      .then(() => navigate("/rated"));
  }

  return (
    singleMovieData.length !== 0 && (
      <Container sx={{ mt: 4, mb: 4, display: "flex" }}>
        <Card>
          <CardMedia
            component="img"
            height="500"
            image={`https://image.tmdb.org/t/p/w500${singleMovieData.poster_path}`}
            alt="poster"
          />
        </Card>
        <Box sx={{ width: "60%" }}>
          <CardContent>
            <Typography variant="h5" component="h1">
              {singleMovieData.title}
            </Typography>
            <Typography variant="subtitle2" mt={1}>
              Release Date:
            </Typography>
            <Typography variant="body2" component="p">
              {singleMovieData.release_date}
            </Typography>
            <Typography variant="subtitle2" mt={1}>
              Overview:
            </Typography>
            <Typography variant="body2">{singleMovieData.overview}</Typography>
            <Typography variant="subtitle2" mt={1}>
              Genres:
            </Typography>
            {singleMovieData.genres.map((each) => {
              return (
                <Typography
                  variant="body2"
                  component="span"
                  color="primary"
                  sx={{
                    borderRadius: 2,
                    p: 0.5,
                    mx: 0.5,
                  }}
                >
                  {each.name}
                </Typography>
              );
            })}
            <Typography variant="subtitle2" mt={1}>
              Average Rating:
            </Typography>
            <Typography variant="body2">
              {singleMovieData.vote_average}
            </Typography>
            <Typography variant="subtitle2" mt={1}>
              Your Rating:
            </Typography>

            <select value={scores} onChange={handelRatingChange}>
              {ratingOptions.map((each) => {
                return <option value={each}>{each}</option>;
              })}
            </select>
            <Button
              variant="contained"
              onClick={handelRatingSubmit}
              sx={{ mx: 1, py: 0.3 }}
            >
              Rate it!
            </Button>
            <Typography variant="subtitle2" mt={1}>
              Production Companies:
            </Typography>
            {singleMovieData.production_companies.map((each) => {
              return (
                <Typography
                  variant="body2"
                  component="span"
                  color="primary"
                  sx={{
                    borderRadius: 2,
                    p: 0.5,
                    mx: 0.5,
                  }}
                >
                  {each.name}
                </Typography>
              );
            })}
          </CardContent>
        </Box>
      </Container>
    )
  );
}
