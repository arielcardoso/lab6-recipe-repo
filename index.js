const path = require('path');
const express = require('express');
const methodOverride = require('method-override');

//Routes
const recipeRoute = require('./routes/recipes.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//To fake put/patch/delete requests:
app.use(methodOverride('_method'));

//View folder and EJS Setup
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//Redirect home route
app.get('/', (req, res) => {
    res.redirect('/recipes');
});

//Recipes routes
app.use('/recipes', recipeRoute);

app.listen(5000, () => console.log('Server started on port 5000'));