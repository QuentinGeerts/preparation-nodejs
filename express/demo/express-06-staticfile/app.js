const express = require('express');
const homeRouter = require('./routes/home-router')

// Création du serveur
const app = express();


// Pour gérer les formulaires "application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));

// Utilisation du moteur de vue 'EJS' 
// => Configure le fonctionnement de la méthode "res.render(...)"
app.set('view engine', 'ejs');
app.set('views', './views');

// Ajout du dossier public
app.use(express.static('public'));

// Ajout du systeme de route
app.use(homeRouter);

// Lancement du serveur
app.listen(8080, () => {
    console.log('Server up !');
});