import React from 'react';
import {inject, observer} from "mobx-react";
import RootStore from "../../Stores/RootStore";
import "./MainRoute.scss"
import {CSSTransition} from "react-transition-group";

@inject("RootStore")
@observer
class MainRoute extends React.Component<{ RootStore?: RootStore, key?: any, id?: any }, any> {

	componentDidMount(): void {
		setTimeout(this.props.RootStore!.MainRouteStore.setDisplayMainTitle.bind(null, true), 1000)
	}

	componentWillUnmount(): void {
		let MRStore = this.props.RootStore!.MainRouteStore;
		MRStore.setBounce(-1);
		MRStore.setTitleDefaultColor();
	}

	render() {
		const MRStore = this.props.RootStore!.MainRouteStore;

		const mainTitle = (
			<div className='main_title' key='main_title'>
				{MRStore.mainTitle.map((item, i) => {
					const isBounce = MRStore.bouncingLetterNum === i;
					const className = (isBounce) ? 'letter letter_bounce' : 'letter';
					const onClick = (i !== 0 && i !== MRStore.mainTitle.length - 1)
						? MRStore.letterClick.bind(null, item)
						: undefined;
						return (
							<span
								className={className}
								key={i}
								style={{color: MRStore.getCSScolor(item.color)}}
								onClick={onClick}
							>
                {item.letter}
              </span>
						)
					}
				)}
			</div>
		);
		return (
			<div id="MainRoute">
				<CSSTransition
					unmountOnExit
					in={MRStore.displayMainTitle}
					timeout={1000}
					classNames={'my-node'}
				>
					{mainTitle}
				</CSSTransition>
			</div>
		);
	}
}

export default MainRoute;
