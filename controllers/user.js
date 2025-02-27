import {user} from '../models/user.js'
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



export const register = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({msg:"all fields are required"})
        }
        const existingUser  =  await user.findOne({username});

        if(existingUser){return res.status(400).json({msg:'choose a different username'});}
        const hashPass = await bcrypt.hash(password,10);

        await user.create({
            username,
            password:hashPass
        })
        return res.status(201).json({msg:"user registered successfully"})

    }
    catch(err){
        return res.status(500).json({msg:"internal server error"});
    }
}

export const login = async(req,res)=>{
        try{
                const {username,password} = req.body;

                if(!username || !password){
                    return res.status(400).json({msg:"all fields are required"})
                }
                const existingUser = await user.findOne({username});
                if(!existingUser){
                    return res.status(400).json({msg:"invalid username or password!"})
                }

                const isPass  = await bcrypt.compare(password,existingUser.password);
                if(!isPass){
                    return res.status(400).json({msg:"invalid credentials"})
                }

                const token = jwt.sign({_id:existingUser._id},process.env.jwtKey,{expiresIn:'1d'});
                
                return res.status(200).json({ token, username  });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({msg:"internal server error"});
        }
}