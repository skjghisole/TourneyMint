import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Button } from '@material-ui/core';
import { BracketGenerator } from 'react-tournament-bracket';
import GameComponent from '../../components/GameComponent';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import style from '../../assets/jss/teamStyle';


class Betting extends Component {
  async componentWillMount () {
    const { bettingStore, match: { params: { id } }} = this.props;
    const { deployContract, getGame, updateStatus, getPoolMoney, getParticipants } = bettingStore;
    if (id) {
      await deployContract(id);
      getParticipants();
      setInterval(()=>{
        getGame()
        updateStatus()
        getPoolMoney()
      }, 4000);
    }
  }

  async componentDidMount() {
    const { bettingStore } = this.props;
    const { updateTotalBetForEachParticipants } = bettingStore;
    setInterval(() => {
        updateTotalBetForEachParticipants()
      }, 2000)
  }

  render () {
    const { bettingStore, classes } = this.props
    const {
      contract,
      game,
      status,
      poolMoney,
      totalBetForEachParticipants,
      claimWinnings,
      timeLeft
    } = bettingStore;
    return !contract ? <h1 className={classes.title}>Loading...</h1> :
    <div
      className={classes.section}
    >
        Contract Deployed!
        <GridContainer direction="column">
          <h1 className={classes.title}>Tournament Status: {status === "betting" ? (timeLeft < Date.now() ? "Betting Closed" : status) : status}</h1>
          <h3 className={classes.smallTitle}>Total Pool Money: {poolMoney}</h3>
          <GridItem sm={12}>
            { game && <BracketGenerator gameDimensions={{ "height": 125, "width": 350 }} games={[game]} GameComponent={GameComponent}/> }
          </GridItem>
          <GridItem sm={12}>
            {
              totalBetForEachParticipants && totalBetForEachParticipants.map((x, index) =>
                <h4 className={classes.smallTitle} key={index}>{x.participant}: {x.amount}</h4>
              )
            }
          </GridItem>
          <GridItem sm={12}>
            {status === "ended" && <Button onClick={()=>claimWinnings()}>CLAIM WINNINGS!</Button>}
          </GridItem>
        </GridContainer>
    </div>
  }
}

export default withStyles(style)(inject('bettingStore')(observer(Betting)));
