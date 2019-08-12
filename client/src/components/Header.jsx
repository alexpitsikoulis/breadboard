import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Flex, Box } from "rebass";

export default class Header extends Component {
	render() {
		return (
			<div>
				<header>
					<h1>
						<Link to='/'>Breadboard</Link>
					</h1>
				</header>
				<nav>
					<Flex justifyContent='space-around'>
						<Link to='/'>Projects</Link>
						<Link to='/components'>Components</Link>
					</Flex>
				</nav>
			</div>
		);
	}
}
