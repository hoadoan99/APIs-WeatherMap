const express = require("express");
const port = 3000;
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req, res)=>{
  res.sendFile('index.html', { root: __dirname })

});
app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "f15b77542ca5f55188464ab766324dcc";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",uk&appid=" + apiKey + "";
  https.get(url, function(response){
      console.log(response.statusCode);

      response.on('data', (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imagesUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently" + weatherDescription +"</p>");
        res.write("<h1>The temperature in " + query + " is" + temp + "degrees Celcius.</h1>");
        res.write("<img src=" + imagesUrl +">");
        res.send()
      })
  });

});






app.listen(port);
