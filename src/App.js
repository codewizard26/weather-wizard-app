import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city: 'City Name',
    country: 'Country',
    temperature: 'NA',
    humidity: 'NA',
    min_temp: 'NA',
    pressure: 'NA',
    icon: '10d',
    description: 'Description'
  })
  const [notFoundSearch, setNotFoundSearch] = useState('')
  const [isNoResult, setIsNoResult] = useState(false)
  const [loading, setLoading] = useState(false);
  const [dateAndTime,setDateAndTime] = useState("");

  useEffect(() => {
    if (search) fetchData()
  }, [])
  useEffect(() => {
    setTimeout(() => {
      getCurrentDateAndTime();
    } , 1000)
  },[dateAndTime]);

  const fetchData = async (city) => {
    const APIKEY = process.env.REACT_APP_WEATHER_API_KEY
    try {
      setLoading(true)
      if (isNoResult) setIsNoResult(false)
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)

      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        min_temp: result.data.main.temp_min,
        description: result.data.weather[0].description,
        pressure: result.data.main.pressure,
        icon: result.data.weather[0].icon,
      })
    }

    catch (e) {
      await console.log("API loading")
      setIsNoResult(true)
      setNotFoundSearch(city)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchData(search)
  }

  const getCurrentDateAndTime = () => {
    let date = new Date();
    let options = {
      weekday:"long",
      year:"numeric",
      month:"long",
      day:"numeric"
    };
    let currentDate = date.toLocaleDateString("en-us",options);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let currentTime = hours > 12
    ? `${hours - 12 < 10 ? `0${hours - 12}` : hours - 12}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds} P.M`
    : `${hours}:${minutes}:${seconds} A.M`;
    setDateAndTime(`${currentDate} || ${currentTime}`);
  }


  return (
    <main>
      <div className="App">
        <nav className="navbar" style={{ "backgroundColor": "#e3f2fd" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="favicon.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top navlogo" />
              &nbsp;Weather Today
            </a>
            <a className="navbar-brand" href="/">
                {dateAndTime}
            </a>
          </div>
        </nav>


        <section>
          <div className='header-div'>
            <form>
              <input disabled={loading} className="input" type='text' placeholder='Location' onChange={handleChange} name="city" value={search}></input>
              <button className='button' type='submit' htmlFor="city" onClick={handleSubmit}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
            {(isNoResult && notFoundSearch) && (
              <h6 className='notFoundText'>
                No result for
                <h6 className="notFoundTextError">
                  {notFoundSearch}
                </h6>
              </h6>
            )}
            <div>

              <div className='data'>
                <img alt="icon" src={'http://openweathermap.org/img/wn/' + allData.icon + '@2x.png'}></img>


                <h1 className='location'>{(allData.city)} ({allData.country})</h1>

                <h3 className='title'>{(allData.description)}</h3>





                <div className='weather-description'>
                  <div>
                    <h3>Temperature</h3>
                    <p className='value'>{(allData.temperature)}°C</p>
                  </div><div>
                    <h3>Humidity</h3>
                    <p className='value'>{allData.humidity}</p>
                  </div>
                  <div>
                    <h3>Pressure</h3>
                    <p className='value'>{allData.pressure}mb</p>
                  </div>
                  <div>
                    <h3>Minimum Temp</h3>
                    <p className='value'>{allData.min_temp}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>


      </div>
      <div className='footer'>&#169; Made by CodeWizard_26</div>
    </main>
  )

}

export default App