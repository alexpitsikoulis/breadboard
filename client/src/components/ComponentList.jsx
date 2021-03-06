import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ComponentList extends Component {
	state = {
		components: []
	};

	componentDidMount() {
		if (!this.props.components) {
			this.getComponenets();
		}
	}

	getComponenets = () => {
		axios.get(`/api/v1/components/`).then(res => {
			this.setState({ components: res.data });
		});
	};
	render() {
		let componentList = (this.props.components
			? this.props.components
			: this.state.components
		).map(component => {
			return (
				<div key={component.id}>
					<Link to={`/components/${component.id}`}>
						<h4>{component.name}</h4>
					</Link>
				</div>
			);
		});

		return (
			<div>
				{this.props.components ? null : <h2>All Components</h2>}
				{componentList}
				{this.props.components ? null : (
					<button>
						<Link to='/components/new'>Add New Component</Link>
					</button>
				)}
			</div>
		);
	}
}
