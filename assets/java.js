// make a search bar
//  when user clicks search bar and searches for city.
// city is added to search history
// then the current weather data shows up
// when viewing the weather data the user sees the city name,  the date and an icon that represents the weather conditions as well as temperature, humidity the wind speed and uv index.
// when viewing uv index there is a condition indicator 
// when viewing the weather the is a five day forcast there is a date a icon of weather conditions the temperature and humidity.
var searchEl = $('#search');
var citySubmit = $('#getCity');
var btnEl=$('#btn');
var titleEl = $('#dailyWeather');
var localTempEl = $('#localTemp');
var humidityEL = $('#humidity');
var windSpeedEl = $('#windSpeed');
var uviEl = $('#uvi');
var dayTwoEl = $('.dayTwo');
var dayThreeEl =$('.dayThree');
var dayFourEl =$('.dayFour');
var dayFiveEl =$('.dayFive')
var daySixEl =$('.daySix');
var searchLog = [];
var cityName;
var humidity;
var windSpeed;
var temp;

function getLocation(event){
    event.preventDefault();    
    city = $('#search').val().trim();
    saveSearch(city);
    // searchPush(storedSearch);
    if(city){
        // put city in api endpoint
        getWeather(city);
       
    }else{
        console.log('no city');
    }


};

function getUviforecast(lat,lon){
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon='+ lon + '&exclude=hourly,minutely,alert&units=imperial&appid=774227cba4191819abc929f4c68a7098';
    fetch(url).then(response=>{
        if(response.ok){
            response.json().then(data=>{
                var uviEl = document.getElementById('uvi');
                uviEl.textContent = 'uvi  ' + data.current.uvi; 


                getFiveDay(data);
            })
        }
    })
}

function getWeather(city){

    var weather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=774227cba4191819abc929f4c68a7098';
    fetch(weather)

    .then(response =>{
        if(response.ok){
            response.json().then(data =>{
                weatherData = data;
                temp = weatherData.main.temp;
                humidity = weatherData.main.humidity;
                windSpeed = weatherData.wind.speed;
                cityName = weatherData.name;
                getUviforecast(weatherData.coord.lat, weatherData.coord.lon);
               
                cityDisplay(weatherData);

            });

        }
    })
}

function cityDisplay(weatherData){
    var unixTime = moment.unix(weatherData.dt).format('MM/DD/YYYY');

    // displays city name
    var cityTitle = document.createElement('h1');
    cityTitle.textContent = cityName +' '+ unixTime;


    titleEl.append(cityTitle);

    // displays local temp
    var displayTemp = document.createElement('p');
    displayTemp.textContent = 'temperature  ' + temp;

    localTempEl.append(displayTemp);

    // display local humidity
    var localHumidity = document.createElement('p');
    localHumidity.textContent = 'humidity  ' + humidity;
    
    humidityEL.append(localHumidity);

    // display wind speed
    var localWind = document.createElement('p');
    localWind.textContent = 'Wind Speed  ' + windSpeed;

    windSpeedEl.append(localWind);
};

function getFiveDay(data){
    // day 2 date 
    var day2Date = document.createElement('p');
    day2Date.textContent = moment.unix(data.daily[0].dt).format('MM/DD/YYYY')
    dayTwoEl.append(day2Date);
    // day 2 temp
    var day2 = document.createElement('p');
    day2.textContent = 'temp:'+' '+ data.daily[0].temp.day;
    dayTwoEl.append(day2);
    // day 2 humidity
    var day2Humidity = document.createElement('p');
    day2Humidity.textContent = 'humidity:'+' ' + data.daily[0].humidity;
    dayTwoEl.append(day2Humidity)
   
    // day three
  
    var day3Date = document.createElement('p');
    day3Date.textContent = moment.unix(data.daily[1].dt).format('MM/DD/YYYY')
    dayThreeEl.append(day3Date);

    var day3 = document.createElement('p');
    day3.textContent = 'temp:'+' '+ data.daily[1].temp.day;
    dayThreeEl.append(day3);
    
    var day3Humidity = document.createElement('p');
    day3Humidity.textContent = 'humidity:'+' ' + data.daily[1].humidity;
    dayThreeEl.append(day3Humidity)

    // day four
    var day4Date = document.createElement('p');
    day4Date.textContent = moment.unix(data.daily[2].dt).format('MM/DD/YYYY')
    dayFourEl.append(day4Date);

    var day4 = document.createElement('p');
    day4.textContent = 'temp:'+' '+ data.daily[2].temp.day;
    dayFourEl.append(day4);
    
    var day4Humidity = document.createElement('p');
    day4Humidity.textContent = 'humidity:'+' ' + data.daily[2].humidity;
    dayFourEl.append(day4Humidity)

    // day five

    var day5Date = document.createElement('p');
    day5Date.textContent = moment.unix(data.daily[3].dt).format('MM/DD/YYYY')
    dayFiveEl.append(day5Date);

    var day5 = document.createElement('p');
    day5.textContent = 'temp:'+' '+ data.daily[3].temp.day;
    dayFiveEl.append(day5);
    
    var day5Humidity = document.createElement('p');
    day5Humidity.textContent = 'humidity:'+' ' + data.daily[3].humidity;
    dayFiveEl.append(day5Humidity)

    // day six

    var day6Date = document.createElement('p');
    day6Date.textContent = moment.unix(data.daily[4].dt).format('MM/DD/YYYY')
    daySixEl.append(day6Date);

    var day6 = document.createElement('p');
    day6.textContent = 'temp:'+' '+ data.daily[4].temp.day;
    daySixEl.append(day6);
    
    var day6Humidity = document.createElement('p');
    day6Humidity.textContent = 'humidity:'+' ' + data.daily[4].humidity;
    daySixEl.append(day6Humidity)


};

function saveSearch(city){
    searchLog.push(city);
   localStorage.setItem("searchlog", JSON.stringify(searchLog));
   var storedSearch = JSON.parse(localStorage.getItem(searchLog));
   searchPush(storedSearch);
};

function searchPush(storedSearch){
    for(var i=0 ; i<searchLog.length[i]; i++){
        var searchButton = document.createElement('button');
        searchButton.textContent = storedSearch;
        console.log(storedSearch);
    };
}

$('#btn').on('click',getLocation);