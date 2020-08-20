import React, {Component} from 'react';

import './searchForm.css';

export default class SearchForm extends Component {
	state = {
		searchText: this.props.searchText
	};

	handleSubmit = event => {
		event.preventDefault();
		console.log('search submit');
		this.props.searchPhotos(this.state.searchText);
	}

	handleChange = event => {
		const value = event.target.value;
		console.log('search change: value = ' + value);
		this.setState((state) => {
			return {
				searchText: value
			}
		})
		//this.props.setSearchText(event.target.value);
	}

	render() {
		return (
			<form action="/" name="search-form" className="search-form" onSubmit={this.handleSubmit}>
				<input 
					name="search-input" 
					className="search-input" 
					placeholder="Поиск" 
					value={this.state.searchText}
					onChange={this.handleChange} />
				<label className="sr-only" for="search-input">Поиск</label>
				<button type="submit" name="search-btn" className="search-btn"></button>
			</form>
		)
	}
}