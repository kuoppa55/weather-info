export type WeatherData = {
    latitude: string,
    longitude: string,
    dailyForecast: DailyForecast,
    hourlyForecast: HourlyForecast,
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

export type HourlyForecast = {
    timeInfo: {
        generatedAt: string,
        lastUpdated: string,
        validUntil: string,
    },
    hourlyPeriods: HourlyPeriod[]
}

export type HourlyPeriod = {
    shortCast: string,
    temperature: Temperature,
    precipProb: number,
    dewPoint: number,
    relativeHumidity: number,
    wind: Wind,
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
}

export type ITodayForecast = {
    precipProb: number,
    wind: Wind,
    lowTemp: Temperature,
    highTemp: Temperature,
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