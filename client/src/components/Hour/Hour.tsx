import React from 'react'
import './Hour.css'
import { HourlyPeriod } from '../../types/types'
import processHourTime from '../../utils/processHourTime'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import getWeatherIconClass from '../../utils/getWeatherIconClass'

const Hour = (props: HourlyPeriod) => {
    const {shortCast, temperature, precipProb, relativeHumidity, wind, startTime, isDaytime} = props
    return (
        <div className="hour">
            <div className="hourSummary">
                {processHourTime(startTime)}
                <WeatherIcon iconKey={getWeatherIconClass(shortCast, isDaytime)} className='summaryIcon'/>
            </div>
            <div className="hourForecastDetails">
                <div className="hourForecastItem">
                    <WeatherIcon iconKey="thermometer" className='hourIcon'/>
                    {temperature.value}
                </div>
                <div className="hourForecastItem">
                    <div className="hourForecastItemTitle">
                        <WeatherIcon iconKey="rain-drop" className='hourIcon'/>
                    </div>
                    <div className="hourForecastItemValue">
                        {precipProb}%
                    </div>
                </div>
                <div className="hourForecastItem">
                    <div className="hourForecastItemTitle">
                        <WeatherIcon iconKey="humidity" className='hourIcon'/>
                    </div>
                    <div className="hourForecastItemValue">
                        {relativeHumidity}%
                    </div>
                </div>
                <div className="hourForecastItem">
                    <div className="hourForecastItemTitle">
                        <WeatherIcon iconKey="wind-measurement" className='hourIcon'/>
                    </div>
                    <div className="hourForecastItemValue">
                        {wind.windSpeed} {wind.windDirection}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hour