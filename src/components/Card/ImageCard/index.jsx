import React from "react";
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Typography,
    CardMedia
} from "@material-ui/core";
import { Fade } from 'react-reveal';
import { Link } from 'react-router-dom';

import imageCardStyle from "../../../assets/jss/components/imageCardStyle";

function ImageCard({ ...props }) {
  const {
    classes,
    src,
    url,
    title,
    text,
    statLink,
    statText
  } = props;
    return (
        <Fade>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={src}
                    component={Link}
                    to={url}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="title" component="h3" className={classes.cardTitle}>
                        {title}
                    </Typography>
                    <Typography component="p" className={classes.cardCategory}>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <div className={classes.cardStats}>
                        {statLink !== undefined ? (
                            <a href={statLink.href} className={classes.cardStatsLink}>
                                {statLink.text}
                            </a>
                        ) : statText !== undefined ? (
                            <h4>{statText}</h4>
                        ) : null}
                    </div>
                </CardActions>
            </Card>
        </Fade>
    );
}

export default withStyles(imageCardStyle)(ImageCard);
