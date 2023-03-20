const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')
const API = `https://weatherapi-com.p.rapidapi.com/current.json?q=`

search.addEventListener('click', () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '747be6c6e0msh7e2183218542cbbp1e4682jsncb33cbcc42c3',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  }
  const query = document.querySelector('.search-box input').value

  if (query === '') {
    return
  }

  fetch(`${API}${query}`, options)
    .then((response) => response.json())
    .then((json) => {
      const errorCode = Object.values(json)[0].code
      if (errorCode === 1006) {
        console.log('Error 404')
        container.style.height = '500px'
        weatherBox.style.display = 'none'
        weatherDetails.style.display = 'none'
        error404.style.display = 'block'
        error404.classList.add('fadeIn')
        return
      }
      console.log(json)
      container.style.height = '400px'
      error404.style.display = 'none'
      error404.classList.remove('fadeIn')

      const image = document.querySelector('.weather-box img')
      const temperature = document.querySelector('.weather-box .temperature')
      const description = document.querySelector('.weather-box .description')
      const humidity = document.querySelector('.weather-details .humidity span')
      const wind = document.querySelector('.weather-details .wind span')

      const currentIcon = json.current.condition.icon
      const modifiedIcon = currentIcon.replace('64x64', '128x128')
      image.src = modifiedIcon

      temperature.innerHTML = `${json.current.temp_c}<span>°C</span>`
      description.innerHTML = json.current.condition.text
      humidity.innerHTML = `${json.current.humidity}%`
      wind.innerHTML = `${json.current.wind_kph}Km/h`

      weatherBox.style.display = ''
      weatherDetails.style.display = ''
      weatherBox.classList.add('fadeIn')
      weatherDetails.classList.add('fadeIn')
      container.style.height = '590px'
    })
    .catch((err) => console.log(err))
})
