const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/19b60cc5e5038797653ac16e36225ee8/' + lat + ','+ long

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('error', undefined)
    } else if (body.error) {
      callback(error , undefined)
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        curTemp: body.currently.temperature,
        precip: body.currently.precipProbability,
        icon: body.currently.icon
      })

    }
  })
}

module.exports = forecast
