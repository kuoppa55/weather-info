import React from 'react'
import { ITodayObserved } from '../../types/types'
import './TodayObserved.css'
import WeatherIcon from '../WeatherIcon/WeatherIcon'

const TodayObserved = (props: ITodayObserved) => {
    const {stationId, stationName, wind, humidity, gust, visibility, pressure} = props
    return (
        <>
            <h2 className="latestObservationsLabel">Now</h2>
            <div className="todayObserved">
                <h4 className="stationInformation">{stationId} {stationName}</h4>
                <div className="observationsGrid">
                    {(wind && wind.windSpeed && wind.windDirection) && 
                    <div className="nowWind">
                        <WeatherIcon iconKey="wind-measurement" className='nowIcon'/>
                        {wind.windSpeed.toFixed(1)} mph from {wind.windDirection}
                    </div>}
                    {humidity &&  <div className="nowHumidity"><WeatherIcon iconKey="humidity" className='nowIcon'/> {humidity.toFixed(1)}%</div>}
                    {gust && <div className="nowGust"><WeatherIcon iconKey="wind-gust" className='nowIcon'/> {gust.toFixed(1)} mph</div>}
                    {visibility && <div className="nowVis"><WeatherIcon iconKey="visibility" className='nowIcon'/> {visibility.toFixed(1)} miles</div>}
                    {pressure && <div className="nowPressure"><WeatherIcon iconKey="pressure" className='nowIcon'/> {Math.round(pressure)} MB</div>}
                </div>
        </div>
        </>
    )
}

export default TodayObserved