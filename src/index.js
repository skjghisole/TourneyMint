import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./assets/scss/styles.css";

// import client from './client';
import {
    ProviderStore,
    RootStore,
    BettingStore,
    UIStore
} from './stores';

const rootStore = new RootStore();
const providerStore = new ProviderStore(rootStore);
const bettingStore = new BettingStore(rootStore, providerStore);
const uiStore = new UIStore(rootStore);

const stores = {
    rootStore,
    providerStore,
    bettingStore,
    uiStore
};

rootStore.setStore(stores);

const ProviderWrappedApp = () => (<Provider {...stores}>
    <Router>
        <App />
    </Router>
</Provider>)

ReactDOM.render(<ProviderWrappedApp />, document.getElementById('root'));
registerServiceWorker();
