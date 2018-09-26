import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core';

import style from '../../assets/jss/teamStyle';


class Betting extends Component {
  componentWillMount () {
    const { bettingStore, match: { params: { id } }} = this.props;
    if (id) {
      bettingStore.deployContract(id);
    }
  }

  render () {
    const { bettingStore, classes } = this.props
    const {
      contract,
      setParticipants,
      participants,
      betOnParticipant,
      poolMoney,
      getBets,
      bets,
      startTournament,
      tournamentStatus,
      openBettingWindow,
      timeLeft,
  } = bettingStore;
    return !contract ? <h1 className={classes.title}>Loading...</h1> :
    <div
      className={classes.section}
    >
        Contract Deployed!
        <h1 className={classes.title}>Tournament Status: {tournamentStatus}</h1>
        <h2 className={classes.description}>Participants: {participants.map((participant, key) =>
            <div key={key}>
                {participant}
            </div>)
        }</h2>
        <button onClick={()=>setParticipants(['jake', 'jake'])}>Set Participants</button>
        <button onClick={()=>startTournament()}>Start Tournament</button>
        <button onClick={()=>betOnParticipant("karl")}>For bet</button>
        <button onClick={()=>openBettingWindow()}>Open Betting Window</button>
        {console.log(poolMoney)}
        <h1 className={classes.description}>{poolMoney}</h1>
        <button onClick={()=>getBets("karl")}>Check better amount</button>
        <h2 className={classes.description}>{bets}</h2>
        <h3 className={classes.description}>{timeLeft}</h3>
    </div>
  }
}

export default withStyles(style)(inject('bettingStore')(observer(Betting)));
