const getWeatherIconClass = (shortForecast: string, isDaytime: boolean): string => {
    const text = shortForecast.toLowerCase();

    if (isDaytime) {
        if (text.includes("thunderstorm")) return "thunderstorm";
        if (text.includes("tornado")) return "tornado";
        if (text.includes("hurricane")) return "hurricane";
        if (text.includes("sleet")) return "sleet";
        if (text.includes("freezing rain") || text.includes("ice")) return "hail";
        if (text.includes("snow") || text.includes("flurries")) return "snow";
        if (text.includes("rain") || text.includes("showers")) return "rain";
        if (text.includes("drizzle")) return "sprinkle";
        if (text.includes("fog") || text.includes("haze") || text.includes("mist")) return "fog";
        if (text.includes("wind")) return "strong-wind";

        // Clouds & Sun
        if (text.includes("mostly sunny")) return "day-sunny-overcast";
        if (text.includes("partly sunny")) return "day-sunny-overcast";
        if (text.includes("partly cloudy")) return "day-cloudy";
        if (text.includes("mostly cloudy")) return "cloudy";
        if (text.includes("cloudy") || text.includes("overcast")) return "cloudy";

        // Clear / default sunny
        if (text.includes("clear") || text.includes("sunny")) return "day-sunny";
    }
    else {
        if (text.includes("thunderstorm")) return "n-thunderstorm";
        if (text.includes("tornado")) return "tornado";
        if (text.includes("hurricane")) return "hurricane";
        if (text.includes("sleet")) return "n-sleet";
        if (text.includes("freezing rain") || text.includes("ice")) return "n-hail";
        if (text.includes("snow") || text.includes("flurries")) return "n-snow";
        if (text.includes("rain") || text.includes("showers")) return "n-rain";
        if (text.includes("drizzle")) return "n-sprinkle";
        if (text.includes("fog") || text.includes("haze") || text.includes("mist")) return "n-fog";
        if (text.includes("wind")) return "strong-wind";

        // Clouds & Sun
        if (text.includes("mostly sunny")) return "night-partly-cloudy";
        if (text.includes("partly sunny")) return "night-partly-cloudy";
        if (text.includes("partly cloudy")) return "night-cloudy";
        if (text.includes("mostly cloudy")) return "cloudy";
        if (text.includes("cloudy") || text.includes("overcast")) return "cloudy";

        // Clear / default sunny
        if (text.includes("clear") || text.includes("sunny")) return "night-clear";
    }
    return "wi-na";

}

export default getWeatherIconClass;