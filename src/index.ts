import express  from "express";
import userRoutes from './routes/userRoutes'
import campaignRoutes from './routes/campaingRoutes'

const app = express();
app.use(express.json());

app.use('/user', userRoutes)
app.use('/campaigns', campaignRoutes)

app.get('/',(req,res)=>{
    res.send("Hi From Ayoub Shah. Working on websurffing.")
})

app.listen(3000,()=>{
    console.log('Server is runing on 3000 ')
})