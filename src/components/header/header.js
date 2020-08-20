import React, {Component} from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
//import logoMini from '../../img/logo-dev-mini.png';
//import { Link, animateScroll as scroll } from "react-scroll";

import './header.css';



export default class Header extends Component {

	// menu = [
	// 	{
	// 		name: 'Home',
	// 		path: '/'
	// 	},
	// 	{
	// 		name: 'About',
	// 		path: '/about'
	// 	}
	// ]

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
		console.log('header render');
		console.log('header state.searchText = ' + this.state.searchText);
		return (
			<>
			<header>
				<a className="logo" href="/" alt="logo">Picso</a>
				{/* <ul>	
					{this.menu.map((item, i) => {
						return (
							<li key={i.toString()}>
									<Link 
										to={item.path}
										className={window.location.pathname === item.path ? 'active' : ''} >{item.name}</Link>
							</li>
						)
					})}			
				</ul> */}
				<form action="/" name="search-form" className="header-search" onSubmit={this.handleSubmit}>
					<input 
						id="header-search-input" 
						name="search-input" 
						className="header-search-input" 
						placeholder="Поиск" 
						value={this.state.searchText}
						onChange={this.handleChange} />
					<label className="sr-only" for="header-search-input">Поиск</label>
					<button type="submit" name="search-btn" className="header-search-btn"></button>
				</form>
				{/* <Link to={'/auth'}>Войти</Link> */}
			</header>
			</>
		)
	}
}