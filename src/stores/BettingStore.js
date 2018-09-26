import TruffleContract from 'truffle-contract';
import BettingContract from '../deployedContracts/Betting.json';
import { action, observable } from 'mobx';
import { StringToBytes } from '../utils';
import {  Kwei } from '../currencies';

 class BettingStore {
     constructor(rootStore, providerStore, client) {
        this._rootStore = rootStore;
        this._providerStore = providerStore
        this._client = client;
     }

     @observable contract = undefined;
     @observable participants = [];
     @observable poolMoney = 0;
     @observable bets = 0;
     @observable tournamentStatus;
     @observable timeLeft;

     @action
     deployContract = async (id) => {
        const { connect, web3 } = this._providerStore;
        connect();
        if(this.contract) {
            return;
        } else {
            const Contract = await TruffleContract(BettingContract);
            Contract.setProvider(web3.currentProvider);
            const contract = await Contract.at(id);
            this.contract = contract;
        }

        this.getPoolMoney();
        this.updateStatus();
        this.updateParticipants();
        this.updateTimer();
    }

    @action
    updateStatus = async () => {
      const { contract } = this;
      const status = await contract.getTournamentStatus();
      this.tournamentStatus = status;
    };

    @action
    updateTimer = async () => {
      const { contract } = this;
      const timeLeft = await contract.getTimeLeft();

      this.timeLeft = timeLeft.toNumber();
    }

    @action
    updateParticipants = async () => {
      const { contract } = this;
      const participants = await contract.getParticipants();
      this.participants = participants;
    }

     @action
     startTournament = async () => {
       const { accounts } = this._providerStore;
       const { contract } = this;
       await contract.startTournament({from: accounts[0]})
     }

     @action
     setParticipants = async (ids) => {
        const { accounts } = this._providerStore;
        const { contract } = this;
        console.log(contract);
        await contract.setParticipants(ids.map(id => StringToBytes(id)), { from: accounts[0] });
        this.updateParticipants();
     }

     @action
     betOnParticipant = async (id) => {
        const { accounts } = this._providerStore;
        const { contract } = this;
        const result = await contract.bet(StringToBytes(id), {from: accounts[0], value: 1 * Kwei });
        this.getPoolMoney();
    }


    @action
    getPoolMoney = async () => {
        const { contract } = this;

        if (contract) {
            const result = await contract.getPoolMoney();
            this.poolMoney = result.toNumber();
        }
    }

    @action
    openBettingWindow = async () => {
      const { _providerStore, contract, timeLeft, updateStatus, updateTimer } = this;
      const { accounts } = _providerStore;

      await contract.openBettingWindow({ from: accounts[0] });
      if (timeLeft) {
        while(timeLeft > 0) {
          setInterval(()=>updateTimer(), 1000);
        }
      }
      updateStatus();
    }

    @action
    getBets = async (id) => {
        const { contract } = this;
        const result = await contract.totalBetFor(StringToBytes(id))
        this.bets = result.toNumber();
    }

 }

 export default BettingStore;
