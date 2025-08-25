import utils as utils
import json
from modules import api_requests
from modules import data_processing
from fastapi import FastAPI
from fastapi import Request
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

DATA_PATH = Path(__file__).parent / "counties.geojson"

def load_county_geometries(file_path: Path):
    with open(file_path, 'r') as f:
        data = json.load(f)

    fips_map = {}
    for feature in data['features']:
        state = feature['properties']['STATE'].zfill(2)
        county = feature['properties']['COUNTY'].zfill(3)
        fips_code = state + county
        fips_map[fips_code] = feature['geometry']

    return fips_map

@asynccontextmanager
async def lifespan(app: FastAPI):
    fips_map = load_county_geometries(DATA_PATH)
    app.state.county_geometries_by_fips = fips_map
    print(f"Loaded {len(fips_map)} county geometries.")
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    'http://localhost:3000',
    'https://kuoppa55.github.io',
    'https://kuoppa55/github.io/weather-info'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



def process_point_information(lat, lon, point, fips_map):


    dailyForecast = data_processing.getDailyForecast(point)
    hourlyForecast = data_processing.getHourlyForecast(point)
    latestObservation = data_processing.getLatestObservation(point)
    currentAlerts = data_processing.getAlerts(point, fips_map)
    radarTimestamps = data_processing.getRadarTimestamps()

    response = {
        "latitude": lat,
        "longitude": lon,
        "dailyForecast": dailyForecast,
        "hourlyForecast": hourlyForecast,
        "latestObservation": latestObservation,
        "currentAlerts": currentAlerts,
        "radarTimestamps": radarTimestamps,
    }

    return response

@app.get('/weather/location/{lat}/{lon}')
async def get_weather_information_from_location(lat: float, lon: float, request: Request):
    point = api_requests.get_point([lat, lon])

    return process_point_information(lat, lon, point, request.app.state.county_geometries_by_fips)

@app.get('/weather/zip/{zipcode}')
async def get_weather_information_from_zip(zipcode: str, request: Request):
    lat_lon = api_requests.get_lat_lon_from_zip(zipcode)
    point = api_requests.get_point(lat_lon)

    return process_point_information(lat_lon[0], lat_lon[1], point, request.app.state.county_geometries_by_fips)

@app.get("/health")
def health():
    return {"ok": True}













