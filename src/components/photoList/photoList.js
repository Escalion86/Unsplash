import React, {Component} from 'react';
import PhotoCard from '../photoCard';
import Masonry from 'react-masonry-css'

import './photoList.css';

export default class PhotoList extends Component {

	photos = null;

	render() {
		const {photosId} = this.props;	
		
		if (typeof photosId != "undefined" && photosId.length !== 0) {
			this.photos = this.props.photosId.map((photoId) => {
				return <PhotoCard key={photoId} unsplash={this.props.unsplash} photoId={photoId} />
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