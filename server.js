const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const res = require('express/lib/response')
const app = express()
const axios = require('axios')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/',(req, res)=>{
    res.render('weather.ejs',{
        title:'The temperature around you'
    })
    
})
app.post('/',async (req, res)=>{
    let city = req.body.data
    city = city.charAt(0).toUpperCase() + city.slice(1)
    console.log(city)
    const result = await axios.get(`http://api.weatherapi.com/v1/current.json?key=ba8528acc979495283324538221105&q=${city}&aqi=no`)
    
    res.render('data.ejs',{weatherData: JSON.stringify(result.data)})
})

app.listen(3000,()=>{
    console.log('The app is running on port 3000')
})

