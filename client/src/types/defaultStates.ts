import { DailyForecast, IHourlyForecast, LatestObservation, Observation,  WeatherData, Wind } from "./types";



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
    relativeHumidity: 0,
    timestamp: "",
}
const defaultLatestObservation: LatestObservation = {
    name: "",
    stationId: "",
    observation: defaultObservation,
}

const defaultHourlyForecast: IHourlyForecast = {
    hourlyPeriods: [],
    timeInfo: {
        generatedAt: "",
        validUntil: "",
        lastUpdated: "",
    },
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
    latitude: 0.0,
    longitude: 0.0,
    dailyForecast: defaultDailyForecast,
    hourlyForecast: defaultHourlyForecast,
    latestObservation: defaultLatestObservation,
    currentAlerts: [],
    radarTimestamps: [],
}