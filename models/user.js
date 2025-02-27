import mongoose from 'mongoose';

const userModel  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    savedrecipe:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"recipe"
    }]
},{timestamps:true})

export const user = mongoose.model("user",userModel);