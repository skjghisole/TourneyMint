import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import "./App.css";
import Dialog from './components/GameComponent/GameComponentDialog';

import Skeleton from "./views/Skeleton";

class App extends Component {
  componentDidMount = async () => {
    const { providerStore } = this.props;
    const { connect } = providerStore;
    connect();
  };

  render() {
    return (
      <div className="App">
        <Skeleton />
        <Dialog />
      </div>
    );
  }
}

export default withRouter(inject('providerStore')(observer(App)));
