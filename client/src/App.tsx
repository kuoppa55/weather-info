import React, {useState} from 'react';
import axios from 'axios'
import { WeatherData } from './types/types';
import { defaultWeatherData } from './types/defaultStates';
import Weather from './components/Weather/Weather';
import Header from './components/Header/Header';
import './App.css'

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
      console.log(response.data)
    } catch (err) {
      setError("Error fetching weather data")
    } finally {
      setLoading(false)
    }
  }

  const zipCodeProps = {
    zipCode: zipCode,
    setZipCode: setZipCode,
    fetchWeather: fetchWeather,
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header zipCodeProps={zipCodeProps}/>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="weatherContainer">
          {(weatherData.dailyForecast.dailyPeriods[0] && !loading && !error) && <Weather {...weatherData} />}
        </div>
      </header>
    </div>
  );
}

export default App
