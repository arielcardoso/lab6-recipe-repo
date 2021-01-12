const path = require('path');
const express = require('express');
const {v4:uuid} = require('uuid');
const methodOverride = require('method-override');

const app = express();

//Parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));

//Parse incoming JSON in POST request body:
app.use(express.json());

//To fake put/patch/delete requests:
app.use(methodOverride('_method'));

//View folder and EJS Setup
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//Fake database
let recipes = [
  {
    id: "5d712605475d213733780097",
    image: "https://images.unsplash.com/photo-1509482560494-4126f8225994?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=80",
    name: "Cinnamon pancakes caramelized",
    description: "It was a cold fall morning and I wanted some warm pancakes with warming spices. I got into my kitchen and created these delicious cinnamon pancakes with caramelized apples and a maple caramel almond butter drizzle.",
  },
  {
    id: "1d712605475d248586780097",
    image: "https://images.unsplash.com/photo-1587496578889-6b1dd67f4f06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    name: "Muffins with sweets berries",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias eos iusto numquam doloribus a, tempore aperiam sint maiores architecto doloremque at id obcaecati possimus facilis minus neque dignissimos? Quae, magni."
  },
  {
    id: "5d7fas605475d248586780097",
    image: "https://images.unsplash.com/photo-1580372648129-cb82ef5f1052?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=80",
    name: "Delicious Cheese Egg Burger",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A iure, cupiditate animi laudantium culpa dolorum consequuntur incidunt harum voluptatibus laborum nesciunt ut odio, dolores at distinctio saepe ipsa dicta qui."
  },
  {
    id: "10f7605475d248586780097",
    image: "https://images.unsplash.com/photo-1562166437-24ebf08f28be?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=80",
    name: "Raspberry Ice Cream",
    description: ""
  },
];

//List all recipes
app.get('/', (req, res) => {
    res.render('index', { recipes });
});

//New form
app.get('/recipe/new', (req, res) => {
    res.render('new');
});

//Create a new recipe
app.post('/recipe/new', (req, res) => {
    const { name, image, description } = req.body;
    recipes.push({ 
        id: uuid(),
        name,
        image,
        description
    });
    res.redirect('/');
});

//Show a recipe details
app.get('/recipe/:id', (req,res) =>{
    const { id } = req.params;
    const recipe = recipes.find(c => c.id === id);
    res.render('show', { recipe });
});

//Edit a recipe
app.get('/recipe/:id/edit', (req, res) => {
    const { id } = req.params;
    const recipe = recipes.find(c => c.id === id);
    res.render('edit', { recipe });
});

//Update a recipe
app.patch('/recipe/:id', (req,res) => {
    const { id } = req.params;
    const foundRecipe = recipes.find(c => c.id === id);

    //update recipe with req.body
    foundRecipe.name = req.body.name;
    foundRecipe.image = req.body.image;
    foundRecipe.description = req.body.description;

    //redirect to recipe info page
    res.redirect(`/recipe/${id}`);
});

//Delete a recipe
app.delete('/recipe/:id', (req,res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/recipes');
});

app.listen(5000, () => console.log('Server started on port 5000'));
