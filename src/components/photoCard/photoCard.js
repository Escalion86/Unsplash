import React, {Component} from 'react';

import './photoCard.css';

export default class PhotoCard extends Component {
	state = {
		photo: null,
	};

	// url = 'https://api.unsplash.com/photos/';
	componentDidMount() {
		this.props.unsplash.photos.getPhoto(this.props.photoId)
			.then((res) => {
				this.setState({
					photo: res.url
				});
			});
	}
			
	render() {
		return (
			<div className='grid-item'>
				<img src={this.state.photo} alt={'image:' + this.props.photoId} />
			</div>
		)
	}
}