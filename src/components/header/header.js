import React, {Component} from 'react';
import SearchForm from '../searchForm';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import './header.css';

export default class Header extends Component {
	render() {
		console.log('header render');
		
		return (
			<header className={(window.scrollY > 0) ? 'sticky' : ''}>
				<Router>  		
					<a className="logo" href="/" alt="logo">Picso</a>
					<Route exact path="/" component={() => 
						<SearchForm 
							searchText={this.props.searchText}
							searchPhotos={this.props.searchPhotos} />
					} />  	
					<Route path="/photo" component={
						<Link to="/">Back</Link>
					} /> 		
				</Router>  
			</header>
		)
	}
}