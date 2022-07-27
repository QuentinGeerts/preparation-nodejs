const user = require('./modules/user')
const tweet = require('./modules/tweet')

const { connection } = require('./database/db')
const { stdin: input, stdout: output } = require('process')
const readline = require('readline')

const reader = readline.createInterface({ input, output })


reader.write('Gestion de la base de données :')
reader.write('\n\t1. Récupérer tous les utilisateurs')
reader.write('\n\t2. Insérer un utilisateur')
reader.write('\n\t3. Récupérer tous les tweets')
reader.write('\n\t4. Insérer un tweet')
reader.write('\n\t5. Récupérer le tweet d\'un utilisateur')
reader.write('\n\t6. Modifier le pseudo d\'un utilisateur')
reader.write('\n\t7. Modifier un tweet')
reader.write('\n')

const closeApp = () => {
  reader.write('\n\nAu revoir...')
  reader.close()

  if (connection) closeConnection()
}

const closeConnection = async () => {
  (await connection).end()
}

const displayTitle = (title) => {
  reader.write(`\n\n • ${title} • \n\n`)
}

reader.question('Que voulez-vous faire : ', (response) => {

  // reader.write('response :>> ', response)

  switch (response) {

    case '1':
      // > Récupérer tous les utilisateurs

      displayTitle("Récupérer tous les utilisateurs")

      user.getAllUsers()
        .then((users) => {

          if (users.length > 0) {
            reader.write("Liste des utilisateurs :")
            for (const user of users) {
              reader.write(`\n - ${user.user_id} ${user.pseudo}`)
            }
          }
          else {
            reader.write('Aucun utilisateur')
          }
        })
        .finally(() => { closeApp() })

      break

    case '2':
      // > Insérer un utilisateur

      displayTitle("Insérer un utilisateur")

      reader.question('Entrez le pseudo de l\'utilisateur :  ', (answer) => {

        user.createUser(answer)
          .then(() => {
            reader.write("Utilisateur inséré")
          })
          .finally(() => { closeApp() })

      })

      break

    case '3':
      // > Récupérer tous les tweets

      displayTitle("Récupérer tous les tweets")

      tweet.getAllTweets()
        .then((tweets) => {

          if (tweets.length > 0) {

            for (const tweet of tweets) {
              reader.write(`\nTweet n°${tweet.tweet_id} de ${tweet.pseudo}`)
              reader.write(`\n"${tweet.message}"`)
              reader.write(`\n`)
            }

          }
          else {
            reader.write('Aucun tweet trouvé.')
          }

        })
        .finally(() => { closeApp() })


      break

    case '4':
      // > Insérer un tweet

      displayTitle("Insérer un tweet")

      reader.question("Entrez votre id : ", (userId) => {

        user.getUserById(userId)
          .then((users) => {

            // console.log('users :>> ', users);

            if (users.length === 1) {
              reader.question("Entrez votre message : ", (message) => {

                tweet.createTweet(message, userId)
                  .then((data) => {

                    if (data && data.affectedRows === 1) reader.write("Tweet inséré avec succès.")
                    else reader.write("Tweet non inséré")

                  })
                  .finally(() => { closeApp() })
              })
            }
            else {
              reader.write("Aucun utilisateur trouvé")
              closeApp()
            }

          })

      })

      break

    case '5':
      // > Récupérer le tweet d'un utilisateur

      displayTitle("Récupérer le tweet d'un utilisateur")

      reader.question("Entrez l'id de l'utilisateur : ", (userId) => {

        tweet.getTweetsByUserId(userId)
          .then((tweets) => {

            if (tweets.length > 0) {

              for (const tweet of tweets) {
                reader.write(`\nTweet n°${tweet.tweet_id} de ${tweet.pseudo}`)
                reader.write(`\n"${tweet.message}"`)
                reader.write(`\n`)
              }

            }
            else {
              reader.write('Aucun tweet trouvé.')
            }

          })
          .finally(() => { closeApp() })

      })

      break

    case '6':
      // > Modifier le pseudo d'un utilisateur

      reader.question("Entrez l'id de l'utilisateur à modifier : ", (userId) => {

        // Vérification si le user existe
        user.getUserById(userId)
          .then((users) => {
            if (users.length === 1) {
              // User existe

              reader.question(`Entrez le nouveau pseudo (${users[0].pseudo}) : `, (pseudo) => {

                user.updateUser(userId, pseudo)
                  .then(() => {
                    console.log("Pseudo changé")
                  })
                  .finally(() => { closeApp() })

              })

            }
            else {
              // User n'existe pas
              reader.write("L'id n'existe pas.")
              closeApp()
            }
          })

      })

      break

    case '7':
      // > Modifier un tweet

      reader.question(`Entrez l'id d'un tweet à modifier : `, (tweetId) => {

        tweet.getTweetById(tweetId)
          .then((tweets) => {

            if (tweets.length === 1) {
              // Tweet trouvé

              reader.question(`Entrez le nouveau message du tweet : `, (message) => {

                tweet.updateTweet(tweetId, message)
                  .then((res) => {
                    reader.write("Tweet modifié.")
                  })
                  .finally(() => closeApp())

              })

            }
            else {
              // Tweet pas trouvé
              closeApp()
            }

          })

      })



      break

    default:
      reader.write('Erreur de saisie !')
      closeApp()
  }

})
