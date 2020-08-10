import React, { Component } from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import css from "./landingpage.module.css";
const socialLinks = [
	{
		/* LinkedIn */
		hrefId: "https://www.linkedin.com/in/alpha-fofana-7b598162",
		iconId: "fa fa-linkedin-square",
	},
	{
		/* Github */
		hrefId: "https://github.com/Alphafofana",
		iconId: "fa fa-github-square",
	},
	{
		/* Facebook */
		hrefId: "https://www.facebook.com/alpha.fofana.3",
		iconId: "fa fa-facebook-square",
	},
	{
		/* Instagram */
		hrefId: "https://www.instagram.com/alphafofana/",
		iconId: " fa fa-instagram",
	},
];

class landing extends Component {
	render() {
		return (
			<Jumbotron fluid className={css.landingBody}>
				<Container>
					<Row className={css.landingRow}>
						<Col className={css.bannerText}>
							<h1>
								Alpha Fofana
								<hr />
							</h1>

							<p>| Engineer | Programmer | ETC...</p>
						</Col>
					</Row>
					<Row className={css.socialLinksRow}>
						{socialLinks.map((socialLink) => {
							return (
								<Col
									xl={3}
									lg={3}
									md={3}
									sm={6}
									xs={6}
									className={css.socialLinkCol}
									//xs lg="2"
								>
									<a
										href={socialLink.hrefId}
										rel="noopener noreferrer"
										target="_blank"
									>
										<i
											className={socialLink.iconId}
											aria-hidden="true"
										/>
									</a>
								</Col>
							);
						})}
					</Row>
				</Container>
			</Jumbotron>
		);
	}
}

export default landing;
