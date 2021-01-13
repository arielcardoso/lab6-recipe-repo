const express = require('express');
const router = express.Router();

const recipeController = require('../controller/recipes.controller');

//Get ALL recipes /recipes/
router.get('/', recipeController.getAllRecipes);

//Create a recipe /recipes/new
router.get('/new', recipeController.createRecipeForm);
router.post('/new', recipeController.createRecipe);

//Update a recipe /recipes/edit/:id
router.get('/edit/:id', recipeController.editRecipeForm);
router.put('/edit/:id', recipeController.editRecipe);

//Delete a recipe /recipes/delete/:id
router.delete('/delete/:id', recipeController.deleteRecipe);

//Get ONE recipe
router.get('/:id', recipeController.getOneRecipe);

module.exports = router;