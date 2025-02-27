import express from 'express';
import connect from './database/db.js'
import userRoute from './routes/user.js';
import cors from 'cors';
import recipeRoute from './routes/recipe.js';







const app = express();
app.use(cors({
    origin:'http://localhost:5173'

}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connect();

app.use("/api/user",userRoute);
app.use("/recipe",recipeRoute)




app.listen(process.env.PORT || 4000,()=>{
    console.log('server running successfully!')
})