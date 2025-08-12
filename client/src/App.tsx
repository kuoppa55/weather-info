import React, {useState} from 'react';
import axios from 'axios'
import { WeatherData } from './types/types';
import { defaultWeatherData } from './types/defaultStates';
import Weather from './components/Weather/Weather';
import Header from './components/Header/Header';
import './App.css'
import Loading from './components/Loading/Loading';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData)
  const [zipCode, setZipCode] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async(zip: string = "", lat: number = -1.0, lon: number = -1.0) => {
    setLoading(true)
    setError(null)
    try {
      const response = zip === "" ? await axios.get(`/weather/location/${lat}/${lon}`) : await axios.get(`/weather/zip/${zip}`)
      setWeatherData(response.data)
    } catch (err) {
      setError("Error fetching weather data")
    } finally {
      setLoading(false)
    }
  }

  const handleTitleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather("", position.coords.latitude, position.coords.longitude)
        }
      )
    }
  }

  const zipCodeProps = {
    zipCode: zipCode,
    setZipCode: setZipCode,
    fetchWeather: fetchWeather,
  }

  document.title = "Simply Weather";

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <Header zipCodeProps={zipCodeProps} onClick={handleTitleClick}/>
          {loading && <Loading />}
          {error && <p>{error}</p>}
          <div className="weatherContainer">
            {(weatherData.dailyForecast.dailyPeriods[0] && !loading && !error) && <Weather {...weatherData} />}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App
