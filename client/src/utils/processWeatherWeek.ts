import { WeatherData, IWeatherDay } from '../types/types';
const processWeatherWeek = (weatherData: WeatherData): IWeatherDay[] => {
    const weatherDays: IWeatherDay[] = []
    const dailyPeriods = weatherData.dailyForecast.dailyPeriods

    dailyPeriods.forEach((period) => {
        weatherDays.push({
            date: period.name,
            shortCast: period.shortCast,
            highTemp: period.temperature.value,
            lowTemp: period.temperature.value,
            precipProb: period.precipProb,
        })
    })

    return weatherDays

}

export default processWeatherWeek
