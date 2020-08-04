import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import css from "./projectcards.module.css";
import projectsList from "../../assets/testprojects.json";
import { result, orderBy } from "lodash";

class projectcards extends Component {
	render() {
		const projects = getProjectsByTags(
			projectsList,
			"project",
			//https://www.robinwieruch.de/react-pass-props-to-component
			this.props.tag
		);

		return projects.map((eachProject, i) => {
			const {
				name,
				openGraphImageUrl,
				//	url,
				//	stargazers,
				//	url,
				//	repositoryTopics,
				//	forks,
				description, //SocialMediaImage
				//	homepageUrl,
			} = eachProject;
			//console.log(url);
			return (
				<Col md={4}>
					<Card className="shadow-lg p-3 mb-5">
						<Card.Img
							className={`${css.CardImg} rounded mx-auto d-block`}
							variant="top"
							src={openGraphImageUrl}
						/>
						<Card.Body className="project-card">
							<Card.Title>{name}</Card.Title>
							<Card.Text>{description}</Card.Text>
							<>
								<Button variant="outline-secondary" size="sm">
									<i
										className="fa fa-github"
										aria-hidden="true"
									/>{" "}
									repo
								</Button>{" "}
								<Button variant="outline-secondary" size="sm">
									<i
										className="fa fa-github"
										aria-hidden="true"
									/>{" "}
									demo
								</Button>
								<hr />
							</>
						</Card.Body>
					</Card>
				</Col>
			);
		});
	}
}
const getProjectsByTags = (projectsList, tag1, tag2) => {
	const selectedProjects = projectsList.filter((project) => {
		const topics = result(project, "repositoryTopics.nodes", []);
		return (
			topics.find(({ topic }) => result(topic, "name") === tag1) &&
			topics.find(({ topic }) => result(topic, "name") === tag2)
		);
	});
	//console.log(selectedProjects);
	//exportToJsonFile(selectedProjects);
	return orderBy(selectedProjects, "name", "asc");
};
/* function exportToJsonFile(jsonData) {
	let dataStr = JSON.stringify(jsonData);
	let dataUri =
		"data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

	let exportFileDefaultName = "data.json";

	let linkElement = document.createElement("a");
	linkElement.setAttribute("href", dataUri);
	linkElement.setAttribute("download", exportFileDefaultName);
	linkElement.click();
}
 */
export default projectcards;
