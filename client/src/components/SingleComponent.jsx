import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class SingleComponent extends Component {
	state = {
		component: {}
	};

	componentDidMount() {
		this.getComponent();
	}

	getComponent = () => {
		axios
			.get(`/api/v1/components/${this.props.match.params.componentId}/`)
			.then(res => {
				this.setState({ component: res.data });
			});
	};

	render() {
		return (
			<div>
				<h2>{this.state.component.name}</h2>
				{this.state.component.img_url ? (
					<img
						src={this.state.component.img_url}
						alt={this.state.component.name}
					/>
				) : null}
				<p>Buy some at: {this.state.component.retailer}</p>
				<h4>Description:</h4>
				<p>{this.state.component.description}</p>
			</div>
		);
	}
}
