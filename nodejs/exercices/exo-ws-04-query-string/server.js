const http = require("http")
const fs = require("fs")
const qs = require("querystring")
const { URLSearchParams } = require("url")

const server = http.createServer((request, response) => {

    console.log(`(${request.method}) "${request.url}"`)

    // Gérer la demmande du favicon.ico
    if (request.url === "/favicon.ico") {
        const pathFavicon = __dirname + "/public/favicon.ico"

        // console.log('pathFavicon :>> ', pathFavicon);

        const icon = fs.readFileSync(pathFavicon)
        response.writeHead(200, { "Content-Type": "image/x-icon" })
        response.end(icon, "binary")
        return
    }

    // Template de base de la page
    const page = `<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Exercice formulaire</title>
    </head>
    <body>
        __body__
    </body>
    </html>`

    if (request.method === "GET") {
        // Création du formulaire
        const formulaire = page.replace("__body__",
            `<h1>Formulaire</h1>
        <form action="/" method="POST">
            <label>
                Prenom : <input type="text" name="firstname" />
            </label>
            <br/>
            <label>
                Nom : <input type="text" name="lastname" />
            </label>
            <br/>
            <label>
                Date de naissance :<input type="date" name="birthdate" />
            </label>
            <br/>
            <label>
                Femme <input type="radio" name="sex" value="F" />
            <label>
                Homme <input type="radio" name="sex" value="M" />
            </label>
            <br/>
            <input type="submit" value="Envoyé" />
        </form>`)

        response.writeHead(200, {
            "Content-Type": "text/html",
            "Content-length": Buffer.byteLength(formulaire)
        })
        response.end(formulaire)
    }
    else if (request.method === "POST") {
        // Récupérer les données à traiter
        let body = ""
        request.on("data", data => {

            body += data

            // Prevent Flood attack
            if (body.length > 1e6) {
                // request.connection.destroy();
                request.socket.destroy()
            }
        })

        // Traiter les données reçues
        request.on("end", () => {
            // const postData = qs.parse(body)

            const postDataObject = new URLSearchParams(body)

            const postData = Object.fromEntries(postDataObject)

            

            console.log('postData :>> ', postData)

            const { firstname, lastname, sex } = postData
            const birthdate = new Date(postData.birthdate)
            const today = new Date()


            let age = today.getFullYear() - birthdate.getFullYear()
            if (today.getMonth() < birthdate.getMonth
                || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
                age--
            }

            const result = page.replace("__body__",
                `<h1>Réponse !</h1>
            <h3>${sex == 'M' ? 'Mr.' : 'Mme'} ${firstname} ${lastname} à ${age} ans!</h3>
            `)

            response.writeHead(200, {
                "Content-Type": "text/html",
                "Content-length": Buffer.byteLength(result)
            })
            response.end(result)
        })
    }
})

server.listen(8088, () => {
    console.log("Server is running on 127.0.0.1:8088")
})