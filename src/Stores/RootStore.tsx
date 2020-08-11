import MainRouteStore from "./MainRouteStore";
import {action, computed, observable} from "mobx";
import CommentsStore from "./CommentsStore";


class RootStore {
	constructor() {
		this.MainRouteStore = new MainRouteStore(this);
		this.CommentsStore = new CommentsStore(this);
	}
	MainRouteStore: MainRouteStore;
	CommentsStore: CommentsStore;

	@observable selectedRoute: routes = (process.env.NODE_ENV === "development") ? "comments" : "main";
	@action.bound selectRoute(newRoute: routes){
		this.selectedRoute = newRoute;
	}
	@computed get appBgColor(){
		return (this.selectedRoute === "main") ? this.MainRouteStore.getBgColor : {r: 50, g: 50, b: 50};
	}
}

export default RootStore;
