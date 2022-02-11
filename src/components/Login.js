import React, { useState } from "react";
import { FormControl, TextField, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handelChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <Button
          variant="contained"
          component={RouterLink}
          onClick={() => props.clickLogin(formData.username, formData.password)}
          to="/"
        >
          login
        </Button>
      </FormControl>
    </Grid>
  );
}
