import React, {Component} from 'react';

import './photoCard.css';

export default class PhotoCard extends Component {
	render() {
		return (
			<div className='grid-item'>
				<img src={this.props.photoUrl} alt={'image:' + this.props.photoUrl} />
			</div>
		)
	}
}