import React from 'react';
import './App.css';
import Header from "./App/Header/Header";
import MainRoute from "./App/MainRoute/MainRoute";
import {inject, observer} from "mobx-react";
import RootStore from './Stores/RootStore';
import CommentsRoute from "./App/CommentsRoute/CommentsRoute";

@inject("RootStore")
@observer
class App extends React.Component<{ RootStore?: RootStore, key?: any, id?: any }, any> {
  render() {
    const RootStore = this.props.RootStore!;
    const MRStore = RootStore.MainRouteStore;
    const backgroundColor = MRStore.getCSScolor(RootStore.appBgColor);
    return (
      <div id="App" style={{backgroundColor}}>
        <Header/>
        {RootStore.selectedRoute === "main" && <MainRoute/>}
        {RootStore.selectedRoute === "comments" && <CommentsRoute/>}
      </div>
    );
  }
}

export default App;
