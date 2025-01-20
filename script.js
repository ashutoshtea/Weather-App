const apiKey = '9e045cdbb6c042138f694547252001';
const apiUrl = 'http://api.weatherapi.com/v1/current.json';

function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) {
        document.getElementById('error').innerText = 'Please enter a city.';
        return;
    }
    
    const url = `${apiUrl}?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('error').innerText = data.error.message;
                clearWeatherInfo();
            } else {
                displayWeatherInfo(data);
                document.getElementById('error').innerText = '';
            }
        })
        .catch(() => {
            document.getElementById('error').innerText = 'Error fetching weather data.';
            clearWeatherInfo();
        });
}

function displayWeatherInfo(data) {
    const cityName = data.location.name;
    const temperature = `${data.current.temp_c}°C`;
    const condition = data.current.condition.text;
    const airQuality = `Air Quality: ${data.current.air_quality.pm10}`;

    document.getElementById('city-name').innerText = cityName;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('condition').innerText = condition;
    document.getElementById('air-quality').innerText = airQuality;
}

function clearWeatherInfo() {
    document.getElementById('city-name').innerText = '';
    document.getElementById('temperature').innerText = '';
    document.getElementById('condition').innerText = '';
    document.getElementById('air-quality').innerText = '';
}
