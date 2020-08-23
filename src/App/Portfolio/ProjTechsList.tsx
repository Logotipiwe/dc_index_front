import React from "react";
import './ProjTechsList.scss'

class ProjTechsList extends React.Component<{techs: (TechParsed|undefined)[]}, any>{
	render() {
		return (
			<div className='proj-tech-list'>
				{this.props.techs.map((tech, i) => {
					if (!tech) return null;
					return <div className='proj-tech' key={i}>
					<img src={'index/img/' + tech!.img} alt=''/>
					<div>{tech.title}</div>
					</div>
				})}
			</div>
		);
	}
}

export default ProjTechsList;
