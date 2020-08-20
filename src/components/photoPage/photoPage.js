import React, {Component} from 'react';
// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Link,
// 	useParams
//   } from "react-router-dom";

import './photoPage.css';
import { toJson } from 'unsplash-js';

export default class PhotoPage extends Component {

	// state = {
	// 	photo: null
	// }

	// componentDidMount() {
		
	// }

	render() {
		const {photo, id, unsplash} = this.props;
		let photoUrl = null;
		console.log(this.props);
		if (photo != null) {
			photoUrl = photo.urls.regular;
		} else {
			unsplash.photos.getPhoto(id)
			.then(toJson)
			.then(json => {
				photoUrl = json.urls.regular;
			})
		}

		

		return (
			<section>
				<img className="photo" src={photoUrl} alt={'image: ' + id} />
			</section>
		)
	}
}