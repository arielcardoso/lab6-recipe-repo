const {v4:uuid} = require('uuid');
let recipes = require('../model/recipes.model');

exports.getAllRecipes = (req, res) => {
  //res.json(recipes);
  res.render('index', {'recipes': recipes});
}

exports.getOneRecipe = (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find(c => c.id == id);

  if (recipe) {
    res.render('show', {recipe});
  } else {
    res.status(400).json({ msg: `No recipe with the id of ${req.params.id} found`});
  }
}

exports.createRecipeForm = (req, res) => {
  res.render('new', {});
}

exports.createRecipe = (req, res) => {
  const { name, image, description } = req.body;
  const newRecipe = {
    id: uuid(),
    name,
    image,
    description
  }
  recipes.push(newRecipe);
  res.redirect('/');
}

exports.editRecipeForm = (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find(c => c.id == id);
  
  if (recipe) {
    res.render('edit', {recipe});
  } else {
    res.status(400).json({ msg: `No recipe with the id of ${req.params.id} found`});
  }
}

exports.editRecipe = (req, res) => {
  const { id } = req.params;
  let recipe = recipes.find(c => c.id == id);

  if (recipe) {
    recipe.name = req.body.name;
    recipe.image = req.body.image;
    recipe.description = req.body.description;

    res.redirect(`/recipes/${id}`);
    //res.json({ msg: 'Recipe updated', updatedRecipe})
  } else {
    res.status(400).json({ msg: `Unable to update. Recipe of id ${req.params.id} does not exist.`});
  }
}

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;
  let recipe = recipes.find(c => c.id == id);

  if (recipe) {
    recipes = recipes.filter(c => c.id !== recipe.id);
    res.redirect('/recipes');

    // res.json({
    //   msg: 'Recipe deleted successfully!',
    //   recipe: recipes.filter(recipe => recipe.id !== req.params.id)
    // })

  } else {
    res.status(400).json({ msg: `No recipe with the id of ${id} found`});
  }
}