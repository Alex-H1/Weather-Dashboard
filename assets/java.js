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



// var weather = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.2827525&lon=-120.6596156&unitsimperial&exclude=hourly,daily&appid=774227cba4191819abc929f4c68a7098';{
//     var units='imperial';
// }
// fetch(weather)
// .then(response =>{
//     return response.json();
// })
// .then(data=>{
   
// })

// var cityCordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=San Luis Obispo=&limit=5&appid=774227cba4191819abc929f4c68a7098'
// fetch(cityCordinates)
// .then(location =>{
//     return location.json();
// })
// .then(city =>{
// })

// function getCity(){
//     var cityName = searchEl.val
// }






function getLocation(event){
    event.preventDefault();    
    city = $('#search').val().trim();
    if(city){
        // put city in api endpoint
        getWeather(city);
        // append content

        // repoContainerEl.textContent = '';
        // nameInputEl.value = '';
    }else{
        console.log('no city')
    }
};

function getWeather(city){

    // var weather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=774227cba4191819abc929f4c68a7098';
    var weather ='http://api.openweathermap.org/geo/1.0/direct?q=' +  city + '&limit=5&appid=774227cba4191819abc929f4c68a7098'
    fetch(weather)

    .then(response =>{
        if(response.ok){
            response.json().then(data =>{
                console.log(data);
                // display weather
            });
        }
    })
    .catch(error =>{
        console.log(error)
    })
}
$('#btn').on('click',getLocation);