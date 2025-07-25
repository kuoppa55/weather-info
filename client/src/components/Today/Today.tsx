import React from 'react'
import './Today.css'
import { IWeatherToday } from '../../types/types'
import TodayForecast from '../TodayForecast/TodayForecast'
import TodayObserved from '../TodayObserved/TodayObserved'
import HourlyForecast from '../HourlyForecast/HourlyForecast'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import getWeatherIconClass from '../../utils/getWeatherIconClass'

const Today = (props: IWeatherToday) => {
    const {timeOfDay, shortCast, todayForecast, todayObserved, todayHourly} = props

    return (
        <div className="todayContainer card">
            <h1 className="todayChild" id="todayHeader">{timeOfDay}</h1>
            <div className="todayChild" id="todayShortCast">
                <WeatherIcon iconKey={getWeatherIconClass(shortCast)} className='todayIcon'/>
                {shortCast}
            </div>
            <div className="todayChild" id="todayForecastContainer">
                <TodayForecast {...todayForecast} />
            </div>
            <div className="todayChild" id="todayObservedContainer">
                <TodayObserved {...todayObserved}/>
            </div>
            <div className="todayChild" id="hourlyForecastContainer">
                <HourlyForecast {...todayHourly}/>
            </div>
        </div>
    )
}

export default Today