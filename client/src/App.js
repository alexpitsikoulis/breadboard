import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import ProjectList from "./components/ProjectList";
import SingleProject from "./components/SingleProject";
import SingleComponent from "./components/SingleComponent";
import SingleComment from "./components/SingleComment";
import ComponentList from "./components/ComponentList";
import Header from "./components/Header";
import NewProjectForm from "./components/NewProjectForm";
import NewComponentForm from "./components/NewComponentForm";
import NewCommentForm from "./components/NewCommentForm";
import Footer from "./components/Footer";

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<Router>
					<Route path='/' component={Header} />
					<div className='body-content'>
						<Switch>
							<Route exact path='/' component={ProjectList} />
							<Route
								path='/components/new'
								component={NewComponentForm}
							/>
							<Route
								path='/components/:componentId'
								component={SingleComponent}
							/>
							<Route
								path='/components'
								component={ComponentList}
							/>
							<Route
								path='/projects/:projectId/comments/new'
								component={NewCommentForm}
							/>
							<Route
								path='/comments/:commentId'
								component={SingleComment}
							/>
							<Route
								path='/projects/new'
								component={NewProjectForm}
							/>
							<Route
								path='/projects/:projectId'
								component={SingleProject}
							/>
						</Switch>
					</div>
					<Route path='/' component={Footer} />
				</Router>
			</div>
		);
	}
}
