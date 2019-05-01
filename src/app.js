const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

/** paths for express and hbs config */
const viewsPath = path.join(__dirname, '../templates/views');
const dirPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

/** dynamic templating - setup hbs */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

/** static pages served through express */
app.use(express.static(dirPath))

/** Home page */
app.get('', (req, res) => {
    res.render('index', { title: 'Weather app', text: 'Home Page'})
})

/** About page */
app.get('/about', (req, res) => {
    res.render('about', { title: 'About', text: 'This page was created by Harisudhan. It uses data from mapbox.com and darksky.net!' })
})

/** Help Page */
app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', text: 'help page' })
})

/** Give address and get back the forecast */
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'You must provide a Address' });
    } else {
        geocode.getGeoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
            if (err) res.send({ error: err });
            else 
            forecast.getForeCast(latitude, longitude, (err, response) => {
                if (err) res.send({ error: err });
                else
                res.send({ forecast: response, location, address: req.query.address });
            })
        })
    }
})

/** 404 - 1 */
app.get('/help/*', (req, res) => {
    res.render('404', { title: 'Weather Application', errorText: 'Help page not found' });
})

/** 404 - 2 */
app.get('*', (req, res) => {
    res.render('404', { title: 'Weather Application', errorText: 'My 404 Page' });
});

/** serve up */
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});