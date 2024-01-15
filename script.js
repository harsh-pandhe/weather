const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'YOUR API KEY',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

let mumbai = document.getElementById('mumbai');
let pune = document.getElementById('pune');
let solapur = document.getElementById('solapur');
let submit = document.getElementById('submit');

const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
};

const getWindDirectionSymbol = (degrees) => {
    const directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
};

const getCityName = (latitude, longitude) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const address = data.address;
            const city = address.city || address.town || address.village || address.hamlet;

            if (city) {
                getWeather(city);
            } else {
                console.error('City name not found.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
};

const getMyLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            getCityName(latitude, longitude);
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("User denied the request for Geolocation.");
                    var errorMessage = "Location access is required for certain features. Please enable geolocation in your browser settings.";
                    alert(errorMessage);
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.error("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.error("An unknown error occurred.");
                    break;
            }
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

const getWeather = (city) => {
    cityName.innerHTML = city;
    fetch(url + city, options)
        .then(response => response.json())
        .then((response) => {
            temp.innerHTML = response.temp;
            cloud_pct.innerHTML = response.cloud_pct;
            feels_like.innerHTML = response.feels_like;
            humidity.innerHTML = response.humidity;
            min_temp.innerHTML = response.min_temp;
            max_temp.innerHTML = response.max_temp;
            wind_speed.innerHTML = response.wind_speed;
            wind_degrees.innerHTML = getWindDirectionSymbol(response.wind_degrees);
            sunrise.innerHTML = formatTime(response.sunrise);
            sunset.innerHTML = formatTime(response.sunset);
        })
        .catch(error => console.error(error));
}


getMyLocation();

submit.addEventListener(('click'), function (e) {
    e.preventDefault();
    getWeather(city.value);
});

mumbai.addEventListener('click', function (e) {
    e.preventDefault();
    getWeather(mumbai.innerHTML);
});

pune.addEventListener('click', function (e) {
    e.preventDefault();
    getWeather(pune.innerHTML);
});

solapur.addEventListener('click', function (e) {
    e.preventDefault();
    getWeather(solapur.innerHTML);
});


