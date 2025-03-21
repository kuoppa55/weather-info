import React from 'react'
import { WeatherData } from '../../types/types'
import processWeatherToday from '../../utils/processWeatherToday'
import Today from '../Today/Today'
import './Weather.css'
import Week from '../Week/Week'
import processWeatherWeek from '../../utils/processWeatherWeek'
const Weather = (weatherData: WeatherData) => {
  return (
    <div className="weather">
        <Today {...processWeatherToday(weatherData)}></Today>
        <Week weatherDays={processWeatherWeek(weatherData)}/>
    </div>
  )
}

export default Weather