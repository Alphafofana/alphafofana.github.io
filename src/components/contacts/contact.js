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
		info: "FofanaAlpha",
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
		info: "AlphaFofana",
		iconId: " fa fa-instagram",
		hrefId: "https://www.instagram.com/alphafofana/",
	},
];
class contact extends Component {
	render() {
		return (
			<Container fluid className={css.contactBody}>
				<Row className={css.contactRow}>
					<Col className={css.contactColImg} md={4}>
						<img
							src={profile}
							alt="profile"
							class="rounded-circle shadow-lg"
						/>
					</Col>
					<Col md={4}>
						<h2>Contact me</h2>
						<ListGroup variant="flush" className={css.contactinfo}>
							{contactItems.map((contactItem) => {
								return (
									<ListGroup.Item action>
										<Row>
											<Col md={1}>
												<i
													class={contactItem.iconId}
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
