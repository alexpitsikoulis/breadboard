import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class SingleComponent extends Component {
	state = {
		component: {},
		redirectToComponents: false
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

	handleDelete = () => {
		axios
			.delete(
				`/api/v1/components/${this.props.match.params.componentId}/`
			)
			.then(() => {
				this.setState({ redirectToComponents: true });
			});
	};

	render() {
		if (this.state.redirectToComponents) {
			return <Redirect to='/components' />;
		}
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
				<button onClick={this.handleDelete}>Delete Component</button>
			</div>
		);
	}
}
