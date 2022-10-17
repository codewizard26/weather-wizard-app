import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import InputForm from "./components/InputForm";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import WeatherData from "./components/WeatherData";
import axios from "axios";
import ModeContextProvider from "./contexts/mode";
import useCurrentLocation from "./contexts/currentLocation";
import { geolocationOptions } from "./components/constant/geolocationOptions";

function App() {
	const [search, setSearch] = useState("");
	const [allData, setAllData] = useState({
		city: "City Name",
		country: "Country",
		temperature: "NA",
		humidity: "NA",
		min_temp: "NA",
		pressure: "NA",
		icon: "10d",
		description: "Description",
	});
	const [notFoundSearch, setNotFoundSearch] = useState("");
	const [invalidSearch, setInvalidSearch] = useState("");
	const [isNoResult, setIsNoResult] = useState(false);
	const [loading, setLoading] = useState(false);
	const [dateAndTime, setDateAndTime] = useState("");
	const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);

	useEffect(() => {
		if (search) fetchData();
	}, []);

	useEffect(() => {
		console.log(currentLocation, currentError)
		if (currentLocation) fetchCurrData();
	}, [currentLocation]);

	useEffect(() => {
		setTimeout(() => {
			getCurrentDateAndTime();
		}, 1000);
	}, [dateAndTime]);

	const fetchCurrData = async () => {
		const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
		try {
			// Clear message for invalid search if location is entered in search field.
			setInvalidSearch("");
			setLoading(true);
			if (isNoResult) setIsNoResult(false);
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&appid=${APIKEY}`
			);

			await setAllData({
				city: result.data.name,
				country: result.data.sys.country,
				temperature: result.data.main.temp,
				humidity: result.data.main.humidity,
				min_temp: result.data.main.temp_min,
				description: result.data.weather[0].description,
				pressure: result.data.main.pressure,
				icon: result.data.weather[0].icon,
			});
		} catch (e) {
			await console.log("API loading");
			setIsNoResult(true);
		} finally {
			setLoading(false);
		}
	}

	const fetchData = async (city) => {
		const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
		try {
			// Clear message for invalid search if location is entered in search field.
			setInvalidSearch("");
			setLoading(true);
			if (isNoResult) setIsNoResult(false);
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
			);

			await setAllData({
				city: result.data.name,
				country: result.data.sys.country,
				temperature: result.data.main.temp,
				humidity: result.data.main.humidity,
				min_temp: result.data.main.temp_min,
				description: result.data.weather[0].description,
				pressure: result.data.main.pressure,
				icon: result.data.weather[0].icon,
			});
		} catch (e) {
			await console.log("API loading");
			setIsNoResult(true);
			setNotFoundSearch(city);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Ensure the searched city is not blank
		search !== ""
			? fetchData(search)
			: setInvalidSearch("Please enter city name to search.");
	};

	const getCurrentDateAndTime = () => {
		let date = new Date();
		let options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		let currentDate = date.toLocaleDateString("en-us", options);
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		let currentTime =
			hours > 12
				? `${hours - 12 < 10 ? `0${hours - 12}` : hours - 12}:${minutes < 10 ? `0${minutes}` : minutes
				}:${seconds < 10 ? `0${seconds}` : seconds} P.M`
				: `${hours}:${minutes}:${seconds} A.M`;
		setDateAndTime(`${currentDate} || ${currentTime}`);
	};

	return (
		<ModeContextProvider>
			<main>
				<div className="App">
					<NavBar dateAndTime={dateAndTime} />
					<section>
						<div className="header-div container">
							<InputForm
								loading={loading}
								handleChange={handleChange}
								search={search}
								handleSubmit={handleSubmit}
							/>

							{isNoResult && notFoundSearch && !invalidSearch && (
								<NotFound notFoundSearch={notFoundSearch} />
							)}

							{invalidSearch && <h6 className="notFoundText">{invalidSearch}</h6>}
							<WeatherData WeatherData={allData} />
						</div>
					</section>
				</div>
				<Footer />
			</main>
		</ModeContextProvider>
	);
}

export default App;
