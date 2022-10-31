import React from "react"
import { useModeContext } from "../contexts/mode"

const unit = {
	metric: '°C',
	imperial: '°F'
}


const WeatherData = (props) => {
	const {
		WeatherData,
		unitSystem
	} = props
	const { city,
		icon,
		country,
		description,
		temperature,
		humidity,
		pressure,
		temp_min,
		feels_like,
		temp_max
	} = WeatherData
	const { mode } = useModeContext()

	const renderUnit = () => unit[unitSystem] ?? '-'

	return (
		<div className={`${mode ? 'dark data-mb' : 'data data-mb'} `}>
			<img
				className={`${mode ? 'dark-img' : 'dataIcon'}`}
				alt="icon"
				src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"}
			/>
			<h1 className="location">
				{city} ({country})
			</h1>
			<h3 className={`${mode ? 'dark' : ''}`}>{description}</h3>
			<div className="weather-description">
				<div className="grid-item">
					<h3 >Temperature</h3>
					<p className={`${mode ? 'dark-text' : 'value'}`}>{temperature}{renderUnit()}</p>
				</div>
				<div className="grid-item">
					<h3>Feels like</h3>
					<p className={`${mode ? 'dark-text' : 'value'}`}>{feels_like}{renderUnit()}</p>
				</div>
				<div className="grid-item">
					<h3>Minimum Temp</h3>
					<p className={`${mode ? 'dark-text' : 'value'}`}>{temp_min}{renderUnit()}</p>
				</div>
				<div className="grid-item">
					<h3>Maximum Temp</h3>
					<p className={`${mode ? 'dark-text' : 'value'}`}>{temp_max}{renderUnit()}</p>
				</div>
				<div className="grid-item">
					<h3>Pressure</h3>
					<p className={`${mode ? 'dark-text' : 'value'}`}>{pressure}hPa</p>
				</div>
				<div className="grid-item">
					<h3>Humidity</h3>
					<p className={`${mode ? 'dark-text' : 'value'}`}>{humidity}%</p>
				</div>
			</div>
		</div>
	)
}

export default WeatherData
