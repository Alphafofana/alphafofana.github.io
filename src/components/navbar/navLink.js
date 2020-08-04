import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
	//Container,
	Nav,
	//Navbar,
} from "react-bootstrap";
import { HashLink } from "react-router-hash-link";

const NavLink = (props) => {
	return (
		<Fragment>
			{props.type === "link" && (
				<Nav.Link>
					{/* <Nav.Link as={Link} to={props.to}></Nav.Link> */}
					<Link className="nav-link lead" to={props.to}>
						{props.name}
					</Link>
				</Nav.Link>
			)}
			{props.type === "hashLink" && (
				<Nav.Link>
					<HashLink className="nav-link lead" smooth to={props.to}>
						{props.name}
					</HashLink>
				</Nav.Link>
			)}
		</Fragment>
	);
};

export default NavLink;
