import React, { Component } from "react";
import {
	ProgressBar,
	Row,
	Col,
	Container,
	Tooltip,
	OverlayTrigger,
} from "react-bootstrap";
import css from "./linguistModul.module.css";

class linguistModul extends Component {
	render() {
		let totalbytes = 0;
		const languageLabels = this.props.languages.map((language, index) => {
			const { size, node } = language;
			const { name } = node;
			totalbytes = totalbytes + size;

			return (
				<Col
					key={index}
					className={css.languageLabelCol}
					xl="auto"
					lg="auto"
					md="auto"
					sm="auto"
					xs="auto"
				>
					<span className={`${css.dot} ${css[name]}`} />
					<span className={``}>{` ${name} `}</span>
				</Col>
			);
		});
		return (
			<Container fluid className={css.linguistWidgetBody}>
				<Row>
					<Col>
						<h6>Languages</h6>
						<ProgressBar>
							{this.props.languages.map((language, index) => {
								const { size, node } = language;
								const { name } = node;
								const percentage = (
									(size / totalbytes) *
									100
								).toFixed(2);
								return (
									<OverlayTrigger
										key={index}
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip
												id={name}
											>{`${name} ${percentage}%`}</Tooltip>
										}
									>
										<ProgressBar
											className={`${css[name]} progressbar`}
											now={percentage}
											label={`${percentage}%`}
											isChild={true}
											key={index}
										/>
									</OverlayTrigger>
								);
							})}
						</ProgressBar>
					</Col>
				</Row>
				<Row>{languageLabels}</Row>
			</Container>
		);
	}
}

/* const renderTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		{this.props.text}
	</Tooltip>
); */

export default linguistModul;
