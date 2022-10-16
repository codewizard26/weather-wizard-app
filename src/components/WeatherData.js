import React from "react";
import { useModeContext } from "../contexts/mode";

const WeatherData = (props) => {
	const {
		city,
		icon,
		country,
		description,
		temperature,
		humidity,
		pressure,
		minTemp,
	} = props.WeatherData;
	const {mode} = useModeContext();

	return (
		<div className={`${mode?'dark data-mb':'data data-mb'} `}>
			<img
				className={`${mode?'dark-img':'dataIcon'}`}
				alt="icon"
				src={"http://openweathermap.org/img/wn/" + icon + "@2x.png" }
			></img>

			<h1 className="location">
				{city} ({country})
			</h1>

			<h3 className={`${mode?'dark':''}`}>{description}</h3>

			<div className="weather-description">
				<div>
					<h3 >Temperature</h3>
					<p className={`${mode?'dark-text':'value'}`}>{temperature}°C</p>
				</div>
				<div>
					<h3>Humidity</h3>
					<p className={`${mode?'dark-text':'value'}`}>{humidity}</p>
				</div>
				<div>
					<h3>Pressure</h3>
					<p className={`${mode?'dark-text':'value'}`}>{pressure}mb</p>
				</div>
				<div>
					<h3>Minimum Temp</h3>
					<p className={`${mode?'dark-text':'value'}`}>{minTemp}°C</p>
				</div>
			</div>
		</div>
	);
};

export default WeatherData;
