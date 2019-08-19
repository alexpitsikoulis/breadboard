import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ProjectList from "./components/ProjectList";
import SingleProject from "./components/SingleProject";
import SingleComponent from "./components/SingleComponent";
import SingleComment from "./components/SingleComment";
import ComponentList from "./components/ComponentList";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ComponentForm from "./components/ComponentForm";
import CommentForm from "./components/CommentForm";
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
								component={ComponentForm}
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
								component={CommentForm}
							/>
							<Route
								path='/projects/:projectId/comments/:commentId'
								component={SingleComment}
							/>
							<Route
								path='/projects/new'
								component={ProjectForm}
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
