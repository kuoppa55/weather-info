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
    if rawMetar:
       return utils.get_observation_from_metar(rawMetar, observation)
    else:
       return utils.get_observation_direct(observation)


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

def merge_geometries_to_multipolygon(geometries: list[dict]) -> dict:
    multipolygon_coords = []

    for geom in geometries:
        if geom['type'] == "Polygon":
            multipolygon_coords.append(geom['coordinates'])
        elif geom['type'] == 'MultiPolygon':
            multipolygon_coords.extend(geom['coordinates'])
        else:
            print(f"Unsupported geometry type: {geom['type']}")
    return {
        "type": "MultiPolygon",
        "coordinates": multipolygon_coords,
    }

def getAlertMultiPolygonFromGeoCode(fips_list, fips_map):
    geometries = [fips_map[fips[1:]] for fips in fips_list if fips[1:] in fips_map]
    multipolygon_geojson = merge_geometries_to_multipolygon(geometries)
    return multipolygon_geojson


def getAlertGeometry(rawAlert, fips_map):
    geometry = rawAlert['geometry']
    if geometry:
        return geometry
    geocode = rawAlert['properties']['geocode']
    geometry = getAlertMultiPolygonFromGeoCode(geocode['SAME'], fips_map)
    return geometry

def getAlerts(point, fips_map):
    parsedAlerts = []

    forecastZoneUrl = point['properties']['county']
    countyId = forecastZoneUrl.rsplit('/', 1)[-1]
    rawAlerts = api_requests.get_alerts(countyId)

    if rawAlerts['features']:
        for rawAlert in rawAlerts['features']:
            props = rawAlert['properties']
            alert = {}

            alert['id'] = props['id']
            alert['areaDesc'] = props['areaDesc']
            alert['sent'] = props['sent']
            alert['effective'] = props['effective']
            alert['onset'] = props['onset']
            alert['expires'] = props['expires']
            alert['ends'] = props['ends']
            alert['status'] = props['status']
            alert['messageType'] = props['messageType']
            alert['category'] = props['category']
            alert['event'] = props['event']
            alert['headline'] = props['headline']
            alert['description'] = props['description']
            alert['severity'] = props['severity']
            alert['certainty'] = props['certainty']
            alert['urgency'] = props['urgency']
            alert['instruction'] = props['instruction']
            alert['response'] = props['response']

            alert['geometry'] = getAlertGeometry(rawAlert, fips_map)

            parsedAlerts.append(alert)

    return parsedAlerts

#PWO
#CFP
def getProducts():
    pwoProduct = api_requests.get_product("PWO")
    cfpProduct = api_requests.get_product("CFP")




    

    