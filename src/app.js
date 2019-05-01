const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

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

app.get('', (req, res) => {
    res.render('index', { title: 'Weather app', text: 'Home Page'})
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About me', text: 'About page' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', text: 'help page' })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'You musst provide a Address' });
    } else {
        res.send({
            forecase: 'This is the forecast',
            location: req.query.address
        });
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', { title: 'Weather Application', errorText: 'Help page not found' });
})

app.get('*', (req, res) => {
    res.render('404', { title: 'Weather Application', errorText: 'My 404 Page' });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});