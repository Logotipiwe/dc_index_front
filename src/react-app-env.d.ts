/// <reference types="react-scripts" />
type Undefindable<T> = undefined | T;
type Nullable<T> = undefined | T;
type routes = "main" | "comments" | "portfolio";

type TechTitles = 'ReactJS' | 'TypeScript' | 'SASS' | 'PHP' | 'NodeJS' | 'Docker' | 'MobX' | 'Git' |
	'MySQL' | 'Mongo' | 'Redis' | 'JQuery';

interface Tech{
	title: TechTitles,
	img?: string,
}
interface TechParsed extends Tech{
	img: string,
}

interface Project{
	title: string,
	techs: TechTitles[],
	desc: JSX.Element | string
}

interface GalleryItem{
	src: string,
	desc?: string | JSX.Element
}

interface IComment {
	color: string,
	id: number,
	positionX: number,
	positionY: number,
	text: string
}
interface MainTitleLetter {
	letter: string,
	color: Color
}
interface Color {
	r: number,
	g: number,
	b: number
}
type lol = {
	a: string
}
