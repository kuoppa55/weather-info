import React from 'react'
import { IWeatherDay } from '../../types/types'
import './Weekday.css'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import getWeatherIconClass from '../../utils/getWeatherIconClass'

const Weekday = (props: IWeatherDay) => {
    const {date, shortCast, highTemp, lowTemp, precipProb} = props
    return (
        <div className="weekday">
            <div className="weekdayDate">
                {date}
            </div>
            <div className="weekdayCast">
                <WeatherIcon iconKey={getWeatherIconClass(shortCast, true)} className='weekdayIcon'/>
            </div>
            <div className="weekdayHighTemp">
                {highTemp}
            </div>
            <div className="weekdayLowTemp">
                {lowTemp}
            </div>
            <div className="weekdayPrecipProb">
                {precipProb}% rain
            </div>
        </div>
    )
}

export default Weekday