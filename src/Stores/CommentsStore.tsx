import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import EnvAccessor from "../EnvAccessor";


class CommentsStore {
	constructor(RootStore: RootStore) {
		makeAutoObservable(this);
		this.RootStore = RootStore;

		this.onInput = this.onInput.bind(this);
		this.showSuccess = this.showSuccess.bind(this);
		this.hideSuccess = this.hideSuccess.bind(this);
		this.hideErr = this.hideErr.bind(this);
		this.submit = this.submit.bind(this);
		this.fetchComments = this.fetchComments.bind(this);

	}

	RootStore: RootStore;

	comments: IComment[] = [];

	inputComment = '';

	isShowErr = false;
	isShowSuccess = false;
	errMsg: string = '';
	hideErrTimeout: Undefindable<typeof setTimeout.prototype>;

	onInput(e: any) {
		this.inputComment = e.target.value;
	}

	showSuccess(){
		this.isShowSuccess = true;
		setTimeout(this.hideSuccess, 3500)
	}
	hideSuccess(){
		this.isShowSuccess = false;
	}

	showErr(msg = 'Ошибка отправки') {
		this.errMsg = msg;
		this.isShowErr = true;
		this.hideErrTimeout = setTimeout(this.hideErr, 3000);
	}

	hideErr() {
		this.errMsg = '';
		this.isShowErr = false;
	}

	submit(e: any) {
		e.preventDefault();
		const url = (process.env.NODE_ENV === "development")
			? "http://localhost/index/back/send.php"
			: (EnvAccessor.getBackPath() + "/send.php");
		const msg = this.inputComment;
		const sendTime = parseInt(localStorage.getItem('sendTime') || '0');
		if (msg === '') return this.showErr('Надо что-то написать');
		if (msg.length > 30) return this.showErr('Слишком длинное сообщение');
		if (
			sendTime && (new Date().getTime() - 1000 * 3600 * 24 < new Date(sendTime).getTime())
		) return this.showErr("Только одно сообщение раз в сутки :)");

		fetch(url + '?text=' + msg).then(res => res.json()).then(res => {
			if(!res.ok) return;
			this.inputComment = '';
			this.showSuccess();
			localStorage.setItem('sendTime', new Date().getTime().toString());
			this.fetchComments();
		});
	}

	fetchComments() {
		const url = (process.env.NODE_ENV === "development")
			? 'http://localhost/index/back/get.php'
			: (EnvAccessor.getBackPath() + '/get.php');
		fetch(url).then(res => res.json()).then((res: IComment[]) => {
			this.comments = (process.env.NODE_ENV === "development") ? res : res;
		})
	}
}

export default CommentsStore;
