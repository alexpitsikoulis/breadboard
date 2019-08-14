import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class NewComponentForm extends Component {
	state = {
		newComponent: {
			name: "",
			img_url: "",
			retailer: "",
			description: "",
			projects: []
		},
		redirectToComponents: false
	};

	handleChange = event => {
		const copiedNewComponent = { ...this.state.newComponent };
		copiedNewComponent[event.target.name] = event.target.value;
		this.setState({ newComponent: copiedNewComponent });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post(`/api/v1/components/`, this.state.newComponent).then(() => {
			this.setState({ redirectToComponents: true });
		});
	};
	render() {
		if (this.state.redirectToComponents) {
			return <Redirect to='/components' />;
		}
		return (
			<div>
				<h2>Create New Component</h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='component-name'>Name: </label>
						<input
							type='text'
							id='component-name'
							name='name'
							value={this.state.newComponent.name}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='component-img-url'>Image URL: </label>
						<input
							type='text'
							id='component-img-url'
							name='img_url'
							value={this.state.newComponent.img_url}
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
							value={this.state.newComponent.retailer}
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
							value={this.state.newComponent.description}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input type='submit' value='Submit' />
					</div>
				</form>
			</div>
		);
	}
}
