import React from "react"
import { useModeContext } from "../contexts/mode"

const InputForm = (props) => {
	const {
		loading,
		handleChange,
		search,
		handleSubmit,
		setUnitSystem,
		fetchData
	} = props
	const { mode } = useModeContext()

	const handleChangeUnitSystem = (unit) => {
		setUnitSystem((prev) => {
			if (unit !== prev) {
				fetchData(search, unit)
				return unit
			}
			return prev
		})
	}

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
				<button className="button-system" type="button" onClick={() => handleChangeUnitSystem('metric')}>
					°C
				</button>
				|
				<button className="button-system" type="button" onClick={() => handleChangeUnitSystem('imperial')}>
					°F
				</button>
			</form>
		</>
	)
}

export default InputForm
