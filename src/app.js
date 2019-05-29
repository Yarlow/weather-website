const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: "WOW! Now that's accurate weather*",
    name: "Jacob Shawver",
    Addition: "*May not be accurate"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "Aboot",
    name: "Jacob Shawver",
    FootDisclaimer: "**Not the only Jacob Shawver"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    message: "Yo watch out",
    name: "Jacob Shawver"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'No location is provided'
    })
  }
  geocode(req.query.address, (error, geoData) => {
    if (error) {
      return res.send({
        error: error
      })
    }

    forecast(geoData.lat, geoData.long, (error, forecastData, icon) => {
      if (error) {
        return res.send({
          error: error
        })
      }

      return res.send({
        location: geoData.name,
        forecast: `${forecastData.summary} It is currently ${forecastData.curTemp} degrees out. There is a ${forecastData.precip}% chance of rain`,
        wIcon: forecastData.icon

      })
    })
  })
})

app.get('help/*', (req, res) => {
  res.render('404', {
    error: "Help article",
    title: "404"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    error: "Page",
    title: "404"
  })
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
