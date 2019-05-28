const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const pic = document.querySelector("#icon")

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  msg1.textContent = 'Loading'
  msg2.textContent = ''
  msg3.textContent = ''

  fetch('/weather?address=' + location)
    .then((response) => {
      response.json().then((data) => {
        if (data.error){
          msg1.textContent = data.error
          msg1.textContent = ''

        } else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
            msg3.textContent = data.wIcon
            if (data.wIcon === "clear-day") {
              pic.src = "../img/sun.png"
            } else if (data.wIcon === "clear-night") {
              pic.src = "../img/moon.png"
            } else if (data.wIcon === "rain") {
              pic.src = "../img/water.png"
            } else if ((data.wIcon === "snow") || (data.wIcon === "sleet")) {
              pic.src = "../img/snowflake.png"
            } else if ((data.wIcon === "fog") || (data.wIcon === "cloudy")) {
              pic.src = "../img/cloud.png"
            } else if (data.wIcon === "wind") {
              pic.src = "../img/wind.png"
            } else{
              pic.src = "../img/partly-cloudy.png"
            }

          }
        })
    })
})
