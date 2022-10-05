import './App.css'
import {useState,useEffect} from 'react'
import axios from 'axios'


function App() {
  
  const [search,setSearch] = useState('')
  const  [allData,setAllData] = useState({
    city:'City Name',
    country:'Country',
    temperature:'NA',
    humidity:'NA',
    min_temp:'NA',
    pressure:'NA',
    icon:'10d',
    description:'Description'
  })

  useEffect(() =>{
    fetchData()
  },[])

  const fetchData = async(city) =>{
    const APIKEY = process.env.REACT_APP_WEATHER_API_KEY
    try{
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)

    await setAllData({
      city:result.data.name,
      country:result.data.sys.country,
      temperature:result.data.main.temp,
      humidity:result.data.main.humidity,
      min_temp:result.data.main.temp_min,
      description:result.data.weather[0].description,
      pressure:result.data.main.pressure,
      icon:result.data.weather[0].icon,
    })
  }

  catch(e){
   await console.log("API loading")
  }
  }

 const  handleChange = (event) =>{
    setSearch(event.target.value)
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    fetchData(search)
  }


  return(    
    <main>
    <div className="App"> 

    <form>
    <input className="input" type = 'text' placeholder='Location' onChange={handleChange} name = "city" value={search}></input>
    <button className='button' type='submit' for="city" onClick={handleSubmit}>Search</button>
    </form>
    <section>
      <div className='header-div'>
        <div>
          <div className='data'>
      <img alt="icon" src={'http://openweathermap.org/img/wn/'+allData.icon+'@2x.png'}></img>


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