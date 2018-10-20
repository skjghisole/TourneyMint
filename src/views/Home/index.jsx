import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { inject, observer } from 'mobx-react';

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import ImageCard from '../../components/Card/ImageCard';

import teamStyle from "../../assets/jss/teamStyle";

class Home extends Component {
    async componentWillMount() {
        const { bettingStore: { getTournaments } } = this.props;
        await getTournaments();
    }
    render() {
        const { classes, bettingStore: { tournaments } } = this.props;
        return (
            <div
                className={classes.section}
            >
                <h2 className={classes.title}>Tournaments:</h2>
                <div>
                    <GridContainer alignContent={"center"} alignItems={"center"} justify={"center"}>
                    {
                      tournaments.map(tournament => (
                        <GridItem xs={12} sm={12} md={3}>
                          <ImageCard
                            title={tournament.name}
                            text={tournament.status}
                            statText={tournament.poolMoney}
                            src={"https://res.cloudinary.com/dgm3l1csv/image/upload/v1540040144/image.jpg"}
                            url={`/betting/${tournament.address}`}
                          />
                        </GridItem>
                      ))
                    }

                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(teamStyle)(inject('bettingStore')(observer(Home)));
