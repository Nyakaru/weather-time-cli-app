const axios = require('axios')
const { DateTime } = require('luxon')
require('dotenv').config()

const darkSkyApiKey = process.env.DARK_SKY_API_KEY
const gcpKey = process.env.GCP_KEY

const darkSkyBaseUrl = `https://api.darksky.net/forecast`
const address = process.argv.slice(2)

address.map(item => {
  const gcpUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + item + '&key=' + gcpKey

  axios
    .get(gcpUrl)
    .then(res => {
      const latitude = res.data.results[0].geometry.location.lat
      const longitude = res.data.results[0].geometry.location.lng
      const city = res.data.results[0].formatted_address
      const location = latitude + ',' + longitude
      const darkSkyUrl = `${darkSkyBaseUrl}/${darkSkyApiKey}/${location}`

      axios
        .get(darkSkyUrl)
        .then(res => {
          const time = res.data.currently.time
          const formattedTime = DateTime.fromSeconds(time)
            .setZone(res.data.timezone)
            .toFormat('DDDD t')
          const temperature = res.data.currently.temperature
          console.log('It is', temperature, 'Fahrenheit (°F)', 'and', formattedTime, 'O`clock in', city)
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
})
