import React from "react";
import {ReactComponent as DaySunny} from "../../assets/icons/weather/wi-day-sunny.svg";
import {ReactComponent as DayThunderstorm} from "../../assets/icons/weather/wi-day-thunderstorm.svg";
import {ReactComponent as Tornado} from "../../assets/icons/weather/wi-tornado.svg";
import {ReactComponent as Hurricane} from "../../assets/icons/weather/wi-hurricane.svg";
import {ReactComponent as DaySleet} from "../../assets/icons/weather/wi-day-sleet.svg";
import {ReactComponent as DayHail} from "../../assets/icons/weather/wi-day-hail.svg";
import {ReactComponent as DaySnow} from "../../assets/icons/weather/wi-day-snow.svg";
import {ReactComponent as DayRain} from "../../assets/icons/weather/wi-day-rain.svg";
import {ReactComponent as DaySprinkle} from "../../assets/icons/weather/wi-day-sprinkle.svg";
import {ReactComponent as DayFog} from "../../assets/icons/weather/wi-day-fog.svg";
import {ReactComponent as StrongWind} from "../../assets/icons/weather/wi-strong-wind.svg";
import {ReactComponent as DaySunnyOvercast} from "../../assets/icons/weather/wi-day-sunny-overcast.svg";
import {ReactComponent as DayCloudy} from "../../assets/icons/weather/wi-day-cloudy.svg";
import {ReactComponent as Cloudy} from "../../assets/icons/weather/wi-cloudy.svg";
const iconMap: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
    "thunderstorm": DayThunderstorm,
    "tornado": Tornado,
    "hurricane": Hurricane,
    "sleet": DaySleet,
    "hail": DayHail,
    "snow": DaySnow,
    "rain": DayRain,
    "sprinkle": DaySprinkle,
    "fog": DayFog,
    "strong-wind": StrongWind,
    "day-sunny-overcast": DaySunnyOvercast,
    "day-cloudy": DayCloudy,
    "cloudy": Cloudy,
    "day-sunny": DaySunny,
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