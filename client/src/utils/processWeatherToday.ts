import { WeatherData, IWeatherToday, TimeOfDay, Temperature, DailyPeriod } from '../types/types';
const processWeatherToday = (weatherData: WeatherData, timeOfDay: TimeOfDay): IWeatherToday => {

    const currentPeriod = weatherData.dailyForecast.dailyPeriods[0]
    const nextPeriod = weatherData.dailyForecast.dailyPeriods[1]

    const currentObservation = weatherData.latestObservation.observation

    // returns a list of temperatures in the following format:
    // [0] = lowTemp
    // [1] = highTemp (does not exist if at night)
    function getTemps(timeOfDay: TimeOfDay, currentPeriod:DailyPeriod, nextPeriod: DailyPeriod): Temperature[] {
        if (timeOfDay === TimeOfDay.EarlyMorning) {
            return [currentPeriod.temperature, nextPeriod.temperature]
        } else if (timeOfDay === TimeOfDay.Day) {
            return [nextPeriod.temperature, currentPeriod.temperature]
        } else {
            return [currentPeriod.temperature]
        }

    }

    const temps = getTemps(timeOfDay, currentPeriod, nextPeriod)


    return {
        timeOfDay: currentPeriod.name,
        shortCast: currentPeriod.shortCast,
        todayForecast: {
            lowTemp: temps[0],
            highTemp: timeOfDay === TimeOfDay.Night ? null : temps[1],
            precipProb: currentPeriod.precipProb,
            wind: currentPeriod.wind,
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
        },
        todayHourly: weatherData.hourlyForecast,
    }
}

export default processWeatherToday
