import React, {Component} from 'react';

import './photoCard.css';

export default class PhotoCard extends Component {

	images = ['https://images.unsplash.com/photo-1596287452759-7c86e9afc617?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80',
			  'https://images.unsplash.com/photo-1597089177379-f26808f095d4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0NzEwOH0'
			];

	
	render() {
	    const num = Math.floor(Math.random()*2);
		return (
			<div className='grid-item'>
				<img src={this.images[num]} alt='' />
			</div>
		)
	}
}