import React, {Component} from 'react';
import { Link, BrowserRouter as Router, Route, useParams } from 'react-router-dom';

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
			<div className='grid-item card'>
				<img className="photo" src={photoUrl} alt={'image: ' + photoUrl} />
				<div className="card-background">
					
					<Link 
						to={`/photo/${id}`}
					>
						<i className="eye far fa-eye fa-2x"></i>
						<i className="eye-hover fas fa-eye fa-2x"></i>
					</Link>
					<i className="like far fa-heart fa-2x"></i>
					<i className={`like-hover fas fa-heart fa-2x ${liked ? 'liked' : ''}`}
						onClick={() => setLike(id, !liked)}></i>
					

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