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
import { Typography } from "@mui/material";

const pages = ["home", "favorite", "rated"];

const ResponsiveAppBar = (props) => {
  const { user, setUser, axiosClient } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log("props.user", user);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handelLogOut() {
    console.log("log out");
    axiosClient
      .delete(`/authentication/session`, {
        data: { session_id: user.sessionid },
      })
      .then(() => setUser({}))
      .then(() => console.log("successfully log out"));
  }
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <img src={logo} alt='logo' className='logo' />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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
                    <Link component={RouterLink} to='/' underline='none'>
                      {page}
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                    <Link
                      component={RouterLink}
                      to={`/${page}`}
                      underline='none'
                    >
                      {page}
                    </Link>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img src={logo} alt='logo' className='logo' />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page === "home" ? (
                <Button
                  component={RouterLink}
                  to='/'
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
            {user?.username ? (
              // <Button key="login" color="inherit">
              //   {props.user.username}
              // </Button>
              <>
                <Button
                  key='login'
                  color='inherit'
                  onClick={handleOpenUserMenu}
                >
                  {user?.username}
                </Button>
                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key='logout' onClick={handleCloseUserMenu}>
                    <Typography onClick={handelLogOut} textAlign='center'>
                      logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                key='login'
                to='/login'
                color='inherit'
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
