import {recipe} from '../models/recipe.js'
import { user } from '../models/user.js';


export const createRecipe = async(req,res)=>{
    try{
            const { recipeName, time, instructions, ingredients, recipeImg } = req.body;
            if( !recipeName || !time || !instructions || !ingredients || !recipeImg){
                return res.status(400).json({msg:"all fields are required!"});
            }
    
            const newRecipe = await recipe.create({
                username:req.user._id,
                recipeName,
                time,
                instructions,
                ingredients,
                recipeImg
            })
            return res.status(201).json({msg:"recipe created",newRecipe})
    }
    catch(err){
        console.log(err);

        return res.status(500).json({msg:"internal server error"});
    }
}

export const getAllRecipe = async(req,res)=>{
    try{
        const allRecipes = await recipe.find({});

        if(allRecipes.length<1){
            return res.status(400).json({msg:"no recipe found! create One"})
        }
        return res.status(200).json({allRecipes:allRecipes})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"internal server error"});
    }
}


export const getRecipe = async(req,res)=>{
    try{
            const recipeId = req.params.id;

            const singleRecipe = await recipe.findById(recipeId);
            if(!singleRecipe){
                return res.status(400).json({msg:"no recipe found!"})
            }

            return res.status(200).json({singleRecipe:singleRecipe});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg:"internal server error"});
    }
}



export const editRecipe = async(req,res)=>{
    try{
            const recipeId = req.params.id;
            const userId = req.user._id;
            const { recipeName, time, instructions, ingredients, recipeImg } = req.body;

            const recipeToBeEdited = await recipe.findById(recipeId);
            if(!recipeToBeEdited){
                return res.status(400).json({msg:"no recipe found"})
            }
            if(recipeToBeEdited.username!==userId){
                return res.status(400).json({msg:"you cannot edit other's recipe's"})
            }

            const updatedRecipe = await recipe.findByIdAndUpdate(recipeId,{
                recipeName,
                time,
                instructions,
                ingredients,
                recipeImg},{new:true});
            return res.status(200).json({msg:"recipe updated", updatedRecipe});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"internal server err"})
    }
}


export const delRecipe = async(req,res)=>{
    try{
        const recipeId = req.params.id;
        const usrId = req.user._id;


        const recipeToBeDeleted = await recipe.findById(recipeId);

        if(recipeToBeDeleted.username !==usrId){
            return res.status(400).json({msg:"!Warning you cannot delete other's recipe"})
        }
    }
    catch(err){
            return res.status(500).json({message:"internal server error"})
    }
}

//saved recipe logic

export const saveRecipe = async(req,res)=>{
    try{
        const recipeId = req.params.id;
        const userId = req.user._id;

        const savedRecipe = await user.findByIdAndUpdate(userId, {
            $addToSet: { savedrecipe: recipeId }
        }, { new: true });

        return res.status(200).json({msg: "recipe saved", savedRecipe});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg:"internal server error"})
    }
}

export const getAllSavedRecipe = async(req, res) => {
    try {
        const userId = req.user._id;
        const userWithSavedRecipes = await user.findById(userId).populate('savedrecipe');
        
        if (!userWithSavedRecipes) {
            return res.status(400).json({ msg: "No saved recipes found!" });
        }

        return res.status(200).json({ savedrecipe: userWithSavedRecipes.savedrecipe });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal server error" });
    }
}
