const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');




router.get('/', (req, res) => res.render('index', {
    users: db.get('users').value()
}));
router.get('/search', (req, res) => {
    let query = req.query.q;
    let matchedUsers = db.get('users').value().filter(user => user.name.indexOf(query) !== -1);
    res.render('index', {
        users: matchedUsers
    })
});
router.get('/add', (req, res) => res.render('add'));
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('view', {
        user
    })
});
router.post('/add', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});
module.exports = router;