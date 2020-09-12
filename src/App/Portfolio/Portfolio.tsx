import {inject, observer} from "mobx-react";
import React from "react";
import RootStore from "../../Stores/RootStore";
import './Portfolio.scss'
import ProjTechsList from "./ProjTechsList";

@inject("RootStore")
@observer
class Portfolio extends React.Component<{ RootStore?: RootStore }, any> {
	render() {
		const PortfStore = this.props.RootStore!.PortfStore;

		return (
			<div id='Portfolio'>
				<div id='left-side' onScroll={PortfStore.onScrollThrottled}>
					<div id='left-side-content'>
						<a id='back' href='../'>Назад на главную</a>
						<h1>Портфолио</h1>
						<p className='text'>
							Эта страница - описание <b>технологий</b>, которыми я владею и <b>проектов</b>, которые я разработал с их
							использованием.<br/>
						</p>
						<h1>Технологии</h1>
						<div id='tech-list'>
							{PortfStore.techs.map((tech, i) => {
								const techParsed = PortfStore.getTech(tech.title);
								const backgroundImage = "url('index/img/" + techParsed.img + "')";
								return (<div className='tech-item' key={i}>
									<div style={{backgroundImage}}/>
									<p>{techParsed.title}</p>
								</div>)
							})}
						</div>
						<h1>Проекты</h1>
						<div id='proj-list'>
							{PortfStore.projects.map(proj => {
								return (
									<div className='proj-item' key={proj.title}>
										<h2>{proj.title}</h2>
										<ProjTechsList techs={proj.techs.map(t => PortfStore.getTech(t))}/>
										<p>{proj.desc}</p>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div id='right-side'>
					<h1 style={{alignSelf: "center"}}>Внешний вид проектов</h1>
					<div id='gallery'>
						{PortfStore.gallery.map((galleryItem, i) => {
							const opacity = (i === PortfStore.imgNumShows)
								? (i !== PortfStore.gallery.length - 1) ? 1 - (1 - PortfStore.imgOpacity) / 2 : 1
								: (i === PortfStore.galleryClosestItem)
									? 0.5 - PortfStore.imgOpacity
									: 0;
							return <div style={{opacity}} key={i}>
								<img className='img' src={'index/img/' + galleryItem.src}/>
								{galleryItem.desc && <div className='desc'>{galleryItem.desc}</div>}
							</div>
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Portfolio;
