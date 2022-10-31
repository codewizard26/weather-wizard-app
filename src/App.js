import "./App.css"
import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import { useTranslation } from "react-i18next"
import InputForm from "./components/InputForm"
import NavBar from "./components/NavBar"
import NotFound from "./components/NotFound"
import WeatherData from "./components/WeatherData"
import axios from "axios"
import ModeContextProvider from "./contexts/mode"
import useCurrentLocation from "./contexts/currentLocation"
import { geolocationOptions } from "./components/constant/geolocationOptions"
import "./components/languages/i18n"

function App() {
	const [search, setSearch] = useState("")
	const [allData, setAllData] = useState({
		city: "City Name",
		country: "Country",
		temperature: "NA",
		humidity: "NA",
		temp_min: "NA",
		pressure: "NA",
		icon: "10d",
		description: "Description",
		feels_like: 'NA',
		temp_max: 'NA'
	})
	const [currentLanguage, setLanguage] = useState(() => {
		return localStorage.getItem("language") || "en"
	})
	const [notFoundSearch, setNotFoundSearch] = useState("")
	const [invalidSearch, setInvalidSearch] = useState("")
	const [openBox, setOpenBox] = useState(false)
	const [isNoResult, setIsNoResult] = useState(false)
	const [loading, setLoading] = useState(false)
	const { t, i18n } = useTranslation()
	const [dateAndTime, setDateAndTime] = useState("")
	const [unitSystem, setUnitSystem] = useState("metric")

	const { location: currentLocation, error: currentError } =
		useCurrentLocation(geolocationOptions)

	useEffect(() => {
		console.log(currentLocation, currentError)
		if (currentLocation && !search) fetchCurrData()
	}, [currentLocation, unitSystem, search])

	useEffect(() => {
		setTimeout(() => {
			getCurrentDateAndTime()
		}, 1000)
	}, [dateAndTime])

	useEffect(() => {
		if (currentLanguage === "en") return

		changeLanguage(currentLanguage)

		// eslint-disable-next-line
	}, [currentLanguage])

	const handleLanguage = (event) => {
		changeLanguage(event.target.value)
		localStorage.setItem("language", event.target.value)
	}

	const changeLanguage = (value, location) => {
		i18n
			.changeLanguage(value)
			.then(() => setLanguage(value))
			.catch((err) => console.log(err))
	}

	const fetchCurrData = async () => {
		const APIKEY = process.env.REACT_APP_WEATHER_API_KEY
		try {
			// Clear message for invalid search if location is entered in search field.
			setInvalidSearch("")
			setLoading(true)
			if (isNoResult) setIsNoResult(false)
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=${unitSystem}&appid=${APIKEY}`
			)

			const { feels_like, temp_max, } = result.data.main

			await setAllData({
				city: result.data.name,
				country: result.data.sys.country,
				temperature: result.data.main.temp,
				humidity: result.data.main.humidity,
				temp_min: result.data.main.temp_min,
				description: result.data.weather[0].description,
				pressure: result.data.main.pressure,
				icon: result.data.weather[0].icon,
				feels_like,
				temp_max
			})
		} catch (e) {
			await console.log("API loading")
			setIsNoResult(true)
		} finally {
			setLoading(false)
		}
	}

	const fetchData = async (city, unit) => {
		const APIKEY = process.env.REACT_APP_WEATHER_API_KEY
		try {
			// Clear message for invalid search if location is entered in search field.
			setInvalidSearch("")
			setLoading(true)
			if (isNoResult) setIsNoResult(false)
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${APIKEY}`
			)

			const { feels_like, temp_max, } = result.data.main

			await setAllData({
				city: result.data.name,
				country: result.data.sys.country,
				temperature: result.data.main.temp,
				humidity: result.data.main.humidity,
				temp_min: result.data.main.temp_min,
				description: result.data.weather[0].description,
				pressure: result.data.main.pressure,
				icon: result.data.weather[0].icon,
				feels_like,
				temp_max
			})
		} catch (e) {
			await console.log("API loading")
			setIsNoResult(true)
			setNotFoundSearch(city)
			setOpenBox(true)
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (event) => {
		setSearch(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// Ensure the searched city is not blank
		search !== ""
			? fetchData(search, unitSystem)
			: setInvalidSearch("Please enter city name to search.")
	}

	const getCurrentDateAndTime = () => {
		let date = new Date()
		let options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}
		let currentDate = date.toLocaleDateString("en-us", options)
		let hours = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()
		let currentTime =
			hours > 12
				? `${hours - 12 < 10 ? `0${hours - 12}` : hours - 12}:${minutes < 10 ? `0${minutes}` : minutes
				}:${seconds < 10 ? `0${seconds}` : seconds} P.M`
				: `${hours}:${minutes}:${seconds} A.M`
		setDateAndTime(`${currentDate} || ${currentTime}`)
	}

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
								setUnitSystem={setUnitSystem}
								fetchData={fetchData}
							/>

							{isNoResult && notFoundSearch && !invalidSearch && (
								<NotFound notFoundSearch={notFoundSearch} open={openBox} />
							)}

							{invalidSearch && (
								<h6 className="notFoundText">{invalidSearch}</h6>
							)}
							<WeatherData
								WeatherData={allData}
								unitSystem={unitSystem}
							/>
						</div>
						<div className="info-container">
							<div className="info-inner-container">
								<select
									className="selected-languange"
									defaultValue={currentLanguage}
									onChange={(e) => handleLanguage(e)}
								>
									<option selected value="en">
										English
									</option>
									<option value="es">Español</option>
									<option value="fr">Français</option>
									<option value="id">Indonesia</option>
									<option value="ta">தமிழ்</option>
									<option value="zh">简体中文</option>
									<option value="ukr">Ukrainian</option>
									<option value="es">{t("languages.es")}</option>
									<option value="fr">{t("languages.fr")}</option>
									<option value="id">{t("languages.id")}</option>
									<option value="it">{t("languages.it")}</option>
									<option value="ta">{t("languages.ta")}</option>
									<option value="bn">{t("languages.bn")}</option>
									<option value="zh">{t("languages.zh")}</option>
									<option value="ptBR">{t("languages.ptBR")}</option>
									<option value="neNP">{t("languages.neNP")}</option>
									<option value="he">{t("languages.he")}</option>
									<option value="hnd">{t("languages.hnd")}</option>
								</select>
							</div>
						</div>
					</section>
				</div>
				<Footer />
			</main>
		</ModeContextProvider>
	)
}

export default App
