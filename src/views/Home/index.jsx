import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import { withStyles } from "@material-ui/core";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import IconButton from "../../components/IconButton";

import teamStyle from "../../assets/jss/teamStyle";

import skj from "../../assets/imgs/faces/skj.jpg";

class TeamSection extends React.Component {
    render() {
        const { classes } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        return (
            <div
                className={classes.section}
            >
                <h2 className={classes.title}>Here is our team</h2>
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card plain>
                                <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                                    <img src={skj} alt="..." className={imageClasses} />
                                </GridItem>
                                <h4 className={classes.cardTitle}>
                                    Stephen Karl
                                    <br />
                                    <small className={classes.smallTitle}>Developer</small>
                                </h4>
                                <CardBody>
                                    <p className={classes.description}>
                                        A Software Engineering Student who develops World-class Web applications.
                                    </p>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(teamStyle)(TeamSection);
