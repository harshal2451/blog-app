import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/action";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
 const history = useHistory()
    const dispatch = useDispatch();
  const { error } = useSelector(
    (state) => ({
      error: state.error,
    }),
    shallowEqual
  );
  const classes = useStyles();
  const [signupDetail, setSignupDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailError: null,
    passwordError: null,
  });

  const validateEmail = (e) => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
      setSignupDetail({
        ...signupDetail,
        emailError: null,
      });
    } else {
      setSignupDetail({
        ...signupDetail,
        emailError: "Invalid Email Address",
      });
    }
  };

  const handleChange = (e) => {
    setSignupDetail({
      ...signupDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = () => {
    if (signupDetail.password !== "") {
      if (signupDetail.password === signupDetail.confirmPassword) {
        setSignupDetail({
          ...signupDetail,
          passwordError: null,
        });
        dispatch(
          actions.register(
            signupDetail.firstName + " " + signupDetail.lastName,
            signupDetail.email,
            signupDetail.password
          )
        ).then((res) => {
          if (res) history.push("/");
        });
      } else {
        setSignupDetail({
          ...signupDetail,
          passwordError: "Confirm password does not match",
        });
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                onChange={handleChange}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                error={signupDetail.emailError !== null ? true : false}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                helperText={signupDetail.emailError}
                onChange={handleChange}
                autoComplete="email"
                onBlur={validateEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                error={signupDetail.passwordError !== null ? true : false}
                helperText={signupDetail.passwordError}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignup}
            disabled={
              signupDetail.emailError
                ? true
                : false
            }
          >
            Sign Up
          </Button>
          {error && (
            <div className="p-3 mb-2  text-danger">{error}</div>
          )}
          <Grid container justifyContent="flex-start">
            <Grid item>
              <NavLink to="/">Already have an account? Sign in</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
