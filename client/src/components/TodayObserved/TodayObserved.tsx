import React from 'react'
import { ITodayObserved } from '../../types/types'
import './TodayObserved.css'

const TodayObserved = (props: ITodayObserved) => {
    const {stationId, stationName, wind, humidity, gust, visibility, pressure, metar} = props
    return (
        <>
            <h2 className="latestObservationsLabel">Latest Observation</h2>
            <div className="todayObserved">
                <h4 className="stationInformation">{stationId} {stationName}</h4>
                <div className="observationsGrid">
                    {(wind && wind.windSpeed && wind.windDirection) && 
                    <div className="nowWind">
                        Wind: {wind.windSpeed.toFixed(1)} mph from {wind.windDirection}
                    </div>}
                    {humidity &&  <div className="nowHumidity">Humidity: {humidity.toFixed(1)}%</div>}
                    {gust && <div className="nowGust">Gust: {gust.toFixed(1)} mph</div>}
                    {visibility && <div className="nowVis">Visibility: {visibility} miles</div>}
                    {pressure && <div className="nowPressure">Pressure: {Math.round(pressure)} MB</div>}
                </div>
                <p className="metarString">{metar}</p>
        </div>
        </>
    )
}

export default TodayObserved