import React, {Component} from 'react';
import PhotoCard from '../photoCard';

import './photoList.css';

export default class PhotoList extends Component {
	
	
	render() {
		return (
			<div className="container">
				<div className="cards">
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
					<PhotoCard />
				</div>
			</div>
		)
	}
}