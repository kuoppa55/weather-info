import React from 'react'
import { IWeatherDay } from '../../types/types'

const Weekday = (props: IWeatherDay) => {
    const {date, shortCast, highTemp, lowTemp, precipProb} = props
    return (
        <div className="weekday">
            <div className="weekdayDate">
                {date}
            </div>
            <div className="weekdayCast">
                {shortCast}
            </div>
            <div className="weekdayLowTemp">
                {lowTemp}
            </div>
            <div className="weekdayHighTemp">
                {highTemp}
            </div>
            <div className="weekdayPrecipProb">
                {precipProb}
            </div>
        </div>
    )
}

export default Weekday