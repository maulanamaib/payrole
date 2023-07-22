import logo from "../logo.svg";
import "../App.css";
import React, { Component, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// import Form from './login'
// import { Avatar, Icon } from '@mui/material';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Button, colors, Grid } from "@mui/material";
import HomeComponent from "../home/exexcel";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { textAlign } from "@mui/system";
// import { useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

const baseURL = "http://192.168.60.99:3000/";

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// const Clickme = ()=>{
//       console.log(HomeComponent);

// }
// const loginUser = () => {
//   localStorage.setItem("token", "some-login-token");
//   history.push("./exexcel");
// };

export default function Reg() {
  const them = useTheme();
  const navigate = useNavigate();

  // function LoginHandler(event){
  //   event.preventDefault();

  //   const checklogin = true;
  //   if (checklogin) {
  //       navigate('/homecomponent');
  //   }

  // }

  const shadowlah = {
    // boxShadow: '1px 2px 9px #F4AAB9',
    // margin: '4em',
    // padding: '1em',
    BoxShadow: "-1px 3px 103px 32px rgba(0,0,0,0.75)",
    WebkitBoxShadow: "-1px 3px 103px 32px rgba(0,0,0,0.75)",
    MozBoxShadow: "-1px 3px 103px 32px rgba(0,0,0,0.75)",
  };
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const Register = () => {
    const formData = {
      email: email,
      username: username,
      password: password,
    };

    axios
      .post(baseURL + "register", formData, {
        headers: {
          "Content-Type": "application/JSON",
        },
      })
      .then(function (respone) {
        console.log(respone);
        if (respone) {
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
        setAlert("akun sudah ada");
      });
  };

  const [alert, setAlert] = useState();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      // display= 'inline-flex'
      // grid-template-rows= '100px 100px 100px'
      // grid-template-columns= '100px 100px 100px'
      // grid-gap= '3px'
      position="absolute"
      top="50px"
      left="10px"
      transform="translate(-50%, -50%)"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      {/* 
    <div style={{position: 'relativ',}}> */}
      <Card
        style={shadowlah}
        sx={{
          minWidth: 500,
          display: "flex",
          background: "linear-gradient(45deg, #f0f1f7 30%, #6b81fe 90%)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5" align="center">
              Register
            </Typography>
          </CardContent>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "24ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "24ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              type="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "24ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box align="center" autoHideDuration={6000}>
            <Alert severity="" style={{ color: "red" }}>
              {alert}
            </Alert>{" "}
          </Box>
          <Button
            onClick={Register}
            component="button"
            sx={{ m: 3, width: "25ch" }}
            variant="contained"
          >
            Register
          </Button>

          <Link
            to="/"
            style={{ variant: "body2", underline: "hover" }}
            align="center"
          >
            LogIn
          </Link>
          <Box sx={{ display: "flex", alignItems: "center", pl: 7, pb: 3 }}>
            <IconButton>
              <Icon
                onClick={() => openInNewTab("C:ReactJswebsrclogin.js")}
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/733/733635.png"
              />
            </IconButton>
            <IconButton>
              <Icon
                onClick={() => openInNewTab("https://github.com/maulanamaib")}
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png"
              />
            </IconButton>
            <IconButton>
              <Icon
                onClick={() =>
                  openInNewTab("https://www.instagram.com/maulana.maib/")
                }
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/733/733614.png"
              />
            </IconButton>
          </Box>
        </Box>
        {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        src="https://cdns-images.dzcdn.net/images/cover/902dc007a189d45a9c82e212a1f87f0e/264x264.jpg"
        alt="Live from space album cover"
      /> */}
        <CardMedia
          component="img"
          style={{ width: "300px", height: "500px" }}
          src="https://media2.giphy.com/media/QVreOR83Fgr67g2WFJ/giphy.gif?cid=ecf05e47910tws2hlell3tw7j1590n2j98lf52zu38gphqva&rid=giphy.gif&ct=g"
        />
      </Card>
      {/* </div> */}
    </Grid>
  );
}
