import MainRouteStore from "./MainRouteStore";
import {action, computed, observable} from "mobx";
import CommentsStore from "./CommentsStore";
import PortfStore from "./PortfStore";


class RootStore {
	constructor() {
		this.MainRouteStore = new MainRouteStore(this);
		this.CommentsStore = new CommentsStore(this);
		this.PortfStore = new PortfStore(this);
	}
	MainRouteStore: MainRouteStore;
	CommentsStore: CommentsStore;
	PortfStore: PortfStore;

	@observable selectedRoute: routes = (process.env.NODE_ENV === "development") ? "main" : "main";
	@observable urlParams = new URLSearchParams(window.location.search);
	@action.bound selectRoute(newRoute: routes){
		this.selectedRoute = newRoute;
	}
	@computed get appBgColor(){
		if(this.selectedRoute === "main") return this.MainRouteStore.getBgColor;
		else if(this.selectedRoute === "comments") return {r: 50, g: 50, b: 50};
		else return {r:255,g:255,b:255}
	}

	@computed get isHeaderContrast(){
		return this.urlParams.get('mode') === 'easy';
	}
}

export default RootStore;
