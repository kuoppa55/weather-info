import React from 'react'
import './Week.css'
import { IWeatherDay } from '../../types/types'
import Weekday from '../Weekday/Weekday'

interface WeekProps {
    weatherDays: IWeatherDay[]
}
const Week = (props: WeekProps) => {
    const {weatherDays} = props
    return (
        <div className="week">
            {weatherDays.slice(0, 6).map((day) => (
                    <Weekday {...day} />
                ))}
        </div>
    )
}

export default Week