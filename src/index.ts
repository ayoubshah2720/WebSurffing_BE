import express  from "express";
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import campaignRoutes from './routes/campaingRoutes'
import { authenticateToken } from './middlewares/authMiddleware'

const app = express();
app.use(express.json());

app.use('/user', authenticateToken,userRoutes)
app.use('/campaigns', authenticateToken,campaignRoutes)
app.use('/auth',authRoutes)

app.listen(3000,()=>{
    console.log('Server is runing on 3000 ')
})