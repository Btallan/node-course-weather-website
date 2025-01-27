const path = require('path')
const express = require('express')
const hbs = require('hbs')
const  get  = require('http')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE & VIEWS LOCATION
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// SET UP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Benjamin Allan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Benjamin Allan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Benjamin Allan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided!'
        })
    } 
    
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

            
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query)
    
    res.send({
        products: []
    })
})

// 404 ERROR PAGES & ROUTES
app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Benjamin Allan'
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Benjamin Allan'
    })
})



// APP IS LISTENING 
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})