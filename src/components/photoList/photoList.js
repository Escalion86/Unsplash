import React, {Component} from 'react';
import PhotoCard from '../photoCard';
import Masonry from 'react-masonry-css'

import './photoList.css';

export default class PhotoList extends Component {

	photosId = this.props.photosId;

	photos = this.photosId.map((photoId) => {
		return <PhotoCard photoId={photoId} />
	})

	render() {
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