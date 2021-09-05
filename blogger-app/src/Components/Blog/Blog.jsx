import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {  Tooltip } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import "./Blog.scss";
import img from '../../../src/download.png'
const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
});

export default function Blog(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className="title-container">
          <Typography gutterBottom variant="h5" component="h2">
            {props.blogData.blog_title}
          </Typography>
          {props.user.id === props.blogData?.user_id && <CardActions>
            <Tooltip title="Delete Blog">
              <Button size="small" color="primary" onClick={props.onDelete}>
                <DeleteIcon fontSize="small"/>
              </Button>
            </Tooltip>
          </CardActions>}
        </div>

        <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
         { props.blogData.blog_description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
