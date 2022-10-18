import React from "react"
import { useModeContext } from "../contexts/mode"

const InputForm = (props) => {
	const { loading, handleChange, search, handleSubmit, setUnitSystem } = props
	const { mode } = useModeContext()

	return (
		<>
			<form className={`${mode ? 'dark' : ''} "locationForm"`}>
				<input
					disabled={loading}
					className={`${mode ? 'dark dark-text' : ''} input`}
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
				<button disabled={!search} className="button-system" type="button" onClick={() => setUnitSystem('metric')}>
					°C
				</button>
				|
				<button disabled={!search} className="button-system" type="button" onClick={() => setUnitSystem('imperial')}>
					°F
				</button>
			</form>
		</>
	)
}

export default InputForm
