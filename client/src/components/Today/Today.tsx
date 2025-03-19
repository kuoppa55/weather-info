import React from 'react'
import './Today.css'
import { WeatherToday } from '../../types/types'
import TodayForecast from '../TodayForecast/TodayForecast'

const Today = (props: WeatherToday) => {
    const {timeOfDay, shortCast, 
        forecastLowTemp, forecastHighTemp, forecastPrecipProb, forecastWind, 
        observedTemp, observedWind, observedHumidity, observedVisbility, observedPressure, observedGust,
        stationId, stationName, metarString} = props

    return (
        <div className="todayContainer">
            <h1 className="todayChild" id="todayHeader">{timeOfDay}</h1>
            <div className="todayChild" id="todayShortCast">{shortCast}</div>
            <div className="todayChild" id="todayForecastContainer">
                <TodayForecast precipProb={forecastPrecipProb} wind={forecastWind} 
                lowTemp={forecastLowTemp.value} highTemp={forecastHighTemp.value} nowTemp={observedTemp}/>
            </div>
            <div className="todayChild" id="todayObservedContainer">
                <h2 className="latestObservationsLabel">Latest Observation</h2>
                <h4 className="stationInformation">{stationId} {stationName}</h4>
                <div className="observationsGrid">
                    <div className="nowWind">
                        Wind: {observedWind.windSpeed.toFixed(1)} mph from {observedWind.windDirection}
                    </div>
                    {observedHumidity &&  <div className="nowHumidity">Humidity: {observedHumidity.toFixed(1)}%</div>}
                    {observedGust && <div className="nowGust">Gust: {observedGust.toFixed(1)} mph</div>}
                    {observedVisbility && <div className="nowVis">Visibility: {observedVisbility} miles</div>}
                    {observedPressure && <div className="nowPressure">Pressure: {Math.round(observedPressure)} MB</div>}
                </div>
                <p className="metarString">{metarString}</p>
            </div>
        </div>
    )
}

export default Today