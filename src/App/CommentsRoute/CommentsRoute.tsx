import React from 'react';
import {inject, observer} from "mobx-react";
import RootStore from "../../Stores/RootStore";
import "./CommentsRoute.scss"

@inject("RootStore")
@observer
class CommentsRoute extends React.Component<{ RootStore?: RootStore, key?: any, id?: any }, any> {

	componentDidMount(): void {
		this.props.RootStore!.CommentsStore.fetchComments();

		// this.props.RootStore!.CommentsStore.showErr('Кек');
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
					{CommentsStore.isShowErr && <div className='err_msg'>{CommentsStore.errMsg}</div>}
				</form>
			</div>
		);
	}
}

export default CommentsRoute;
