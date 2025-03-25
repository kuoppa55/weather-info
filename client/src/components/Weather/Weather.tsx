import React from 'react'
import { WeatherData } from '../../types/types'
import processWeatherToday from '../../utils/processWeatherToday'
import Today from '../Today/Today'
import './Weather.css'
import Week from '../Week/Week'
import processWeatherWeek from '../../utils/processWeatherWeek'
import getTimeOfDay from '../../utils/getTimeOfDay'
import WeatherMap from '../WeatherMap/WeatherMap'
const Weather = (weatherData: WeatherData) => {
  const timeOfDay = getTimeOfDay()
  return (
    <div className="weather">
        <Today {...processWeatherToday(weatherData, timeOfDay)}></Today>
        <div className="weatherCenter">
          <Week weatherDays={processWeatherWeek(weatherData, timeOfDay)}/>
          <WeatherMap latitude={weatherData.latitude} longitude={weatherData.longitude}/>
        </div>
    </div>
  )
}

export default Weather