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
import CV from "../../assets/Alpha_Fofana_CV.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

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
		//console.log(numPages);

		let smallDevice = window.matchMedia("(max-width: 650px)");
		//console.log(dw);
		//console.log(window.screen.width);

		return (
			<React.Fragment>
				<Container classname={css.resumebody} fluid>
					<Document
						file="Alpha_Fofana_CV.pdf"
						onLoadSuccess={this.onDocumentLoadSuccess}
						loading={<Loading />}
					>
						<Row
							className={`${css.resumeRow} justify-content-md-center`}
						>
							{[...Array(numPages)].map((e, i) => (
								<Col
									xl="auto"
									lg="auto"
									md="auto"
									sm="auto"
									xs="auto"
									className={css.resumeCol}
								>
									<Page
										className=" shadow-lg"
										//loading={<Loading />}
										width={
											smallDevice.matches
												? window.screen.width - 30
												: "595"
										}
										pageNumber={i + 1}
										renderTextLayer={false}
										renderInteractiveForms={false}
										renderMode="svg"
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
						<Nav className={css.downloadNav}>
							<Nav.Item>
								<a
									href={CV}
									target="_blank"
									rel="noopener noreferrer"
									download="Alpha_Fofana_CV"
								>
									<Button variant="success">
										<i
											class="fa fa-arrow-circle-down"
											aria-hidden="true"
										/>{" "}
										Download
									</Button>{" "}
								</a>
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
