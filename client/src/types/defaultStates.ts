import { DailyForecast, HourlyForecast, LatestObservation, Observation, Temperature, WeatherData, Wind } from "./types";


const defaultTemperature: Temperature = {
    value: 0,
    unit: "",
}
const defaultWind: Wind  = {
    windSpeed: 0,
    windDirection: ","
}

const defaultObservation: Observation = {
    metar: "",
    temperature: 0,
    dewPoint: 0,
    wind: defaultWind,
    windGust: 0,
    barometricPressure: 0,
    sealevelPressure: 0,
    visibility: 0,
    minTemp: 0,
    maxTemp: 0,
    relativeHumidity: 0
}
const defaultLatestObservation: LatestObservation = {
    name: "",
    stationId: "",
    observation: defaultObservation,
}

const defaultHourlyForecast: HourlyForecast = {
    shortCast: "",
    temperature: defaultTemperature,
    precipProb: 0,
    dewPoint: 0,
    relativeHumidity: 0,
    wind: defaultWind,
}

const defaultDailyForecast: DailyForecast = {
    dailyPeriods: [],
    timeInfo: {
        generatedAt: "",
        validUntil: "",
        lastUpdated: "",
    }
}

export const defaultWeatherData: WeatherData = {
    latitude: "",
    longitude: "",
    dailyForecast: defaultDailyForecast,
    hourlyForecast: defaultHourlyForecast,
    latestObservation: defaultLatestObservation,
}