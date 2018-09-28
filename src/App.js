import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import Web3 from 'web3';
import "./App.css";
import Dialog from './components/GameComponent/GameComponentDialog';

import Skeleton from "./views/Skeleton";
const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/8fb4ef458a6c43a9864e4e072e55057f');
const web3 = new Web3(provider);


class App extends Component {
  componentDidMount = async () => {
    const { providerStore } = this.props;
    const { connect, _client } = providerStore;
    // const contract = await _client.service('/api/contracts').get('0x4a45f45460e18a5b194774dac51f7c8626ebe67d')
    // //0x3e6ade39e0a26da6251f28a43197be61c8842de1
    // const { address, abi } = JSON.parse(contract);
    // const newContract = new web3.eth.Contract(abi, address);
    // const participants = await newContract.methods.getParticipants().call();
    connect();
  };

  render() {
    const { providerStore } = this.props;
    const { web3, connect } = providerStore;
    return (
      <div className="App">
        <Skeleton />
        <Dialog />
      </div>
    );
  }
}

export default inject('providerStore')(observer(App));
