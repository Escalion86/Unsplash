import React, {Component} from 'react';

import './photoCard.css';

export default class PhotoCard extends Component {

	render() {
		const {
			photoUrl, 
			authorName, 
			authorUrl, 
			authorImageUrl, 
			publishDate, 
			likes, 
			liked, 
			id, 
			setLike} = this.props;
		return (
			<div className='grid-item'>
				<img className="photo" src={photoUrl} alt={'image: ' + photoUrl} />
				<div className="card-background">
					<i className="like far fa-heart fa-2x"></i>
					<i className="eye far fa-eye fa-2x"></i>
					<i className={`like-hover fas fa-heart fa-2x ${liked ? 'liked' : ''}`}
						onClick={() => setLike(id, !liked)}></i>
					<i className="eye-hover fas fa-eye fa-2x"></i>

					<div className="card-desc">
						<div className="author">
							<h4>Автор:</h4>
							<a href={authorUrl}>
								<img className="author-image" src={authorImageUrl} alt={'author: ' + authorName} />
								<i>{authorName}</i>
							</a>
						</div>
						<div>
							<b>Опубликовано: </b>
							<i>{publishDate.slice(0,10)}</i>
						</div>
						<div>
							<b>Лайки: </b>
							<i>{likes}</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}