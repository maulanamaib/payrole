import logo from "../logo.svg";
// import logo from 
import "../App.css";
import React, { Component, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
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
import { Button, colors, FormControlLabel, Grid, Input } from "@mui/material";
// import FormControlLabel from '@mui/material/FormControlla';
import HomeComponent from "../home/exexcel";
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

export default function Cart() {
  const them = useTheme();
  const navigate = useNavigate();

  // function LoginHandler(event){
  //   event.preventDefault();

  //   const checklogin = true;
  //   if (checklogin) {
  //       navigate('/homecomponent');
  //   }

  // }
  // const [session, setSession] = useState({});
  // useEffect(()=>{
  //   localStorage.setItem('session',session);

  // },[session]);
  const [checked, setChecked] = useState(false);
  const handleClickCheck = () => {
    if (setChecked(true)) {
    } else if (setChecked(true)) {
    }
  };

  const [alert, setAlert] = useState("");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const Login = () => {
    const formData = {
      username: username,
      password: password,
      role: "admin",
    };

    // setSession(formData);
    axios
      .post(baseURL + "login", formData, {
        headers: {
          "Content-Type": "application/JSON",
        },
      })
      .then(function (respone) {
        console.log(respone);
        if (respone) {
          navigate("/homecomponent");
          // console.log(1)
          localStorage.setItem("role", formData.role);
          //  console.log(localStorage.getItem('role'));

          // respone.session.data = formData;
        }
      })
      .catch(function (error) {
        console.log(error);
        setAlert("username atau password\nsalah!");
      });
  };

  const shadowlah = {
    // boxShadow: '1px 2px 9px #F4AAB9',
    // margin: '4em',
    // padding: '1em',
    BoxShadow: "-1px 3px 103px 32px rgba(0,0,0,0.75)",
    WebkitBoxShadow: "-1px 3px 103px 32px rgba(0,0,0,0.75)",
    MozBoxShadow: "-1px 3px 103px 32px rgba(0,0,0,0.75)",
  };

  // const error = () => {
  //   setAlert("Example error message!")
  // }
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
      style={{
        minHeight: "70vh",
        backgroundImage:
          "https://free4kwallpapers.com/uploads/originals/2022/04/20/rubiks-cube-digital-art-wallpaper.jpg",
      }}
    >
      {/* 
    <div style={{position: 'relativ',}}> */}
      {/* <Card style={shadowlah} sx={{display: 'flex',backgroundImage: "url('')"}}> */}
      <Card
        style={shadowlah}
        sx={{
          display: "flex",
          background: "linear-gradient(90deg, #cadedc 50%,#98a3a2 90%)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5" align="center">
              Login
            </Typography>
          </CardContent>
          <form>
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

            {/* <FormControlLabel sx={{m:1}} control={<Checkbox value={checked} onChange={(e)=>setChecked(e.target.value)} />} label="remember me" /> */}
            <div autoHideDuration={6000} className="error">
              <Alert severity="" style={{ color: "red" }}>
                {alert}
              </Alert>{" "}
            </div>
            <Button
              onClick={Login}
              component="button"
              sx={{ m: 2, width: "27ch" }}
              variant="contained"
            >
              Login
            </Button>
          </form>

          <Link
            to="/reg"
            style={{ variant: "body2", underline: "hover" }}
            align="center"
          >
            Register?
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
      </Card>
      {/* </div> */}
    </Grid>
  );
}
