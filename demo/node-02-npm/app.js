const axios = require('axios')

const URL_METEO = "http://api.openweathermap.org/data/2.5/weather?q=__city__&&appid=2a60edfacc3acc1bde7d263a79cb5e5d&units=metric&lang=fr"


// Ecriture dans la console (Alternative => console.log(...))
process.stdout.write('Entrez une ville : ')
// On écoute les events du clavier
process.stdin.on('readable', () => {

  // On lit la saisie de l'utilisateur
  const buffer = process.stdin.read()
  const city = buffer.toString('utf8').trim()

  console.log(`Buffer : "${buffer}"`)
  console.log(`City : "${city}"`)

  const url = URL_METEO.replace('__city__', city)

  axios.get(url).then(({ data }) => {

    console.log(data)

    const temp = data.main.temp
    const desc = data.weather[0].description
    const loc = `${data.name} ${data.sys.country}`

    console.log(`Météo de ${loc}`)
    console.log(`${temp}°c  ${desc}`)

  }).catch((err) => {

    console.log(err)

    const { status, statusText } = err.response
    console.log(`${status} - ${statusText}`)

  })

})