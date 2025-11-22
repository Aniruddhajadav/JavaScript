document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    const forecastInfo = document.getElementById('forecast-info');

    if (!city) {
        weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
        forecastInfo.innerHTML = '';
        return;
    }

    weatherInfo.innerHTML = `<p>Loading...</p>`;
    forecastInfo.innerHTML = ''; // Clear previous forecast

    try {
        // Step 1: Geocoding - Get coordinates from city name
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            throw new Error('City not found. Please try again.');
        }

        const { latitude, longitude, name } = geoData.results[0];

        // Step 2: Weather Forecast - Get weather using coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        displayCurrentWeather(weatherData, name);
        displayForecast(weatherData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        const errorMessage = error.message.charAt(0).toUpperCase() + error.message.slice(1);
        weatherInfo.innerHTML = `<p>Could not fetch weather data: ${errorMessage}. Please try again.</p>`;
        forecastInfo.innerHTML = '';
    }
});

function displayCurrentWeather(data, cityName) {
    const weatherInfo = document.getElementById('weather-info');
    const { temperature_2m, wind_speed_10m, weather_code } = data.current;
    const { icon, description } = getWeatherInfoFromCode(weather_code);

    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <div class="weather-main">
            <span class="weather-icon-emoji">${icon}</span>
            <span class="temperature">${Math.round(temperature_2m)}°C</span>
        </div>
        <p class="weather-description"><strong>Weather:</strong> ${description}</p>
        <p><strong>Wind Speed:</strong> ${wind_speed_10m} km/h</p>
    `;
}

function displayForecast(data) {
    const forecastInfo = document.getElementById('forecast-info');
    const { time, weather_code, temperature_2m_max } = data.daily;

    let forecastHtml = `<h3>5-Day Forecast</h3>`;

    // Loop through the next 5 days (skipping today, which is index 0)
    for (let i = 1; i < 6 && i < time.length; i++) {
        const date = new Date(time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const { icon } = getWeatherInfoFromCode(weather_code[i]);
        const temp = Math.round(temperature_2m_max[i]);

        forecastHtml += `
            <div class="forecast-day">
                <div class="forecast-day-name">${dayName}</div>
                <span class="forecast-icon">${icon}</span>
                <div class="forecast-temp">${temp}°C</div>
            </div>
        `;
    }
    forecastInfo.innerHTML = forecastHtml;
}

function getWeatherInfoFromCode(code) {
    const weatherMap = {
        0: { icon: '☀️', description: 'Clear sky' },
        1: { icon: '🌤️', description: 'Mainly clear' },
        2: { icon: '⛅️', description: 'Partly cloudy' },
        3: { icon: '☁️', description: 'Overcast' },
        45: { icon: '🌫️', description: 'Fog' },
        48: { icon: '🌫️', description: 'Depositing rime fog' },
        51: { icon: '🌦️', description: 'Light drizzle' },
        53: { icon: '🌦️', description: 'Moderate drizzle' },
        55: { icon: '🌦️', description: 'Dense drizzle' },
        61: { icon: '🌧️', description: 'Slight rain' },
        63: { icon: '🌧️', description: 'Moderate rain' },
        65: { icon: '🌧️', description: 'Heavy rain' },
        80: { icon: '🌧️', description: 'Slight rain showers' },
        81: { icon: '🌧️', description: 'Moderate rain showers' },
        82: { icon: '🌧️', description: 'Violent rain showers' },
        95: { icon: '⛈️', description: 'Thunderstorm' },
    };
    return weatherMap[code] || { icon: '🤷', description: 'Unknown' };
}
