import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// material-ui components
import { withStyles } from "@material-ui/core";
// @material-ui/icons
import { Bounce } from 'react-reveal';

// core components
import cardStyle from "../../assets/jss/components/cardStyle";

function Card({ ...props }) {
    const { classes, className, children, plain, carousel, ...rest } = props;
    const cardClasses = classNames({
        [classes.card]: true,
        [classes.cardPlain]: plain,
        [classes.cardCarousel]: carousel,
        [className]: className !== undefined
    });
    return (
        <div className={cardClasses} {...rest}>
            <Bounce Top ssrFadeout>
                {children}
            </Bounce>
        </div>
    );
}

Card.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    carousel: PropTypes.bool
};

export default withStyles(cardStyle)(Card);
