const getWeatherIconClass = (shortForecast: string): string => {
    const text = shortForecast.toLowerCase();

    // Order matters! Higher-severity and more specific types first
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
    return "wi-na";

}

export default getWeatherIconClass;