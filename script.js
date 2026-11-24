
const apiKey = "79687968dfeca09d01fc142da61dffcab594";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const message = document.getElementById("message");
const weather = document.getElementById("weather");

async function getWeather() {

    // Get city name
    const city = cityInput.value.trim();

    // Check empty input
    if (city === "") {
        message.innerText = "Please enter city name.";
        weather.classList.add("hidden");
        return;
    }

    // API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city + ",IN")}&appid=${apiKey}&units=metric`;

    try {

        // Show loading message
        message.innerText = "Loading...";
        weather.classList.add("hidden");

        // Fetch weather data
        const response = await fetch(url);

        // Check response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Unable to get weather data.");
        }

        // Convert response to JSON
        const data = await response.json();

        // Display city name
        document.getElementById("cityName").innerText =
            data.name;

        // Display temperature
        document.getElementById("temperature").innerText =
            data.main.temp + " °C";

        // Display weather description
        document.getElementById("description").innerText =
            data.weather[0].description;

        // Display humidity
        document.getElementById("humidity").innerText =
            "Humidity: " + data.main.humidity + "%";

        // Display wind speed
        document.getElementById("wind").innerText =
            "Wind Speed: " + data.wind.speed + " m/s";

        // Display weather icon
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Show weather information
        weather.classList.remove("hidden");

        // Clear message
        message.innerText = "";

    } catch (error) {

        // Hide weather information
        weather.classList.add("hidden");

        // Show actual error
        console.log("Weather Error:", error.message);

        message.innerText =
            "Error: " + error.message;
    }
}

// Search button click event
searchBtn.addEventListener("click", getWeather);

// Enter key support
cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
