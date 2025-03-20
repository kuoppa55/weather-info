import React from 'react'
import { HourlyPeriod } from '../../types/types'

const Hour = (props: HourlyPeriod) => {
    const {shortCast, temperature, precipProb, relativeHumidity, wind, startTime} = props
    return (
        <div className="hour">
            <div>
                {startTime}
            </div>
            <div>
                {shortCast}
            </div>
            <div>
                {temperature.value} F
            </div>
            <div>
                {precipProb}% chance of rain
            </div>
            <div>
                {relativeHumidity}% humidity
            </div>
            <div>
                Wind blowing {wind.windSpeed} from {wind.windDirection}
            </div>
            <div>
                ============================
            </div>
        </div>
    )
}

export default Hour