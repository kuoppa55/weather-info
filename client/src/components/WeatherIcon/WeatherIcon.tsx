import React from "react";
import {ReactComponent as DaySunny} from "../../assets/icons/weather/wi-day-sunny.svg";
import {ReactComponent as NightClear} from "../../assets/icons/weather/wi-night-clear.svg";
import {ReactComponent as DayThunderstorm} from "../../assets/icons/weather/wi-day-thunderstorm.svg";
import {ReactComponent as NightThunderstorm} from "../../assets/icons/weather/wi-night-thunderstorm.svg";
import {ReactComponent as Tornado} from "../../assets/icons/weather/wi-tornado.svg";
import {ReactComponent as Hurricane} from "../../assets/icons/weather/wi-hurricane.svg";
import {ReactComponent as DaySleet} from "../../assets/icons/weather/wi-day-sleet.svg";
import {ReactComponent as NightSleet} from "../../assets/icons/weather/wi-night-sleet.svg";
import {ReactComponent as DayHail} from "../../assets/icons/weather/wi-day-hail.svg";
import {ReactComponent as NightHail} from "../../assets/icons/weather/wi-night-hail.svg";
import {ReactComponent as DaySnow} from "../../assets/icons/weather/wi-day-snow.svg";
import {ReactComponent as NightSnow} from "../../assets/icons/weather/wi-night-snow.svg";
import {ReactComponent as DayRain} from "../../assets/icons/weather/wi-day-rain.svg";
import {ReactComponent as NightRain} from "../../assets/icons/weather/wi-night-rain.svg";
import {ReactComponent as DaySprinkle} from "../../assets/icons/weather/wi-day-sprinkle.svg";
import {ReactComponent as NightSprinkle} from "../../assets/icons/weather/wi-night-sprinkle.svg";
import {ReactComponent as DayFog} from "../../assets/icons/weather/wi-day-fog.svg";
import {ReactComponent as NightFog} from "../../assets/icons/weather/wi-night-fog.svg";
import {ReactComponent as StrongWind} from "../../assets/icons/weather/wi-strong-wind.svg";
import {ReactComponent as DaySunnyOvercast} from "../../assets/icons/weather/wi-day-sunny-overcast.svg";
import {ReactComponent as NightPartlyCloudy} from "../../assets/icons/weather/wi-night-partly-cloudy.svg";
import {ReactComponent as DayCloudy} from "../../assets/icons/weather/wi-day-cloudy.svg";
import {ReactComponent as NightCloudy} from "../../assets/icons/weather/wi-night-cloudy.svg";
import {ReactComponent as Cloudy} from "../../assets/icons/weather/wi-cloudy.svg";
import {ReactComponent as RainDrops} from "../../assets/icons/weather/wi-showers.svg";
import {ReactComponent as Thermometer} from "../../assets/icons/weather/wi-thermometer.svg";
import {ReactComponent as Humidity} from "../../assets/icons/weather/wi-humidity.svg";
import {ReactComponent as Pressure} from "../../assets/icons/weather/wi-barometer.svg";
import {ReactComponent as Visibility} from "../../assets/icons/weather/wi-fog.svg";
import {ReactComponent as WindGust} from "../../assets/icons/weather/wi-gale-warning.svg";
const iconMap: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
    "thunderstorm": DayThunderstorm,
    "n-thunderstorm": NightThunderstorm,
    "tornado": Tornado,
    "hurricane": Hurricane,
    "sleet": DaySleet,
    "n-sleet": NightSleet,
    "hail": DayHail,
    "n-hail": NightHail,
    "snow": DaySnow,
    "n-snow": NightSnow,
    "rain": DayRain,
    "n-rain": NightRain,
    "sprinkle": DaySprinkle,
    "n-sprinkle": NightSprinkle,
    "fog": DayFog,
    "n-fog": NightFog,
    "strong-wind": StrongWind,
    "day-sunny-overcast": DaySunnyOvercast,
    "night-partly-cloudy": NightPartlyCloudy,
    "day-cloudy": DayCloudy,
    "night-cloudy": NightCloudy,
    "cloudy": Cloudy,
    "day-sunny": DaySunny,
    "night-clear": NightClear,
    "rain-drop": RainDrops,
    "wind-measurement": StrongWind,
    "thermometer": Thermometer,
    "humidity": Humidity,
    "pressure": Pressure,
    "visibility": Visibility,
    "wind-gust": WindGust,
};

type WeatherIconProps = {
    iconKey: keyof typeof iconMap;
    className?: string;
};

const WeatherIcon = (props: WeatherIconProps) => {
    const {iconKey, className} = props;
    const Icon = iconMap[iconKey];

    return Icon ? <Icon className={className}/> : null;
}

export default WeatherIcon;