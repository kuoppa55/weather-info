from datetime import datetime
import isodate
from zoneinfo import ZoneInfo

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

    

