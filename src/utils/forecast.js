const request = require('postman-request');
const forecast = (lati,longi,callback)=>{
    var url = "http://api.weatherstack.com/current?access_key=1f8f472ba2bf8e02518601c62a105d85&query="+lati+","+longi;

    request({url,json:true}, (error,{body}={}) => {
        if(error){
            callback("Could connect to weather service");
        }
        else if(body.error){
            callback(body.error);
        }
        else{
            const currentWeather = body.current;
            callback(undefined,{
                temperature:currentWeather.temperature,
                feelslike:currentWeather.feelslike,
                precip: currentWeather.precip
            })
        }
        
    });
}

module.exports=forecast

// forecast(13.65,78.9333,(error,data)=>{
//     console.log('Error',error)
//     console.log('data',data)
// })
