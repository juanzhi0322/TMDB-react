import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../logo.svg";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const pages = ["home", "favorite", "rated"];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  console.log("props.user", props.user);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <img src={logo} alt="logo" className="logo" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                page === "home" ? (
                  <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                    <Link component={RouterLink} to="/" underline="none">
                      {page}
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                    <Link
                      component={RouterLink}
                      to={`/${page}`}
                      underline="none"
                    >
                      {page}
                    </Link>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img src={logo} alt="logo" className="logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page === "home" ? (
                <Button
                  component={RouterLink}
                  to="/"
                  key={page}
                  // onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  to={`/${page}`}
                  key={page}
                  // onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {props.user.username ? (
              <Button key="login" color="inherit">
                {props.user.username}
              </Button>
            ) : (
              <Button
                component={RouterLink}
                key="login"
                to="/login"
                color="inherit"
              >
                login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
