import requests

def get_lat_lon_from_zip(zip_code):
    url = f'http://api.zippopotam.us/us/{zip_code}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        lat = data['places'][0]['latitude']
        lon = data['places'][0]['longitude']
        return float(lat), float(lon)
    else:
        return None
    
def get_point(lat_lon):
    url = f'https://api.weather.gov/points/{lat_lon[0]},{lat_lon[1]}'
    response = requests.get(url).json()

    return response

def get_forecast(point):

    url = point['properties']['forecast']
    response = requests.get(url).json()

    return response

def get_observation_stations(point):
    observationStations_url = point['properties']['observationStations']
    response = requests.get(observationStations_url).json()

    return response

def get_latest_observation(stationId):
    url = f'https://api.weather.gov/stations/{stationId}/observations/latest'
    response = requests.get(url).json()

    return response

def get_hourly_forecast(nwsOffice, gridX, gridY):
    url = f'https://api.weather.gov/gridpoints/{nwsOffice}/{gridX},{gridY}/forecast/hourly'
    response = requests.get(url).json()

    return response