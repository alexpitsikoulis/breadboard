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
				<h2>
					{this.props.component
						? "Edit Component"
						: "Create New Component"}
				</h2>
				<form
					onSubmit={
						this.props.handleSubmit
							? this.props.handleSubmit
							: this.handleSubmit
					}>
					<div className='form-fields'>
						<div>
							<label htmlFor='component-name'>Name: </label>
						</div>
						<div>
							<input
								type='text'
								id='component-name'
								name='name'
								value={
									this.props.component
										? this.props.component.name
										: this.state.newComponent.name
								}
								onChange={
									this.props.handleChange
										? this.props.handleChange
										: this.handleChange
								}
							/>
						</div>
						<div>
							<label htmlFor='component-img-url'>
								Image URL:{" "}
							</label>
						</div>
						<div>
							<input
								type='text'
								id='component-img-url'
								name='img_url'
								value={
									this.props.component
										? this.props.component.img_url
										: this.state.newComponent.img_url
								}
								onChange={
									this.props.handleChange
										? this.props.handleChange
										: this.handleChange
								}
							/>
						</div>
						<div>
							<label htmlFor='component-retailer'>
								Where to buy:
							</label>
						</div>
						<div>
							<input
								type='text'
								id='component-retailer'
								name='retailer'
								value={
									this.props.component
										? this.props.component.retailer
										: this.state.newComponent.retailer
								}
								onChange={
									this.props.handleChange
										? this.props.handleChange
										: this.handleChange
								}
							/>
						</div>
						<div>
							<label htmlFor='component-description'>
								Description:{" "}
							</label>
						</div>
						<div>
							<textarea
								name='description'
								id='component-description'
								cols='30'
								rows='10'
								value={
									this.props.component
										? this.props.component.description
										: this.state.newComponent.description
								}
								onChange={
									this.props.handleChange
										? this.props.handleChange
										: this.handleChange
								}
							/>
						</div>
					</div>
					<div>
						<input type='submit' value='Submit' />
					</div>
				</form>
			</div>
		);
	}
}
