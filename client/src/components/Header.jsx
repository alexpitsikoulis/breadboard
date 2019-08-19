import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Flex } from "rebass";

export default class Header extends Component {
	render() {
		return (
			<header>
				<h1>
					<Link to='/'>Breadboard</Link>
				</h1>
				<nav>
					<Flex justifyContent='space-around' alignItems='center'>
						<Link to='/'>Projects</Link>
						<Link to='/components'>Components</Link>
					</Flex>
				</nav>
			</header>
		);
	}
}
