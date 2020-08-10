import React, { Component } from "react";
import {
	Row,
	Col,
	Container,
	Button,
	Navbar,
	Nav,
	Spinner,
} from "react-bootstrap";
import css from "./resume.module.css";
import { pdfjs, Document, Page } from "react-pdf";
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Resume extends Component {
	state = {
		numPages: null,
		pageNumber: 1,
	};

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	};

	render() {
		const {
			//	pageNumber,
			numPages,
		} = this.state;
		console.log(numPages);
		return (
			<React.Fragment>
				<Container classname={css.resumebody} fluid>
					<Document
						file="Curriculum_Vitae_Template.pdf"
						onLoadSuccess={this.onDocumentLoadSuccess}
						loading={<Loading />}
					>
						<Row
							className={`${css.resumeRow} justify-content-md-center`}
						>
							{[...Array(numPages)].map((e, i) => (
								<Col
									md="auto"
									sm={12}
									className={css.resumeCol}
								>
									<Page
										className=" shadow-lg"
										//size="A4"
										//loading={<Loading />}
										//scale={1.0}
										pageNumber={i + 1}
									/>
								</Col>
							))}
						</Row>
					</Document>
				</Container>
				<>
					<Navbar
						className="justify-content-center"
						fixed="bottom"
						bg="transparent"
					>
						<Nav>
							<Nav.Item>
								<Link
									to="Curriculum_Vitae_Template.pdf"
									target="_blank"
									download
								>
									<Button variant="success">
										<i
											class="fa fa-arrow-circle-down"
											aria-hidden="true"
										/>{" "}
										Download
									</Button>{" "}
								</Link>
								<Button
									variant="primary"
									href="https://www.linkedin.com/in/alpha-fofana-7b598162"
									rel="noopener noreferrer"
									target="_blank"
								>
									<i
										className="fa fa-linkedin-square"
										aria-hidden="true"
									/>{" "}
									Linkedin
								</Button>{" "}
							</Nav.Item>
						</Nav>
					</Navbar>
				</>
			</React.Fragment>
		);
	}
}

const Loading = () => {
	return (
		<Row className={css.loadingRow}>
			<Col md={1}>
				<Spinner animation="border" variant="primary" />
			</Col>
			<Col md={2}>
				<h1>loading...</h1>
			</Col>
		</Row>
	);
};

export default Resume;
