import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { NavLink, useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux'
import * as actions from "../../redux/action"
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { sections, title } = props;
const history = useHistory()
  const handleLogout= () => {
    dispatch(actions.logout())
    history.push("/")

  }
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <NavLink
          color="inherit"
          exact
          to="/blogs/all"
          activeStyle={{background: "#E0DDDD"}}
          className={classes.toolbarLink}
        >
          Blogs
        </NavLink>
        <NavLink
          color="inherit"
          exact
          to="/blogs/add"
          activeStyle={{background: "#E0DDDD"}}
          className={classes.toolbarLink}
        >
          Create / Publish Blogs
        </NavLink>
        
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Button variant="outlined" size="small" onClick={handleLogout}>
          Log Out
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
