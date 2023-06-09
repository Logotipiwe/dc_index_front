import React from 'react';
import {inject, observer} from "mobx-react";
import RootStore from "../../Stores/RootStore";
import "./CommentsRoute.scss"

@inject("RootStore")
@observer
class CommentsRoute extends React.Component<{ RootStore?: RootStore, key?: any, id?: any }, any> {

	componentDidMount(): void {
		document.title = "Напиши что-нибудь";
		this.props.RootStore!.CommentsStore.fetchComments();
	}

	render() {
		const CommentsStore = this.props.RootStore!.CommentsStore;

		return (
			<div id="CommentsRoute">
				{CommentsStore.comments.map(comment => {
					return (
						<div
							key={comment.id}
							className='comment'
							style={{
								top: comment.positionY + '%',
								left: comment.positionX + '%',
								color: 'rgb' + comment.color,
							}}
						>
							{comment.text}
						</div>
					)
				})}
				<form onSubmit={CommentsStore.submit}>
					<p>Напиши тут что-нибудь памятное и прикольное :)</p>
					<div className='input'>
						<input
							className='text'
							placeholder="Коммент..."
							onChange={CommentsStore.onInput}
							value={CommentsStore.inputComment}
						/>
						<input type='submit' value='>'/>
					</div>
					{CommentsStore.isShowErr && !CommentsStore.isShowSuccess && <div className='err_msg'>{CommentsStore.errMsg}</div>}
					{CommentsStore.isShowSuccess && <div className='success_msg'>Сообщение отправлено, спасибо тебе ;)</div>}
				</form>
			</div>
		);
	}
}

export default CommentsRoute;
