import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCityWeatherInfo, selectorWeatherInfo, selectorStatus } from '../../Redux/weatherAppSlice'
import axios from 'axios'

function WeatherInfo() {

  const [cities, setCities] = useState([])
  const [currentCity, setCurrentCity] = useState('Istanbul')
  const dispatch = useDispatch()
  const weatherInfo = useSelector(selectorWeatherInfo)
  const status = useSelector(selectorStatus)
  const currentWeather = weatherInfo[0]


  const citiesRequest = async () => {
    let res = await axios(process.env.REACT_APP_API_CITY_URL)
    setCities(res.data)
  }

  useEffect(() => {
    citiesRequest()
    dispatch(fetchCityWeatherInfo('istanbul'))

  }, [])



  const handleChange = (e) => {
    dispatch(fetchCityWeatherInfo(e.target.value))
    setCurrentCity(e.target.value)
  }

  const nextFourDays = []

  for(let i=0;i<5;i++) {
    let dt = new Date();
    dt.setDate(dt.getDate() + i);
    nextFourDays.push(String(dt).slice(0,3))
  }



  

  return (

    <div className='box-align'>
      <div>
        <div className='dropdown-box'>
          <label className='dropdown-city-label' htmlFor="city">Choose a City:</label>
          <select onChange={handleChange} className='dropdown-city' name="city" id="city">
            <option defaultValue='istanbul' >Istanbul</option>
            {
              cities.map((city) => <option key={city.id} defaultValue='istanbul' value={city.name}>{city.name}</option>)
            }
          </select>
        </div>
      </div>
      <div className='weather-box'>
        <h1>{currentCity}, Turkey</h1>
        <div className='today-info'>
          <div className='column1'>
            {status === 'succeeded' && <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} />}
            <p>{status === 'succeeded' && currentWeather.weather[0].description}</p>

          </div>
          <div className='column2'>
            <p>{status === 'succeeded' && (parseFloat(currentWeather.main.temp) - 273).toFixed(1)}C°</p>
          </div>
          <div className='column3'>
            <p>Wind: {status === 'succeeded' && currentWeather.wind.speed}kmph</p>
            <p>Humidity: {status === 'succeeded' && currentWeather.main.humidity}%</p>
            <p>Pressure: {status === 'succeeded' && currentWeather.main.pressure} mb</p>


          </div>
        </div>
        <div className='five-days-info'>
          <ul>
          {nextFourDays.map((today) => <p key={today} className='list-item'>{today}</p>)}
            {
              weatherInfo.map((day) => (
                <li key={day.dt} className='list-item'>
                  <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                  <p>{(parseFloat(day.main.temp) - 273).toFixed(1)}C°</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo