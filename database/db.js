import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connect = async()=>{
    try{
            await mongoose.connect(process.env.DB_URI);
            console.log('connected to recipebase database');
    }
    catch(Err){
        await mongoose.disconnect();
        process.exit(1);
    }
}


export default connect;