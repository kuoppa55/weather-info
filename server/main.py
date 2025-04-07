import utils as utils
from modules import api_requests
from modules import data_processing
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



def process_point_information(lat, lon, point):


    dailyForecast = data_processing.getDailyForecast(point)
    hourlyForecast = data_processing.getHourlyForecast(point)
    latestObservation = data_processing.getLatestObservation(point)
    zoneId = data_processing.getAlerts(point)
    products = data_processing.getProducts()

    response = {
        "latitude": lat,
        "longitude": lon,
        "dailyForecast": dailyForecast,
        "hourlyForecast": hourlyForecast,
        "latestObservation": latestObservation,
    }

    return response

@app.get('/weather/location/{lat}/{lon}')
async def get_weather_information_from_location(lat: float, lon: float):
    point = api_requests.get_point([lat, lon])

    return process_point_information(lat, lon, point)

@app.get('/weather/zip/{zipcode}')
async def get_weather_information_from_zip(zipcode: str):
    lat_lon = api_requests.get_lat_lon_from_zip(zipcode)
    point = api_requests.get_point(lat_lon)

    return process_point_information(lat_lon[0], lat_lon[1], point)













