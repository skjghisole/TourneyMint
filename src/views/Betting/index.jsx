import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

class Betting extends Component {
  componentWillMount () {
    const { bettingStore, match: { params: { id } }} = this.props;
    if (id) {
      bettingStore.deployContract(id);
    }
  }

  render () {
    const { bettingStore } = this.props
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
    return !contract ? <h1>Loading...</h1> :
    <div>
        Contract Deployed!
        <h1>Tournament Status: {tournamentStatus}</h1>
        <h2>Participants: {participants.map((participant, key) =>
            <div key={key}>
                {participant}
            </div>)
        }</h2>
        <button onClick={()=>setParticipants(['jake', 'jake'])}>Set Participants</button>
        <button onClick={()=>startTournament()}>Start Tournament</button>
        <button onClick={()=>betOnParticipant("karl")}>For bet</button>
        <button onClick={()=>openBettingWindow()}>Open Betting Window</button>

        <h1>{poolMoney}</h1>
        <button onClick={()=>getBets("karl")}>Check better amount</button>
        <h2>{bets}</h2>
        <h3>{timeLeft}</h3>
    </div>
  }
}

export default inject('bettingStore')(observer(Betting))
