import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./landingpage/landingpage";
import AboutMe from "./aboutme/aboutme";
import Contact from "./contacts/contact";
import Projects from "./projects/projects";
import Resume from "./resume/resume";
import Navbar from "./navbar/navbar";

const Main = () => (
	// <BrowserRouter basename={process.env.PUBLIC_URL}>
	<HashRouter>
		<Switch>
			<Route exact path="/">
				<React.Fragment>
					<div id="landingpage">
						<Navbar viwe="landingpage" />
						<LandingPage />
					</div>
					<div id="aboutme">
						<AboutMe />
					</div>
					<div id="projects">
						<Projects />
					</div>
				</React.Fragment>
			</Route>
			<Route exact path="/landing" component={LandingPage} />
			<Route exact path="/aboutme" component={AboutMe} />
			<Route exact path="/contact">
				<Navbar viwe="contact" />
				<Contact />
			</Route>
			<Route exact path="/projects" component={Projects} />
			<Route path="/resume">
				<Navbar viwe="resume" />
				<Resume />
			</Route>
		</Switch>
		{console.log(process.env.PUBLIC_URL)}
	</HashRouter>
	// </BrowserRouter>
);

export default Main;
