import React, {Component} from 'react';
import PhotoCard from '../photoCard';
import Masonry from 'react-masonry-css'

import './photoList.css';

export default class PhotoList extends Component {

	photos = null;

	componentDidMount() {
		const {searchPhotos} = this.props;
		
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
				//alert('I AM AT THE BOTTOM');
				searchPhotos();
		  	}
		};
	}
	
	componentWillUnmount() {
		window.onscroll = null;
	}

	render() {
		const {photosUrl} = this.props;	
		if (typeof photosUrl != "undefined" && photosUrl.length !== 0) {
			this.photos = this.props.photosUrl.map((photoUrl) => {
				return <PhotoCard key={photoUrl} photoUrl={photoUrl} />
			})
		}

		return (
			<div className="container">
				<Masonry
					breakpointCols={{
						default: 4,
						1100: 3,
						700: 2,
						500: 1
					}}
					className="grid"
					columnClassName="grid_column">
					{this.photos}
				</Masonry>
			</div>
		)
	}
}