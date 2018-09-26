import React from 'react';
import RoutedApp from '../../routes/'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import Header from '../../components/Header'
import Footer from "../../components/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/Button";
import HeaderLinks from "../../components/HeaderLinks";
import Parallax from "../../components/Parallax";

import styles from '../../assets/jss/landingPageStyles';
// import TeamSection from './TeamSection';

const Skeleton = ({ classes, ...rest }) => (
    <div>
       <Header
        color="transparent"
        brand="TourneyMint"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
       />
      <Parallax filter image={require("../../assets/imgs/landing-bg.jpg")}>
          <div className={classes.container}>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                      <h1 className={classes.title}>Bet With Style.</h1>
                      <h4>
                        Win Sweet Victories
                      </h4>
                      <br />
                  </GridItem>
              </GridContainer>
          </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
            <RoutedApp />
        </div>
        <Footer />
      </div>
    </div>
)

export default withStyles(styles)(Skeleton);
