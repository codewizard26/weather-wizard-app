import React from "react";

const NotFound = (props) => {
	const { notFoundSearch } = props;
	return (
		<h6 className="notFoundText">
			No result for
			<h6 className="notFoundTextError">{notFoundSearch}</h6>
		</h6>
	);
};

export default NotFound;
