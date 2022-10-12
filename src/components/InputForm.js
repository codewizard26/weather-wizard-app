import React from "react";

const InputForm = (props) => {
	const { loading, handleChange, search, handleSubmit } = props;

	return (
		<form className="locationForm">
			<input
				disabled={loading}
				className="input"
				type="text"
				placeholder="Location"
				onChange={handleChange}
				name="city"
				value={search}
			></input>
			<button
				className="button"
				type="submit"
				htmlFor="city"
				onClick={handleSubmit}
			>
				{loading ? "Searching..." : "Search"}
			</button>
		</form>
	);
};

export default InputForm;
