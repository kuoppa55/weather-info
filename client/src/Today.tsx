import React from 'react'
import './Today.css'
import { WeatherToday } from './types'

const Today = (props: WeatherToday) => {
    const {timeOfDay, shortCast, 
        forecastLowTemp, forecastHighTemp, forecastPrecipProb, forecastWind, 
        observedTemp, observedWind, observedHumidity, observedVisbility, observedPressure, observedGust,
        stationId, stationName, metarString} = props

    const tempUnit = forecastLowTemp.unit

    return (
        <div className="todayForecast">
            <h1 className="todayForecastChild" id="todayForecastHeader">{timeOfDay}</h1>
            <div className="todayForecastChild" id="todayShortCast">{shortCast}</div>
            <div className="todayForecastChild" id="todayTemperatures">
                <p className ="todayTemperature" id="highTemp">
                    {forecastHighTemp.value}&#176;{tempUnit}
                </p>
                <p className ="todayTemperature" id="nowTemp">
                    {Math.round(observedTemp)}&#176;{tempUnit}
                </p>
                <p className ="todayTemperature "id="lowTemp">
                    {forecastLowTemp.value}&#176;{tempUnit}
                </p>
            </div>
            <div className="todayForecastChild" id="todayPrecip">
                Precipitation: {forecastPrecipProb}%
            </div>
            <div className="todayForecastChild" id="todayWind">
                <div className="windForecast">
                    Wind: {forecastWind.windSpeed} from {forecastWind.windDirection}
                </div>
            </div>
            <div className="todayForecastChild" id="todayObserved">
                <h2 className="latestObservationsLabel">Latest Observation</h2>
                <h4 className="stationInformation">{stationId} {stationName}</h4>
                <div className="observationsGrid">
                    <div className="nowWind">
                        Wind: {observedWind.windSpeed.toFixed(1)} mph from {observedWind.windDirection}
                    </div>
                    {observedHumidity &&  <div className="nowHumidity">Humidity: {observedHumidity.toFixed(1)}%</div>}
                    {observedGust && <div className="nowGust">Gust: {observedGust} mph</div>}
                    {observedVisbility && <div className="nowVis">Visibility: {observedVisbility} miles</div>}
                    {observedPressure && <div className="nowPressure">Pressure: {Math.round(observedPressure)} MB</div>}
                </div>
                <p className="metarString">{metarString}</p>
            </div>
        </div>
    )
}

export default Today