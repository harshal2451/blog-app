import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./HomePage.scss";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AllBlogs from "../AllBlogs/AllBlogs";
import BlogDetails from "../BlogDetails";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


export default function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog"/>
        <Switch>
          <Redirect exact from="/blogs" to="/blogs/all" />
          <Route path="/blogs/all" component={AllBlogs} />
          <Route path="/blogs/add" component={BlogDetails} />
          <Route path="/blogs/:id/details" component={BlogDetails} />
          <Route path="/blogs/error/error-v1" render={() => <h1 className="not">404 NOT FOUND</h1>}/>
            <Redirect to="error/error-v1" />
        </Switch>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
