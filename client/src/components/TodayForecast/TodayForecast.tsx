import React from 'react'
import { Wind } from '../../types/types'
import './TodayForecast.css'


interface TodayForecastProps {
    precipProb: number,
    wind: Wind,
    lowTemp: number,
    highTemp: number,
    nowTemp: number,
}

const TodayForecast = (props: TodayForecastProps) => {
    const {precipProb, wind, lowTemp, highTemp, nowTemp} = props
    return (
    <div className="todayForecast">
        <div className="temperaturesContainer">
            <p className ="todayTemperature" id="highTemp">
                {highTemp}
            </p>
            <p className ="todayTemperature" id="nowTemp">
                {Math.round(nowTemp)}
            </p>
            <p className ="todayTemperature "id="lowTemp">
                {lowTemp}
            </p>
        </div>
        <div className="rainAndWindContainer">
            <p className="todayPrecip">
                {precipProb}%
            </p>
            <p className="windForecast">
                {wind.windSpeed} {wind.windDirection}
            </p>
        </div>
    </div>
    )
}

export default TodayForecast