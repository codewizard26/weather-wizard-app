import React from "react";

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

	return (
		<div className="data">
			<img
				className="dataIcon"
				alt="icon"
				src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"}
			></img>

			<h1 className="location">
				{city} ({country})
			</h1>

			<h3 className="title">{description}</h3>

			<div className="weather-description">
				<div>
					<h3>Temperature</h3>
					<p className="value">{temperature}°C</p>
				</div>
				<div>
					<h3>Humidity</h3>
					<p className="value">{humidity}</p>
				</div>
				<div>
					<h3>Pressure</h3>
					<p className="value">{pressure}mb</p>
				</div>
				<div>
					<h3>Minimum Temp</h3>
					<p className="value">{minTemp}°C</p>
				</div>
			</div>
		</div>
	);
};

export default WeatherData;
