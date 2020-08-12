import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";

const NavLink = (props) => {
	return (
		<Fragment>
			{props.type === "link" && (
				<Nav.Link
					as={Link}
					className="nav-link lead"
					eventKey={props.name}
					to={props.to}
				>
					{props.name}
				</Nav.Link>
			)}
			{props.type === "hashLink" && (
				<Nav.Link
					as={HashLink}
					className="nav-link lead "
					eventKey={props.name}
					smooth
					to={props.to}
				>
					{props.name}
				</Nav.Link>
			)}
		</Fragment>
	);
};

export default NavLink;
