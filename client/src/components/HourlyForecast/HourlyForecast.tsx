import React from 'react'
import './HourlyForecast.css'
import { IHourlyForecast } from '../../types/types'
import Hour from '../Hour/Hour'

const HourlyForecast = (props: IHourlyForecast) => {
    const {hourlyPeriods} = props
    const now = new Date()
    const filteredPeriods = hourlyPeriods.filter(period => {
      const startTime = new Date(period.startTime)
      return startTime > now
    })
    return (
      <div className="hourlyForecast">
          <h2 className="hourlyForecastLabel">Coming Up</h2>
          <div className="hoursContainer">
              {filteredPeriods.slice(0, 6).map((hour) => (
                  <Hour {...hour} />
              ))}
          </div>
      </div>
  )
}

export default HourlyForecast