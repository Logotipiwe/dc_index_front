import RootStore from "./RootStore";
import {action, observable} from "mobx";


class CommentsStore {
	constructor(RootStore: RootStore) {
		this.RootStore = RootStore;
	}

	RootStore: RootStore;

	@observable comments: IComment[] = [];

	@observable inputComment = '';

	@observable isShowErr = false;
	@observable errMsg: string = '';
	hideErrTimeout: Undefindable<typeof setTimeout.prototype>;

	@action.bound onInput(e: any) {
		this.inputComment = e.target.value;
	}

	@action.bound showErr(msg = 'Ошибка отправки') {
		this.errMsg = msg;
		this.isShowErr = true;
		this.hideErrTimeout = setTimeout(this.hideErr, 3000);
	}

	@action.bound hideErr() {
		this.errMsg = '';
		this.isShowErr = false;
	}

	@action.bound submit(e: any) {
		e.preventDefault();
		const url = (process.env.NODE_ENV === "development")
			? "https://logotipiwe.ru/index/back/send.php"
			: "https://logotipiwe.ru/index/back/send.php";
		const msg = this.inputComment;
		const sendTime = parseInt(localStorage.getItem('sendTime') || '0');
		if (msg === '') return this.showErr('Надо что-то написать');
		if (msg.length > 30) return this.showErr('Слишком длинное сообщение');
		if (
			sendTime && (new Date().getTime() - 1000 * 3600 * 24 < new Date(sendTime).getTime())
		) return this.showErr("Только одно сообщение раз в сутки :)");

		fetch(url + '?text=' + msg).then(res => res.json()).then(res => {
			if(!res.ok) return;
			localStorage.setItem('sendTime', new Date().getTime().toString());
			this.fetchComments();
		});
	}

	@action.bound fetchComments() {
		const url = (process.env.NODE_ENV === "development")
			? 'https://logotipiwe.ru/index/back/get.php'
			: 'index/back/get.php';
		fetch(url).then(res => res.json()).then((res: IComment[]) => {
			this.comments = (process.env.NODE_ENV === "development") ? res : res;
		})
	}
}

export default CommentsStore;
