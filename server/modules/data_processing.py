import utils as utils
from metar import Metar
from zoneinfo import ZoneInfo
from datetime import datetime, timezone
from . import api_requests

def parse_daily_period(period):
    parsed_daily_period = {
        "name": period['name'],
        "startTime": utils.ISO_to_EST(period['startTime']),
        "endTime": utils.ISO_to_EST(period['endTime']),
        "shortCast": period['shortForecast']
    }

    temperature = {
        "value": period['temperature'],
        "unit": period['temperatureUnit'],
    }
    parsed_daily_period['temperature'] = temperature

    wind = {
        "windSpeed": period['windSpeed'],
        "windDirection": period['windDirection'],
    }
    parsed_daily_period['wind'] = wind

    precipProb = period['probabilityOfPrecipitation']['value']
    if not precipProb:
        precipProb = 0
    parsed_daily_period['precipProb'] = precipProb

    return parsed_daily_period

def parse_hourly_period(period):
    parsed_hourly_period = {
        "startTime": (period['startTime']),
        "endTime": (period['endTime']),
        "shortCast": period['shortForecast'],

    }

    temperature = {
        "value": period['temperature'],
        "unit": period['temperatureUnit'],
    }
    parsed_hourly_period['temperature'] = temperature

    precipProb = period['probabilityOfPrecipitation']['value']
    if not precipProb:
        precipProb = 0
    parsed_hourly_period['precipProb'] = precipProb

    dewPoint = period['dewpoint']['value']
    parsed_hourly_period['dewPoint'] = utils.celsius_to_farenheit(dewPoint)

    relativeHumidity = period['relativeHumidity']['value']
    parsed_hourly_period['relativeHumidity'] = relativeHumidity

    wind = {
        "windSpeed": period['windSpeed'],
        "windDirection": period['windDirection'],
    }
    parsed_hourly_period['wind'] = wind

    return parsed_hourly_period

def parse_latest_observation(observation):
    rawMetar = observation['rawMessage']
    parsedMetar = Metar.Metar(rawMetar)

    dt_naive = parsedMetar.time
    dt_utc = dt_naive.replace(tzinfo=timezone.utc)
    dt_est = dt_utc.astimezone(ZoneInfo('America/New_York')).strftime("%m/%d/%Y, %I:%M:%S %p")
    
    parsed_observation = {
        "metar": rawMetar,
        "timestamp": dt_est,
    }    

    temperature = parsedMetar.temp
    if temperature:
        parsed_observation['temperature'] = temperature.value(units="F")

    dewPoint = parsedMetar.dewpt
    if dewPoint:
        parsed_observation['dewPoint'] = dewPoint.value(units="F")

    windDirection = parsedMetar.wind_dir
    if windDirection:
        windDirection = utils.degrees_to_cardinal_direction(windDirection.value())

    windSpeed = parsedMetar.wind_speed
    if windSpeed:
        parsed_observation['wind'] = {
            'windDirection': windDirection,
            'windSpeed': windSpeed.value(units="MPH")
        } 
    
    windGust = parsedMetar.wind_gust
    if windGust:
        parsed_observation['windGust'] = windGust.value(units="MPH")
    

    barometricPressure = parsedMetar.press
    if barometricPressure:
        parsed_observation['barometricPressure'] = barometricPressure.value(units="MB")

    seaLevelPressure = parsedMetar.press_sea_level
    if seaLevelPressure:
        parsed_observation['sealevelPressure'] = seaLevelPressure.value(units="MB")

    
    visibility = parsedMetar.vis
    if visibility:
        parsed_observation['visibility'] = visibility.value(units="MI")
    
    maxTemp = parsedMetar.max_temp_6hr
    minTemp = parsedMetar.min_temp_6hr

    if maxTemp and minTemp:
        parsed_observation['temps_6hr'] = {
            "max": maxTemp.value(units="F"),
            "min": minTemp.value(units="F"),
        }

    relativeHumidity = observation['relativeHumidity']['value']
    if relativeHumidity:
        parsed_observation['relativeHumidity'] = relativeHumidity
    else:
        if temperature and dewPoint:
            parsed_observation['relativeHumidity'] = utils.get_rel_humid(parsed_observation['temperature'], parsed_observation['dewPoint'])

    sky = parsedMetar.sky
    if sky:
        parsed_observation['sky'] = sky
    
    return parsed_observation


def getDailyForecast(point):
    forecast = api_requests.get_forecast(point)
    rawProperties = forecast['properties']
    rawPeriods = rawProperties['periods']

    dailyForecast = {
        "timeInfo": utils.parse_times(rawProperties),
        "dailyPeriods": [],
    }


    for period in rawPeriods:
        endTime_dt = datetime.fromisoformat(period['endTime'])
        now_dt = datetime.now(timezone.utc)
        if now_dt < endTime_dt:
            dailyForecast['dailyPeriods'].append(parse_daily_period(period))
    
    return dailyForecast

def getHourlyForecast(point):
    pointProperties = point['properties']
    nwsOffice = pointProperties['gridId']
    gridX = pointProperties['gridX']
    gridY = pointProperties['gridY']

    rawHourlyForecast = api_requests.get_hourly_forecast(nwsOffice, gridX, gridY)
    hourlyForecastProperties = rawHourlyForecast['properties']
    periods = hourlyForecastProperties['periods']

    hourlyForecast = {
        "nwsOffice": nwsOffice,
        "gridX": gridX,
        "gridY": gridY,
        "timeInfo": utils.parse_times(hourlyForecastProperties),
        "hourlyPeriods": []

    }

    for period in periods:
        hourlyForecast['hourlyPeriods'].append(parse_hourly_period(period))
    
    return hourlyForecast

def getLatestObservation(point):
    observationStation = api_requests.get_observation_stations(point)['features'][0]
    properties = observationStation['properties']
    name = properties['name']
    stationId = properties['stationIdentifier']

    latestObservationRaw = api_requests.get_latest_observation(stationId)
    latestObservationProperties = latestObservationRaw['properties']

    latestObservation = {
        "name": name,
        "stationId": stationId,
    }

    latestObservation['observation'] = parse_latest_observation(latestObservationProperties)

    return latestObservation


def getAlerts(point):
    forecastZoneUrl = point['properties']['forecastZone']
    zoneId = forecastZoneUrl.rsplit('/', 1)[-1]
    rawAlerts = api_requests.get_alerts(zoneId)
    if rawAlerts['features']:
            alertProperties = rawAlerts['features'][0]['properties']
            alertId = alertProperties['id']
            print(alertId)
            alertStatus = alertProperties['status']
            print(alertStatus)
            alertMessageType = alertProperties['messageType']
            print(alertMessageType)
            print(alertProperties['category'])
            print(alertProperties['event'])
            alertHeadline = alertProperties['headline']
            print(alertHeadline)
            alertDescription = alertProperties['description']
            print(alertDescription)

#PWO
#CFP
def getProducts():
    pwoProduct = api_requests.get_product("PWO")
    cfpProduct = api_requests.get_product("CFP")
    
    print(pwoProduct)
    print(cfpProduct)




    

    