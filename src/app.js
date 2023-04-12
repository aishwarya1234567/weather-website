const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT
const app = express()

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicPath))
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Aishwarya'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About',
        name : 'Aishwarya'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Aishwarya'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address
    if(!address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address, (error, {longitude, latitude, location} = {})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, {forecastData})=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                location,
                forecastData
            })
        })
    })
})

app.get('/location', (req, res)=>{
    const longitude = req.query.longitude
    const latitude = req.query.latitude
    
    forecast(longitude, latitude, (error, {location, forecastData})=>{
        if(error)
        {
            return res.send({error})
        }
        res.send({
            location,
            forecastData
        })
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title : '404',
        name : 'Aishwarya',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log(`Service is running at port ${port}`)
})