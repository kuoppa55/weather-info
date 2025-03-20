import React from 'react'
import './Today.css'
import { IWeatherToday } from '../../types/types'
import TodayForecast from '../TodayForecast/TodayForecast'
import TodayObserved from '../TodayObserved/TodayObserved'

const Today = (props: IWeatherToday) => {
    const {timeOfDay, shortCast, todayForecast, todayObserved} = props

    return (
        <div className="todayContainer">
            <h1 className="todayChild" id="todayHeader">{timeOfDay}</h1>
            <div className="todayChild" id="todayShortCast">{shortCast}</div>
            <div className="todayChild" id="todayForecastContainer">
                <TodayForecast {...todayForecast} />
            </div>
            <div className="todayChild" id="todayObservedContainer">
                <TodayObserved {...todayObserved}/>
            </div>
        </div>
    )
}

export default Today