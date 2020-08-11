/// <reference types="react-scripts" />
type Undefindable<T> = undefined | T;
type Nullable<T> = undefined | T;
type routes = "main" | "comments";
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
