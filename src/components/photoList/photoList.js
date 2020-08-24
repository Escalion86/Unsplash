import React, {Component} from 'react';
import PhotoCard from '../photoCard';
import Masonry from 'react-masonry-css';

import './photoList.css';

export default class PhotoList extends Component {

	photos = null;

	componentDidMount() {
		console.log('PhotoList Did Mount');
		const {loadPhotos} = this.props;

		function detectScrollAtBottom() {
			const windowHeight = window.innerHeight
				? window.innerHeight
				: document.documentElement.offsetHeight;
			const { body } = document;
			const html = document.documentElement;
			const docHeight = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight,
				html.scrollHeight,
				html.offsetHeight
			);
			const windowBottom = Math.round(windowHeight + window.pageYOffset);
			
			// Small hack for windows. It counts windowBottom in different way
			const difference = docHeight - windowBottom;
			const additional = difference >= 1 && difference <= 2 ? difference : 0;
			
			return windowBottom + additional >= docHeight;
		};

		window.onscroll = function() {
		  	if (detectScrollAtBottom()) {
				loadPhotos(false);
		  	}
		};
	}
	
	componentWillUnmount() {
		window.onscroll = null;
	}

	render() {
		console.log('PhotoList render');
		const {photos} = this.props;	
		if (typeof photos != "undefined" && photos.length !== 0) {
			this.photosItems = this.props.photos.map((photo) => {
				return <PhotoCard 
					key={photo.id} 
					photo={photo}
					setLike={this.props.setLike}/>
			})
		}

		return (
			<section>
				<Masonry
					breakpointCols={{
						default: 4,
						1100: 3,
						700: 2,
						500: 1
					}}
					className="grid"
					columnClassName="grid_column">
					{this.photosItems}
				</Masonry>
			</section>
		)
	}
}