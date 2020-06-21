const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

var todos = [
    { name: 'choi game' },
    { name: 'di lam' },
    { name: 'hoc tieng nhat' },
    { name: 'di ngu' }
]

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/todos', (req, res) => res.render('index', {
    todos
}));

app.get('/todos/search', (req, res) => {
    let query = req.query.q;
    console.log(query);
    let matchedTodos = todos.filter(todo => todo.name.indexOf(query) !== -1);
    res.render('index', {
        todos: matchedTodos
    })
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));