import MainRouteStore from "./MainRouteStore";
import {makeAutoObservable} from "mobx";
import CommentsStore from "./CommentsStore";
import PortfStore from "./PortfStore";


class RootStore {
	constructor() {
		makeAutoObservable(this);
		this.MainRouteStore = new MainRouteStore(this);
		this.CommentsStore = new CommentsStore(this);
		this.PortfStore = new PortfStore(this);

		this.selectRoute = this.selectRoute.bind(this);
	}
	MainRouteStore: MainRouteStore;
	CommentsStore: CommentsStore;
	PortfStore: PortfStore;

	selectedRoute: routes = (process.env.NODE_ENV === "development") ? "main" : "main";
	urlParams = new URLSearchParams(window.location.search);
	selectRoute(newRoute: routes){
		this.selectedRoute = newRoute;
	}
	get appBgColor(){
		if(this.selectedRoute === "main") return this.MainRouteStore.getBgColor;
		else if(this.selectedRoute === "comments") return {r: 50, g: 50, b: 50};
		else return {r:255,g:255,b:255}
	}

	get isHeaderContrast(){
		return this.urlParams.get('mode') === 'easy';
	}
}

export default RootStore;
