import React, { Component } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import css from "./contact.module.css";
import profile from "../../assets/profile.jpg";
const contactItems = [
	{
		/* Phone details */
		name: "Phone",
		info: "(+46) 730 00 00 00",
		iconId: "fa fa-phone-square",
		hrefId: "",
	},
	{
		/* Email details */
		name: "Mail",
		info: "mail details",
		iconId: "fa fa-envelope",
		hrefId: "mail",
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
						<ListGroup variant="flush" className={css.contactinfo}>
							{contactItems.map((contactItem) => {
								return (
									<ListGroup.Item action>
										<Row>
											<Col
												xl={1}
												lg={1}
												md={1}
												sm={1}
												xs={1}
											>
												<i
													class={`${contactItem.iconId} ${css.icons}`}
													aria-hidden="true"
												/>
											</Col>
											<Col>{contactItem.info}</Col>
										</Row>
									</ListGroup.Item>
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
