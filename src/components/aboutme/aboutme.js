import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import css from "./aboutme.module.css";
import profile from "../../assets/profile.jpg";

class about extends Component {
	render() {
		return (
			<Container className={css.aboutbody} fluid>
				<Row className={css.aboutRow}>
					<Col className={css.aboutColImg} md={4}>
						<img
							src={profile}
							alt="profile"
							className="rounded-circle shadow-lg"
						/>
					</Col>
					<Col className={css.aboutColTxt} md={8}>
						<h2>
							About Me
							<hr />
						</h2>

						<p>
							Lorem ipsum dolor sit amet, consectetuer adipiscing
							elit. Ut purus elit, vestibulum ut, placeratac,
							adipiscing vitae, felis. Curabitur dictum gravida
							mauris. Nam arcu libero, nonummy eget,consectetuer
							id, vulputate a, magna. Donec vehicula augue eu
							neque. Pellentesque habitant morbitristique senectus
							et netus et malesuada fames ac turpis egestas.
							Mauris ut leo. Cras viverra metusrhoncus sem. Nulla
							et lectus vestibulum urna fringilla ultrices.
							Phasellus eu tellus sit amet tortorgravida placerat.
							Integer sapien est, iaculis in, pretium quis,
							viverra ac, nunc. Praesent eget sem
						</p>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default about;
