import { WeatherData, IWeatherDay, TimeOfDay } from '../types/types';
const processWeatherWeek = (weatherData: WeatherData, timeOfDay: TimeOfDay): IWeatherDay[] => {
    const weatherDays: IWeatherDay[] = []
    const dailyPeriods = weatherData.dailyForecast.dailyPeriods

    let startingIndex: number;

    if(timeOfDay === TimeOfDay.EarlyMorning) {
        startingIndex = 3
    } else if(timeOfDay === TimeOfDay.Day) {
        startingIndex = 2
    } else {
        startingIndex = 1
    }


    for(let i = startingIndex; i < dailyPeriods.length; i+= 2) {
        weatherDays.push({
            date: dailyPeriods[i].name,
            shortCast: dailyPeriods[i].shortCast,
            highTemp: dailyPeriods[i].temperature.value,
            lowTemp: dailyPeriods[i+1] ? dailyPeriods[i+1].temperature.value : 0,
            precipProb: dailyPeriods[i].precipProb,
        })
    }

    return weatherDays

}

export default processWeatherWeek
