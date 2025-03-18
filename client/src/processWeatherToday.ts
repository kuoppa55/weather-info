import { WeatherData, WeatherToday } from './types';
const processWeatherToday = (weatherData: WeatherData): WeatherToday => {
    const firstWeatherPeriod = weatherData.dailyForecast.dailyPeriods[0]
    const secondWeatherPeriod = weatherData.dailyForecast.dailyPeriods[1]
    const currentObservation = weatherData.latestObservation.observation

    const isDayTime = (firstWeatherPeriod.name === "Today" || firstWeatherPeriod.name === "This Afternoon")
    const highTemp = (isDayTime ? firstWeatherPeriod.temperature : secondWeatherPeriod.temperature)
    const lowTemp = (isDayTime ? secondWeatherPeriod.temperature : firstWeatherPeriod.temperature)

    return {
        timeOfDay: firstWeatherPeriod.name,
        shortCast: firstWeatherPeriod.shortCast,
        forecastLowTemp: lowTemp,
        forecastHighTemp: highTemp,
        forecastPrecipProb: firstWeatherPeriod.precipProb,
        forecastWind: firstWeatherPeriod.wind,
        observedTemp: currentObservation.temperature,
        observedWind: currentObservation.wind,
        observedHumidity: currentObservation.relativeHumidity,
        observedVisbility: currentObservation.visibility,
        observedPressure: currentObservation.barometricPressure,
        observedGust: currentObservation.windGust,
        stationId: weatherData.latestObservation.stationId,
        stationName: weatherData.latestObservation.name,
        metarString: currentObservation.metar,
    }
}

export default processWeatherToday
