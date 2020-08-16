import React, {Component} from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
//import logoMini from '../../img/logo-dev-mini.png';
//import { Link, animateScroll as scroll } from "react-scroll";

import './header.css';



export default class Header extends Component {

	menu = [
		{
			name: 'Home',
			path: '/'
		},
		{
			name: 'About',
			path: '/about'
		}
	]
	
	render() {
		return (
			<>
			<header>
				<a className="logo" href="/" alt="logo">Picso</a>
				<ul>	
					{this.menu.map((item, i) => {
						return (
							<li key={i.toString()}>
									<Link 
										to={item.path}
										className={window.location.pathname === item.path ? 'active' : ''} >{item.name}</Link>
							</li>
						)
					})}			
				</ul>
				{/* <Link to={'/auth'}>Войти</Link> */}
			</header>
			</>
		)
	}
}