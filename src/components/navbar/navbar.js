import React, { useState, useEffect } from "react";
import {
	//Container,
	Nav,
	Navbar,
} from "react-bootstrap";
//import css from "./navbar.module.css";
import css from "./navbar.module.css";
import NavLink from "./navLink";

/*JS Scrollspy (scrollspy.js)*/
const Navinbar = (props) => {
	const [isTop, setIsTop] = useState(true);
	useEffect(() => {
		document.addEventListener("scroll", () => {
			const istop = window.scrollY < 200;
			if (istop !== isTop) {
				setIsTop(istop);
			}
		});
	}, [isTop]);

	return (
		<Navbar
			collapseOnSelect
			expand="sm"
			variant="light"
			fixed="top"
			bg={isTop ? "transparent" : "gradient"}
		>
			<Navbar.Brand>
				{props.viwe === "landingpage" ? (
					<NavLink type="hashLink" name="< α />" to="#landingpage" />
				) : (
					<NavLink type="link" name="< α />" to="" />
				)}
			</Navbar.Brand>
			<Navbar.Toggle
				aria-controls="responsive-navbar-nav"
				//style={{ background: "black" }}
			/>
			<Navbar.Collapse
				id="responsive-navbar-nav"
				className={css.navbarCollapse}
			>
				{props.viwe === "landingpage" && (
					<Nav className="mr-auto mt-2 mt-lg-0">
						<Nav.Item>
							<NavLink
								type="hashLink"
								name="About"
								to="#aboutme"
							/>
						</Nav.Item>
						<Nav.Item>
							<NavLink
								type="hashLink"
								name="Projects"
								to="#projects"
							/>
						</Nav.Item>
						<Nav.Item>
							<NavLink type="link" name="Resume" to="/resume" />
						</Nav.Item>
						<Nav.Item>
							<NavLink type="link" name="Contact" to="/contact" />
						</Nav.Item>
					</Nav>
				)}
				{props.viwe === "resume" && (
					<Nav className="mr-auto mt-2 mt-lg-0">
						<Nav.Item>
							<NavLink type="link" name="Home" to="" />
						</Nav.Item>
						<Nav.Item>
							<NavLink type="link" name="Contact" to="/contact" />
						</Nav.Item>
					</Nav>
				)}
				{props.viwe === "contact" && (
					<Nav className="mr-auto mt-2 mt-lg-0">
						<Nav.Item>
							<NavLink type="link" name="Home" to="" />
						</Nav.Item>
						<Nav.Item>
							<NavLink type="link" name="Resume" to="/resume" />
						</Nav.Item>
					</Nav>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Navinbar;
