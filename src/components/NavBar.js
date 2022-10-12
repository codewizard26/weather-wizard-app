import React from "react";

const NavBar = (props) => {
	const { dateAndTime } = props;

	return (
		<nav
			className="navbar navbar-dark"
			style={{ backgroundColor: "rgba(16 85 135 0)" }}
		>
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img
						src="favicon.png"
						alt="Logo"
						width="30"
						height="24"
						className="d-inline-block align-text-top navlogo"
					/>
					&nbsp;Weather Today
				</a>
				<span className="navbar-item" href="/">
					{dateAndTime}
				</span>
			</div>
		</nav>
	);
};

export default NavBar;
