import React from 'react'
import { ITodayForecast} from '../../types/types'
import './TodayForecast.css'



const TodayForecast = (props: ITodayForecast) => {
    const {precipProb, wind, lowTemp, highTemp, nowTemp} = props
    return (
    <div className="todayForecast">
        <div className="todayPanel">
            {highTemp && <p className ="todayTemperature" id="highTemp">
                {highTemp.value}
            </p>}
            <p className ="todayTemperature" id="nowTemp">
                {Math.round(nowTemp)}
            </p>
            <p className ="todayTemperature" id="lowTemp">
                {lowTemp.value}
            </p>
        </div>
        <div className="rainAndWindContainer">
            <p className="todayPanel">
                {precipProb}%
            </p>
            <p className="todayPanel">
                {wind.windSpeed} {wind.windDirection}
            </p>
        </div>
    </div>
    )
}

export default TodayForecast