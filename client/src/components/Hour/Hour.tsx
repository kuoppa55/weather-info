import React from 'react'
import './Hour.css'
import { HourlyPeriod } from '../../types/types'
import processHourTime from '../../utils/processHourTime'

const Hour = (props: HourlyPeriod) => {
    const {shortCast, temperature, precipProb, relativeHumidity, wind, startTime} = props
    return (
        <div className="hour">
            <div className="hourTime">
                {processHourTime(startTime)}
            </div>
            <div className="hourForecastDetails">
                <div className="hourForecastItem">
                    <div className="hourForecastItemValue">
                        {shortCast}
                    </div>
                </div>
                <div className="hourForecastItem">
                    <div className="hourForecastItemTitle">
                        Temp
                    </div>
                    <div className="hourForecastItemValue">
                        {temperature.value}
                    </div>
                </div>
                <div className="hourForecastItem">
                    <div className="hourForecastItemTitle">
                        Rain
                    </div>
                    <div className="hourForecastItemValue">
                        {precipProb}%
                    </div>
                </div>
                <div className="hourForecastItem">
                    <div className="hourForecastItemTitle">
                        Humidity
                    </div>
                    <div className="hourForecastItemValue">
                        {relativeHumidity}%
                    </div>
                </div>
                <div className="hourForecastItem">
                    <div className="hourForecastItemTitle">
                        Wind
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