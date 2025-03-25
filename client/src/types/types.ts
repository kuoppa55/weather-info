export type WeatherData = {
    latitude: string,
    longitude: string,
    dailyForecast: DailyForecast,
    hourlyForecast: IHourlyForecast,
    latestObservation: LatestObservation,
}


export type DailyForecast = {
    dailyPeriods: DailyPeriod[],
    timeInfo: {
        generatedAt: string,
        lastUpdated: string,
        validUntil: string,
    }
}

export type DailyPeriod = {
    name: string,
    shortCast: string,
    temperature: Temperature,
    wind: Wind,
    precipProb: number,
}

export type IHourlyForecast = {
    timeInfo: {
        generatedAt: string,
        lastUpdated: string,
        validUntil: string,
    },
    hourlyPeriods: HourlyPeriod[],
}

export type HourlyPeriod = {
    shortCast: string,
    temperature: Temperature,
    precipProb: number,
    dewPoint: number,
    relativeHumidity: number,
    wind: Wind,
    startTime: string,
    endTime: string,
}

export type LatestObservation = {
    name: string,
    stationId: string,
    observation: Observation
}

export type Observation = {
    metar: string,
    temperature: number,
    dewPoint: number,
    wind: Wind,
    windGust: number,
    barometricPressure: number,
    sealevelPressure: number,
    visibility: number,
    minTemp: number,
    maxTemp: number,
    relativeHumidity: number,
}

export type Temperature = {
    value: number,
    unit: string,
}

export type Wind = {
    windSpeed: number,
    windDirection: string,
}

export type IWeatherToday = {
    timeOfDay: string,
    shortCast: string,
    todayForecast: ITodayForecast,
    todayObserved: ITodayObserved,
    todayHourly: IHourlyForecast,   
}

export type ITodayForecast = {
    precipProb: number,
    wind: Wind,
    lowTemp: Temperature,
    highTemp: Temperature | null,
    nowTemp: number,
}

export type ITodayObserved = {
    wind: Wind,
    humidity: number,
    visibility: number,
    pressure: number,
    gust: number,
    stationId: string,
    stationName: string,
    metar: string,
}

export type IWeatherDay = {
    date: string,
    shortCast: string,
    highTemp: number,
    lowTemp: number,
    precipProb: number,
}

export enum TimeOfDay {
    EarlyMorning,
    Day,
    Night,
}

export interface ZipCodeProps {
    zipCode: string,
    setZipCode: (zip: string) => void,
    fetchWeather: (zip: string) => void,
}