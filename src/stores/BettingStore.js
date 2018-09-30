import TruffleContract from 'truffle-contract';
import BettingContract from '../deployedContracts/Betting.json';
import { action, observable, toJS } from 'mobx';
import { StringToBytes, BytesToString } from '../utils';
import { Kwei, Ether } from '../currencies';

 class BettingStore {
     constructor(rootStore, providerStore) {
        this._rootStore = rootStore;
        this._providerStore = providerStore
     }

     @observable contract;
     @observable participants = [];
     @observable poolMoney = 0;
     @observable bettedOn = {};
     @observable bets = 0;
     @observable game;
     @observable hoveredTeamId;
     @observable status;
     @observable totalBetForEachParticipants;
     @observable timeLeft;

     @action
     setBet = (id, value) => {
       this.bettedOn[id] = { id, value: value*Ether };
     }

     @action
     submitBet = () => {
      const { contract, _providerStore } = this;
      const { accounts } = _providerStore;
      Object.keys(this.bettedOn).forEach(async (key) => {
        const { value } = this.bettedOn[key];
        await contract.bet(StringToBytes(key), {from: accounts[0], value});
      });
      this.bettedOn = {};
      this._rootStore.uiStore.closeDialog();
    }

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
        this.getTimeLeft();
    }

    @action
    updateStatus = async () => {
      const { contract } = this;
      const status = await contract.getTournamentStatus();
      this.status = status;
    };

    @action
    openGameControllerDialog = (game, content) => {
        if(!game.sides.home.team || !game.sides.visitor.team){
            return;
        }
        this._rootStore.uiStore.setDialog(game.name, content);
        this._rootStore.uiStore.openDialog();
    }


    @action
    hoverTeamChange = (team) => {
        this.hoveredTeamId = team
    }

    @action
    getGame = async () => {
      const { connect } = this._providerStore;
      connect();
      const { contract } = this;
      if (contract) {
        const hash = await contract.getGameHash();
        const resp = await fetch(`https://ipfs.io/ipfs/${hash}`);
        const game = await resp.json();
        this.game = game._gameBracket;
      }
    }

     @action
     betOnParticipant = async (id) => {
        const { accounts } = this._providerStore;
        const { contract } = this;
        const result = await contract.bet(StringToBytes(id), {from: accounts[0], value: 1 * Kwei });
        this.getPoolMoney();
    }

    @action
    getParticipants = async () => {
      const { contract } = this;
      const participants = await contract.getParticipants();
      const totalBetForEachParticipants = await Promise.all(participants.map(async (participant) => {
        const amount = await this.getBets(participant);
        return ({ participant: BytesToString(participant), amount});
      }));
      this.totalBetForEachParticipants = totalBetForEachParticipants;
      this.participants = participants;
    }

    @action
    updateTotalBetForEachParticipants = async () => {
      if(!this.participants) {
        return;
      }
      const totalBetForEachParticipants = await Promise.all(this.participants.map(async (participant) => {
        const amount = await this.getBets(participant);
        return ({ participant: BytesToString(participant), amount});
      }));
      this.totalBetForEachParticipants = totalBetForEachParticipants;
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
    getTimeLeft = async () => {
        if(!this.contract) {
            return;
        }
        if(this.timeLeft) {
            return;
        }
        const timeLeft = await this.contract.dateToStart();
        this.timeLeft = timeLeft.toNumber()*1000;
    }

    @action
    getBets = async (id) => {
        const { contract } = this;
        const result = await contract.totalBetFor(id)
        return result.toNumber();
    }

    @action
    claimWinnings = async () => {
      const { contract, _providerStore } = this;
      const { accounts } = _providerStore;
      await contract.claimWinnings({ from: accounts[0] });
    }

 }

 export default BettingStore;
