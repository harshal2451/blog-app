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
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/action";
import { useHistory } from "react-router-dom";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const dispatch = useDispatch();
  const { error } = useSelector(
    (state) => ({
      error: state.error,
    }),
    shallowEqual
  );
  const classes = useStyles();
  const history = useHistory();
  const [signInDetail, setSignInDetail] = useState({
    email: "",
    password: "",
    emailError: null,
  });
  const validateEmail = (e) => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
      setSignInDetail({
        ...signInDetail,
        emailError: null,
      });
    } else {
      setSignInDetail({
        ...signInDetail,
        emailError: "Invalid Email Address",
      });
    }
  };

  const handleChange = (e) => {
    setSignInDetail({
      ...signInDetail,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignin = () => {
    dispatch(
      actions.login(signInDetail.email, signInDetail.password)
    ).then((res) => {
      if (res && res.data.success) history.push("/blogs");
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={signInDetail.emailError !== null ? true : false}
            id="email"
            helperText={signInDetail.emailError}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={validateEmail}
            value={signInDetail.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signInDetail.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {error && (
            <div className="p-3 mb-2  text-danger">{error}</div>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={signInDetail.emailError ? true : false}
            onClick={handleSignin}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <NavLink to="/signup">
                <p>Don't have an account? Sign Up</p>
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
