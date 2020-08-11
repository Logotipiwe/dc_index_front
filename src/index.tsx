import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RootStore from "./Stores/RootStore";
import {Provider} from "mobx-react";

const Root = (
  <Provider RootStore={new RootStore()}>
    <App/>
  </Provider>
);

ReactDOM.render(Root,  document.getElementById('root')
);
