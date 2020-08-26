import React, {Component} from 'react';
import SearchForm from '../searchForm';
import { Link, Route } from 'react-router-dom';

import './header.css';

export default class Header extends Component {
	render() {
		console.log('header render');

		const {searchText, newSearch} = this.props;
		
		return (
			<header className={(window.scrollY > 0) ? 'sticky' : ''}>		
				<a className="logo" href="/" alt="logo">Picso</a>
				<Route exact path="/" component={() => 
					<SearchForm 
						searchText={searchText}
						newSearch={newSearch} />
				} />  	
				<Route path="/photo" component={() =>
					<Link className="back" to="/">{'<-- Back'}</Link>
				} /> 		
			</header>
		)
	}
}