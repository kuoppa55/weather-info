import React from 'react'
import { WeatherData } from '../../types/types'
import processWeatherToday from '../../utils/processWeatherToday'
import Today from '../Today/Today'
import './Weather.css'
import Week from '../Week/Week'
import processWeatherWeek from '../../utils/processWeatherWeek'
import getTimeOfDay from '../../utils/getTimeOfDay'
import WeatherMap from '../WeatherMap/WeatherMap'
import Alerts from '../Alerts/Alerts'
import getAlertsCoordinateList from '../../utils/getAlertsCoordinateList'
const Weather = (weatherData: WeatherData) => {
  const timeOfDay = getTimeOfDay()
  return (
    <div className="weather">
        <Today {...processWeatherToday(weatherData, timeOfDay)}></Today>
        <div className="weatherCenter">
          <Week weatherDays={processWeatherWeek(weatherData, timeOfDay)}/>
          <Alerts alerts={weatherData.currentAlerts}/>
          <WeatherMap latitude={weatherData.latitude} longitude={weatherData.longitude} polygonCoordsList={getAlertsCoordinateList(weatherData.currentAlerts)}/>
        </div>
    </div>
  )
}

export default Weather