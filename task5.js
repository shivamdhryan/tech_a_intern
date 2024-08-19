document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4cd4eeebfd50ad6b4d7016187f403262'; // Replace with your OpenWeatherMap API key
    const getWeatherButton = document.getElementById('getWeatherButton');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const cityName = document.getElementById('cityName');
    const weatherDescription = document.getElementById('weatherDescription');
    const temperature = document.getElementById('temperature');

    getWeatherButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeatherButton.click();
        }
    });

    async function getWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (data.cod === 200) {
                updateWeatherInfo(data);
            } else {
                alert('City not found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function updateWeatherInfo(data) {
        cityName.textContent = data.name;
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;

        weatherInfo.style.display = 'block';
    }
});
