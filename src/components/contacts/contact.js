import React, { Component } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import css from "./contact.module.css";
import profile from "../../assets/profile.jpg";
const contactItems = [
	{
		/* Location details */
		name: "Location",
		info: "Stockholm, Sweden",
		iconId: "fa fa-map-marker",
		hrefId: undefined,
	},
	{
		/* Email details */
		name: "Mail",
		info: "alpha.fofana@live.se",
		iconId: "fa fa-envelope",
		hrefId: "mailto:alpha.fofana@live.se",
	},
	{
		/* Linkedin details */
		name: "Linkedin",
		info: "Alpha Fofana",
		iconId: "fa fa-linkedin",
		hrefId: "https://www.linkedin.com/in/alpha-fofana-7b598162",
	},
	{
		/* Facebook details */
		name: "Facebook",
		info: "Alpha Fofana",
		iconId: "fa fa-facebook",
		hrefId: "https://www.facebook.com/alpha.fofana.3",
	},
	{
		/* Instagram details */
		name: "Facebook",
		info: "alphafofana",
		iconId: " fa fa-instagram",
		hrefId: "https://www.instagram.com/alphafofana/",
	},
];
class contact extends Component {
	render() {
		return (
			<Container fluid className={css.contactBody}>
				<Row className={css.contactRow}>
					<Col
						className={css.contactColImg}
						xl={3}
						lg={4}
						md={5}
						sm={8}
						xs={12}
					>
						<img
							src={profile}
							alt="profile"
							class="rounded-circle shadow-lg"
						/>
					</Col>
					<Col
						className={css.contactColinfo}
						xl={3}
						lg={4}
						md={5}
						sm={8}
						xs={10}
					>
						<h2>Contact me</h2>
						<ListGroup
							variant="flush"
							className={`${css.contactinfoListGroup} shadow-lg`}
						>
							{contactItems.map((contactItem) => {
								return (
									<a
										href={contactItem.hrefId}
										target="_blank"
										rel="noopener noreferrer"
									>
										<ListGroup.Item action>
											{/*<ListGroup.Item as={SafeAnchor}>*/}
											<Row>
												<Col
													xl={2}
													lg={2}
													md={2}
													sm={2}
													xs={2}
												>
													<i
														class={`${contactItem.iconId} ${css.icons}`}
														aria-hidden="true"
													/>
												</Col>
												<Col>{contactItem.info}</Col>
											</Row>
										</ListGroup.Item>
									</a>
								);
							})}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default contact;
