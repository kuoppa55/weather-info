import React from 'react'
import './Today.css'
import { WeatherToday } from '../../types/types'
import TodayForecast from '../TodayForecast/TodayForecast'
import TodayObserved from '../TodayObserved/TodayObserved'

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
                <TodayObserved wind={observedWind} humidity={observedHumidity} visibility={observedVisbility} pressure={observedPressure}
                gust={observedGust} stationId={stationId} stationName={stationName} metar={metarString} />
            </div>
        </div>
    )
}

export default Today