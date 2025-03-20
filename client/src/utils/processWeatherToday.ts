import { WeatherData, IWeatherToday } from '../types/types';
const processWeatherToday = (weatherData: WeatherData): IWeatherToday => {
    const firstWeatherPeriod = weatherData.dailyForecast.dailyPeriods[0]
    const secondWeatherPeriod = weatherData.dailyForecast.dailyPeriods[1]
    const currentObservation = weatherData.latestObservation.observation

    const isDayTime = (firstWeatherPeriod.name === "Today" || firstWeatherPeriod.name === "This Afternoon")
    const highTemp = (isDayTime ? firstWeatherPeriod.temperature : secondWeatherPeriod.temperature)
    const lowTemp = (isDayTime ? secondWeatherPeriod.temperature : firstWeatherPeriod.temperature)

    return {
        timeOfDay: firstWeatherPeriod.name,
        shortCast: firstWeatherPeriod.shortCast,
        todayForecast: {
            lowTemp: lowTemp,
            highTemp: highTemp,
            precipProb: firstWeatherPeriod.precipProb,
            wind: firstWeatherPeriod.wind,
            nowTemp: currentObservation.temperature,
        },
        todayObserved: {
            wind: currentObservation.wind,
            humidity: currentObservation.relativeHumidity,
            visibility: currentObservation.visibility,
            pressure: currentObservation.barometricPressure,
            gust: currentObservation.windGust,
            stationId: weatherData.latestObservation.stationId,
            stationName: weatherData.latestObservation.name,
            metar: currentObservation.metar,
        }
    }
}

export default processWeatherToday
