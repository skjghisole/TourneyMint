/* eslint-disable */
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// material-ui components
import {
    withStyles,
    List,
    ListItem,
    Tooltip
} from "@material-ui/core";

// @material-ui/icons
import { Apps } from "@material-ui/icons";

// core components
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

import headerLinksStyle from "../../assets/jss/components/headerLinkStyle";

function HeaderLinks({ ...props }) {
    const { classes } = props;
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="instagram-facebook"
                    title="Follow us on facebook"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: classes.tooltip }}
                >
                    {/* <IconButton
                        color="transparent"
                        href="https://www.facebook.com/CreativeTim"
                        target="_blank"
                        className={classes.navLink + " " + classes.socialIconsButton}
                    >
                        <i className={classes.socialIcons + " fab fa-facebook"} />
                    </IconButton> */}
                    <Button
                        color="transparent"
                        className={
                            classes.navLink + " " + classes.socialIconsButton
                        }
                        href="https://www.facebook.com/groups/112178325955419/"
                    >
                        <i
                            className={
                                classes.socialIcons +
                                " " +
                                classes.marginRight5 +
                                " fab fa-facebook"
                            }
                        />{" "}
                        Facebook
                    </Button>
                </Tooltip>
            </ListItem>
        </List >
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
