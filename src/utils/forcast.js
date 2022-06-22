const request = require("request");

const forcast = (latitude, longitutde, callback) => {

      const url = "http://api.weatherstack.com/current?access_key=52848188d348bb1ffd685c6538f17bff&query="+ latitude + "," + longitutde;
    
      request({url, json: true}, (error, {body}) => 
      {
          if(error)
          {
              callback("Unable to connect to weather services!", undefined);
          }
          else if(body.error)
          {
              callback("Unable to find location.", undefined);
          }
          else
          {
             callback(undefined, body.current.weather_descriptions[0] + ". it is currently " + body.current.temperature + " degree out. and it feels like " + body.current.feelslike + " degree out. and wind speed is " + body.current.wind_speed + ".");
          }
      })
}
module.exports = forcast;