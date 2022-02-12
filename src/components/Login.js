import React, { useState } from "react";
import { FormControl, TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { user, setUser, axiosClient } = props;

  // change the value of input when every stroke user type
  function handelChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // handel login process and redirection
  function handelLogin(username, password) {
    console.log("handel submit");
    axiosClient
      .get("authentication/token/new")
      .then((res) => res.data.request_token)
      .then((token) => {
        console.log("first token", token);
        return axiosClient.post("authentication/token/validate_with_login", {
          username: username,
          password: password,
          request_token: token,
        });
      })
      .then((returnData) => returnData.data.request_token)
      .then((requestToken) => {
        console.log("request token", requestToken);
        return axiosClient.post("/authentication/session/new", {
          request_token: requestToken,
        });
      })
      .then((sessionData) => sessionData.data.session_id)
      .then(
        (sessionId) =>
          (axiosClient.defaults.params = {
            ...axiosClient.defaults.params,
            session_id: sessionId,
          })
      )
      .then(() => axiosClient.get("/account"))
      .then((userInfo) => {
        console.log("user info", userInfo);
        console.log("user", user);
        const userData = {
          ...user,
          username: userInfo.data.username,
          userid: userInfo.data.id,
          sessionid: userInfo.config.params.session_id,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser({ ...userData });
      })
      .then(() => console.log("success", user))
      .then(() => navigate("/"));
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      marginTop={5}
    >
      <FormControl>
        <TextField
          label="Username"
          placeholder="Username"
          margin="dense"
          name="username"
          onChange={handelChange}
        />
        <TextField
          label="Password"
          placeholder="Password"
          margin="dense"
          name="password"
          onChange={handelChange}
        />
        {/* <Button
          variant="contained"
          onClick={() => {
            props.clickLogin(formData.username, formData.password);
          }}
        >
          login
        </Button> */}
        <Button
          variant="contained"
          onClick={() => handelLogin(formData.username, formData.password)}
        >
          login
        </Button>
      </FormControl>
    </Grid>
  );
}
