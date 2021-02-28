import React, { useState } from "react";
import { Close, KeyboardArrowUp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import {
  MenuItem,
  Popover,
  IconButton,
  Fab,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItems from "./MenuItems";
import { AuthButton } from "./AuthButton/AuthButton";
import BackToTop from "./BackToTop";
import "./Navbar.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    textAlign: "center",
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = () => {
    setAuth(false);
    setAnchorEl(null);
  };

  const handleClick = () => setClicked(!clicked);

  return (
    <div>
      <nav className="NavbarItems">
        <Link to="/">
          <img className="navbar-logo" src="/img/logo/final.png" alt="logo" />
        </Link>
        <div className="user-profile">
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  src="./img/profile/1.jpg"
                  alt="Profile"
                  className={classes.large}
                />
              </IconButton>
              <Popover
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={open}
                onClose={handleClose}
              >
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem onClick={handlelogout}>Log out</MenuItem>
                </Link>
              </Popover>
            </div>
          ) : (
            <div>
              <div className="inner">
                <Link to="/login">
                  <AuthButton>Login</AuthButton>
                </Link>
              </div>
              <div className="inner">
                <Link to="/register">
                  <AuthButton>Sign up</AuthButton>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="menu-icon" onClick={handleClick}>
          {clicked ? (
            <Close className="close-icon" />
          ) : (
            <MenuIcon className="bar-icon" />
          )}
        </div>

        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.link}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Toolbar id="back-to-top-anchor" />

      <BackToTop>
        <Fab color="secondary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp fontSize="large" />
        </Fab>
      </BackToTop>
    </div>
  );
}
