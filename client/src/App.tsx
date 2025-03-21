import React, {useState} from 'react';
import axios from 'axios'
import ZipCode from './components/ZipCode/ZipCode';
import { WeatherData } from './types/types';
import { defaultWeatherData } from './types/defaultStates';
import Weather from './components/Weather/Weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData)
  const [zipCode, setZipCode] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async(zip: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/weather/zip/${zip}`)
      setWeatherData(response.data)
      console.log(response.data)
    } catch (err) {
      setError("Error fetching weather data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <ZipCode zipCode={zipCode} setZipCode={setZipCode} fetchWeather={fetchWeather}/>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="weatherContainer">
          {(weatherData.dailyForecast.dailyPeriods[0] && !loading) && <Weather {...weatherData} />}
        </div>
      </header>
    </div>
  );
}

export default App
