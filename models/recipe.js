import mongoose from 'mongoose';

const recipeModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    recipeName: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions:{
        type:String,
        required:true
    },
    recipeImg:{
        type:String,
        required:true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const recipe = mongoose.model("recipe", recipeModel);
