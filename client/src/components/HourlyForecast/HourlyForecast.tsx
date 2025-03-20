import React from 'react'
import './HourlyForecast.css'
import { IHourlyForecast } from '../../types/types'
import Hour from '../Hour/Hour'

const HourlyForecast = (props: IHourlyForecast) => {
    const {hourlyPeriods} = props
  return (
    <div className="hourlyForecast">
        <h2 className="hourlyForecastLabel">Coming Up</h2>
        <div className="hoursContainer">
            {hourlyPeriods.slice(0, 6).map((hour) => (
                <Hour {...hour} />
            ))}
        </div>
    </div>
  )
}

export default HourlyForecast