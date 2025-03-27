from datetime import datetime, timezone
import isodate
from zoneinfo import ZoneInfo
from metar import Metar

def get_valid_time(validTimes_str):
    start_str, duration_str = validTimes_str.split('/')

    start_dt = datetime.fromisoformat(start_str)
    duration = isodate.parse_duration(duration_str)

    end_dt = start_dt + duration

    return end_dt

def ISO_to_EST(time_str):
    time_dt = datetime.fromisoformat(time_str).astimezone(ZoneInfo("America/New_York"))
    return time_dt.strftime("%m-%d-%Y, %I:%M:%S %p")

def ISO_to_string(time_str):
    time_dt = datetime.fromisoformat(time_str)
    return time_dt.strftime("%m-%d-%Y, %I:%M:%S %p")

def celsius_to_farenheit(celsius):
    return (celsius * 9/5) + 32

def parse_times(properties):
    generatedAtTime = properties['generatedAt']
    updateTime = properties['updateTime']

    validTimes_str = properties['validTimes']
    validTimes_dt = get_valid_time(validTimes_str).astimezone(ZoneInfo("America/New_York"))
    validTimes = validTimes_dt.strftime("%m-%d-%Y, %I:%M:%S %p")

    return {
        "generatedAt": f"This forecast generated at: {ISO_to_EST(generatedAtTime)}",
        "lastUpdated": f"This forecast used data that was last updated at: {ISO_to_EST(updateTime)}",
        "validUntil": f"This forecast is valid until: {validTimes}",
    }

def degrees_to_cardinal_direction(degrees):
    degrees = float(degrees)
    if degrees > 337.5 or degrees <= 22.5:
        return "N"
    if degrees > 22.5 and degrees <= 67.5:
        return "NE"
    if degrees > 67.5 and degrees <= 112.5:
        return "E"
    if degrees > 112.5 and degrees <= 157.5:
        return "SE"
    if degrees > 157.5 and degrees <= 202.5:
        return "S"
    if degrees > 202.5 and degrees <= 247.5:
        return "SW"
    if degrees > 247.5 and degrees <= 292.5:
        return "W"
    if degrees > 295.5 and degrees <= 337.5:
        return "NW"
    return "UNKNOWN"

def km_to_mph(speed):
    return speed * 0.621371

def get_rel_humid(temp, dewpoint):
    saturationVPNumerator = temp*7.5
    saturationVPDenominator = temp+273.3
    saturationVPexp = saturationVPNumerator / saturationVPDenominator

    saturationVP = 6.11 * (10 ** saturationVPexp)

    actualVP = 6.11 * (10 ** ((dewpoint*7.5)/(dewpoint+273.3)))

    return (actualVP / saturationVP) * 100

def get_observation_from_metar(rawMetar, observation):
    parsed_observation = {}
    parsedMetar = Metar.Metar(rawMetar)

    
    parsed_observation['metar'] = rawMetar
    parsed_observation['timestamp'] = parsedMetar.time
    
    temperature = parsedMetar.temp
    if temperature:
        parsed_observation['temperature'] = temperature.value(units="F")

    dewPoint = parsedMetar.dewpt
    if dewPoint:
        parsed_observation['dewPoint'] = dewPoint.value(units="F")

    windDirection = parsedMetar.wind_dir
    if windDirection:
        windDirection = degrees_to_cardinal_direction(windDirection.value())

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
            parsed_observation['relativeHumidity'] = get_rel_humid(parsed_observation['temperature'], parsed_observation['dewPoint'])

    sky = parsedMetar.sky
    if sky:
        parsed_observation['sky'] = sky
    
    return parsed_observation

def get_observation_direct(observation):
    parsed_observation = {}

    rawTimestamp = observation['timestamp']
    rawTemperature = observation['temperature']['value']
    rawDewPoint = observation['dewpoint']['value']
    rawWindDirection = observation['windDirection']['value']
    rawWindSpeed = observation['windSpeed']['value']
    rawWindGust = observation['windGust']['value']
    rawBarometricPressure = observation['barometricPressure']['value']
    rawSeaLevelPressure = observation['seaLevelPressure']['value']
    rawVisibility = observation['visibility']['value']
    rawRelativeHumidity = observation['relativeHumidity']['value']
    

    parsed_observation['timestamp'] = ISO_to_EST(rawTimestamp)

    if rawTemperature:
        parsed_observation['temperature'] = celsius_to_farenheit(rawTemperature)

    if rawDewPoint:
        parsed_observation['dewPoint'] = celsius_to_farenheit(rawDewPoint)

    wind = {}
    if rawWindDirection:
        wind['windDirection'] = degrees_to_cardinal_direction(rawWindDirection)
    if rawWindSpeed:
        wind['windSpeed'] = km_to_mph(rawWindSpeed)
    parsed_observation['wind'] = wind

    if rawWindGust:
        parsed_observation['windGust'] = km_to_mph(rawWindGust)

    if rawBarometricPressure:    
        parsed_observation['barometricPressure'] = rawBarometricPressure / 100

    if rawSeaLevelPressure:
        parsed_observation['sealevelPressure'] = rawSeaLevelPressure / 100

    if rawVisibility:
        parsed_observation['visibility'] = round(km_to_mph(rawVisibility / 1000), 1)

    if rawRelativeHumidity:
        parsed_observation['relativeHumidity'] = rawRelativeHumidity
    else:
        if rawTemperature and rawDewPoint:
            parsed_observation['relativeHumidity'] = get_rel_humid(parsed_observation['temperature'], parsed_observation['dewPoint'])

    return parsed_observation

    

