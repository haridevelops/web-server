const express = require('express');
const path = require('path');

const app = express()

/** paths for express and hbs config */
const viewsPath = path.join(__dirname, '../templates');
const dirPath = path.join(__dirname, '../public');

/** dynamic templating - setup hbs */
app.set('view engine', 'hbs');
app.set('views', viewsPath);

/** static pages served through express */
app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather app'})
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Weather about' })
})

app.get('/help', (req, res) => {
    res.render('help', { help: 'help page' })
})

app.get('/weather', (req, res) => {
    res.send({
        forecase: 'This is the forecast',
        location: 'chennai'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});