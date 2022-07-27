const qs = require('querystring')

module.exports = (request, limit= 1e6) => {

  return new Promise((resolve, reject) => {

    if (request != null) {

      let recupData = ""

      request.on('data', data => {
        recupData += data

        if (recupData.length > limit) {
          request.connection.destroy()
          reject('Flood Attack')
        }
        
      })
      request.on('end', () => {
        try {
          const dataPost = qs.parse(recupData)
          resolve(dataPost)
        } catch (error) {
          reject('Parse Error')
        }
      })

    }
    else {
      reject("Request is null")
    }

  })

}