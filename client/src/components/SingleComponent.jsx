import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class SingleComponent extends Component {
	state = {
		component: {},
		isEditFormDisplayed: false,
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

	handleToggleEditForm = () => {
		this.setState(state => {
			return { isEditFormDisplayed: !state.isEditFormDisplayed };
		});
	};

	handleChange = event => {
		const copiedComponent = { ...this.state.component };
		copiedComponent[event.target.name] = event.target.value;
		this.setState({ component: copiedComponent });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.put(
				`/api/v1/components/${this.props.match.params.componentId}/`,
				this.state.component
			)
			.then(() => {
				this.setState({ isEditFormDisplayed: false });
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
				{this.state.isEditFormDisplayed ? (
					<div>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='component-name'>Name: </label>
								<input
									type='text'
									id='component-name'
									name='name'
									value={this.state.component.name}
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='component-img-url'>
									Image URL:{" "}
								</label>
								<input
									type='text'
									id='component-img-url'
									name='img_url'
									value={this.state.component.img_url}
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='component-retailer'>
									Where to buy:
								</label>
								<input
									type='text'
									id='component-retailer'
									name='retailer'
									value={this.state.component.retailer}
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='component-description'>
									Description:{" "}
								</label>
								<textarea
									name='description'
									id='component-description'
									cols='30'
									rows='10'
									value={this.state.component.description}
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<input type='submit' value='Submit' />
							</div>
						</form>
					</div>
				) : (
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
						<button onClick={this.handleDelete}>
							Delete Component
						</button>
					</div>
				)}
				<button onClick={this.handleToggleEditForm}>
					{this.state.isEditFormDisplayed
						? "Back to Component"
						: "Edit Component"}
				</button>
			</div>
		);
	}
}
