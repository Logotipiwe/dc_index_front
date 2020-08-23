import React from 'react';
import './App.css';
import Header from "./App/Header/Header";
import MainRoute from "./App/MainRoute/MainRoute";
import {inject, observer} from "mobx-react";
import RootStore from './Stores/RootStore';
import CommentsRoute from "./App/CommentsRoute/CommentsRoute";
import Portfolio from "./App/Portfolio/Portfolio";

@inject("RootStore")
@observer
class App extends React.Component<{ RootStore?: RootStore, key?: any, id?: any }, any> {
	componentDidMount(): void {
		const route = new URLSearchParams(window.location.search).get('route');
		if(!route) return;
		if(route === 'portfolio') this.props.RootStore!.selectRoute("portfolio");
	}

	render() {
		const RootStore = this.props.RootStore!;
		const MRStore = RootStore.MainRouteStore;
		const backgroundColor = MRStore.getCSScolor(RootStore.appBgColor);
		return (
			<div id="App" style={{backgroundColor}}>
				{/*<Header/>*/}
				{RootStore.selectedRoute === "main" &&
				<>
					<Header/>
					<MainRoute/>
				</>
				}
				{RootStore.selectedRoute === "comments" &&
				<>
					<Header/>
					<CommentsRoute/>
				</>
				}
				{RootStore.selectedRoute === "portfolio" && <Portfolio/>}
			</div>
		);
	}
}

export default App;
