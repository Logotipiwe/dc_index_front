import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";


class MainRouteStore {
	constructor(RootStore: RootStore) {
		makeAutoObservable(this);
		this.RootStore = RootStore;
		const title = '<Logotipiwe/>';
		this.initColor = this.mainTitleColors[Math.floor(Math.random() * this.mainTitleColors.length)];

		this.mainTitle = title.split('').map((letter, i, arr) => {
			const color = (process.env.NODE_ENV === "development" && 0)
				? ((i !== 1) ? this.initColor : this.defaultColor)
				: ((i === 0 || i === arr.length - 1) ? this.initColor : this.defaultColor);
			return {letter, color}
		});

		this.bounceInterval = setTimeout(() => {
			this.setBounce();
			this.bounceInterval = setInterval(() => {
				this.setBounce();
			}, 5000)
		}, 3000);

		this.setBounce = this.setBounce.bind(this);
		this.setDisplayMainTitle = this.setDisplayMainTitle.bind(this);
		this.setTitleDefaultColor = this.setTitleDefaultColor.bind(this);
		this.letterClick = this.letterClick.bind(this);
		this.getCSScolor = this.getCSScolor.bind(this);
	}

	RootStore: RootStore;

	displayMainTitle = false;

	bouncingLetterNum = -1;
	bounceInterval: any;

	setBounce(val?: number) {
		this.bouncingLetterNum = val || Math.floor(
			(Math.random() * this.mainTitle.length - 2)
		) + 2;
	}

	mainTitleColors: Color[] = [
		{r: 234, g: 67, b: 53},
		{r: 66, g: 133, b: 244},
		{r: 52, g: 168, b: 83},
		{r: 251, g: 188, b: 5},
	];

	initColor: Color;

	defaultColor: Color = {r: 128, g: 128, b: 128};

	mainTitle: MainTitleLetter[];

	isShowMenu: boolean = false;

	get getBgColor(): Color {
		const avgR: number = this.mainTitle.reduce((sum, letter) => {
			return sum + ((Object.is(this.defaultColor, letter.color)) ? 255 : letter.color.r);
		}, 0);
		const avgG: number = this.mainTitle.reduce((sum, letter) => {
			return sum + ((Object.is(this.defaultColor, letter.color)) ? 255 : letter.color.g);
		}, 0);
		const avgB: number = this.mainTitle.reduce((sum, letter) => {
			return sum + ((Object.is(this.defaultColor, letter.color)) ? 255 : letter.color.b);
		}, 0);
		return {
			r: Math.round(avgR / this.mainTitle.length) + 30,
			g: Math.round(avgG / this.mainTitle.length) + 30,
			b: Math.round(avgB / this.mainTitle.length) + 30
		};
	}

	setDisplayMainTitle(val: boolean) {
		this.displayMainTitle = val;
	}

	setTitleDefaultColor() {
		this.mainTitle.forEach((letter, i, arr)=>{
			if (i === 0 || i === arr.length-1) return;
			letter.color = this.defaultColor;
		})
	}

	letterClick(letter: MainTitleLetter) {
		const colorsToSelect = this.mainTitleColors.filter((x, i, arr) => arr.indexOf(letter.color) !== i);
		letter.color = (process.env.NODE_ENV === 'development' && 0)
			? this.initColor
			: colorsToSelect[Math.floor(Math.random() * colorsToSelect.length)];
		if (this.isTitleInSameColor) this.displayMainTitle = false;

		clearInterval(this.bounceInterval);
	}

	get isTitleInSameColor() {
		return this.mainTitle.filter(x => !Object.is(this.initColor, x.color)).length === 0;
	}

	getCSScolor(c: Color) {
		return 'rgb(' + [c.r, c.g, c.b].join(',') + ')';
	}
}

export default MainRouteStore;
