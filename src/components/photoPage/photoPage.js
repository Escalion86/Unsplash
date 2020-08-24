import React, {Component} from 'react';

import './photoPage.css';

export default class PhotoPage extends Component {

	render() {
		const {photo} = this.props;
		//let photoUrl = null;
		console.log(this.props);
		//if (photo != null) {
		//	photoUrl = photo.urls.regular;
		//}
		// else {
		// 	unsplash.photos.getPhoto(id)
		// 	.then(toJson)
		// 	.then(json => {
		// 		photoUrl = json.urls.regular;
		// 	})
		// }

		const liked = photo.liked_by_user;

		return (		
			<section>
				<div className="photo-page">
					<img className="photo" src={photo.urls.regular} alt={'image: ' + photo.id} />
					<div className="card-desc">
						<i className="like far fa-heart fa-2x"></i>
						<i className={`like-hover fas fa-heart fa-2x ${liked ? 'liked' : ''}`}
							onClick={() => this.props.setLike(photo.id, !liked)}></i>
						<div className="author">
							<h4>Автор:</h4>
							<a href={photo.user.links.html}>
								<img className="author-image" src={photo.user.profile_image.large} alt={'author: ' + photo.user.name} />
								<i>{photo.user.name}</i>
							</a>
						</div>
						<div>
							<b>Опубликовано: </b>
							<i>{photo.created_at.slice(0,10)}</i>
						</div>
						<div>
							<b>Лайки: </b>
							<i>{photo.likes}</i>
						</div>
					</div>
				</div>
			</section>
		)
	}
}