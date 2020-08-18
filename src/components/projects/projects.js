import React, { Component } from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import css from "./projects.module.css";
import Projectcards from "./projectcards";

const projectTags = ["java", "javascript"];

class projects extends Component {
	render() {
		return (
			<Tab.Container defaultActiveKey={projectTags[0]}>
				<Col className={css.projectsColHeading}>
					<h2>
						Projects
						<hr />
					</h2>
				</Col>
				<Col>
					<Nav
						fill
						variant="pills"
						className="flex-row justify-content-center p-3"
					>
						{projectTags.map((tag) => {
							return (
								<Nav.Item className={css.projectsNavItem}>
									<Nav.Link eventKey={tag}>
										{tag.charAt(0).toUpperCase() +
											tag.slice(1)}
									</Nav.Link>
								</Nav.Item>
							);
						})}
					</Nav>
				</Col>
				<Col>
					<Tab.Content>
						{projectTags.map((tag, i) => {
							return (
								<Tab.Pane eventKey={tag}>
									<Row className={css.projectsCardRow}>
										<Projectcards tag={tag} />
									</Row>
								</Tab.Pane>
							);
						})}
					</Tab.Content>
				</Col>
			</Tab.Container>
		);
	}
}

export default projects;
