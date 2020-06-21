const express = require('express');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users.route'); 
const app = express();
const port = 3000;

app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Hello World111!'));

app.use('/users', usersRoute);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));