import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import ProjectList from "./components/ProjectList";
import SingleProject from "./components/SingleProject";
import SingleComponent from "./components/SingleComponent";
import SingleComment from "./components/SingleComment";
import ComponentList from "./components/ComponentList";
import Header from "./components/Header";

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<Router>
					<Route path='/' component={Header} />
					<Switch>
						<Route exact path='/' component={ProjectList} />
						<Route
							path='/components/:componentId'
							component={SingleComponent}
						/>
						<Route path='/components' component={ComponentList} />
						<Route
							path='/comments/:commentId'
							component={SingleComment}
						/>
						<Route
							path='/projects/:projectId'
							component={SingleProject}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
