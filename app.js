/* const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('ContentType', 'text/html');
    res.write('<html>');
    res.write('<head><title>Team Activity Page</title></head>');
    res.write('<body><h1>Welcome!</h1></body>');
    res.write('</html>');
    return res.end();
});

server.listen(5000); */

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express'); //USe express npm package
const expressHbs = require('express-handlebars');

const app = express(); //Use an object to access express functions

/* app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
})); */
app.set('view engine', 'ejs'); //create view engine using ejs

//app.set('view engine', 'pug'); //For pug use
app.set('views', 'views'); //Tell ejs where to find our views.

const adminData = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: '',
    });
});
app.listen(3000);