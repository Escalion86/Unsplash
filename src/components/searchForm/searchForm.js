import React, {Component} from 'react';

import './searchForm.css';

export default class SearchForm extends Component {
	// state = {
	// 	searchText: this.props.searchText
	// };

	// handleSubmit = event => {
	// 	event.preventDefault();
	// 	console.log('search submit');
	// 	this.props.searchPhotos(this.state.searchText);
	// }

	// handleChange = event => {
	// 	const value = event.target.value;
	// 	console.log('search change: value = ' + value);
	// 	this.setState((state) => {
	// 		return {
	// 			searchText: value
	// 		}
	// 	})
	// 	//this.props.setSearchText(event.target.value);
	// }

	render() {
		const {newSearch, searchText} = this.props;
		console.log('searchText:' + searchText);
		return (
			<form action="/" name="search-form" className="search-form">
				<input 
					name="search-input" 
					className="search-input" 
					placeholder="Поиск" 
					defaultValue={searchText}
					//onChange={this.handleChange}
					onKeyDown={e => {
						if (e.keyCode === 13) {
							newSearch(e.target.value);
						}
					}}
				/>
				<label className="sr-only" htmlFor="search-input">Поиск</label>
				<button type="submit" name="search-btn" className="search-btn"></button>
			</form>
		)
	}
}