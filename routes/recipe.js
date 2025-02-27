import express from 'express';
import { createRecipe, editRecipe, getAllRecipe, getRecipe, saveRecipe,getAllSavedRecipe } from '../controllers/recipe.js';
import protectRoute from './../middleware/protectRoute.js';




const recipeRoute = express.Router();


recipeRoute.post("/createrecipe",protectRoute,createRecipe);
recipeRoute.get("/allrecipe",protectRoute,getAllRecipe);
recipeRoute.get('/singlerecipe/:id',protectRoute,getRecipe);
recipeRoute.put('/editrecipe/:id',protectRoute,editRecipe);
recipeRoute.put('/saverecipe/:id',protectRoute,saveRecipe);
recipeRoute.get("/savedrecipes",protectRoute,getAllSavedRecipe);



export default recipeRoute;