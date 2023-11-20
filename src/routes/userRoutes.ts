import { PrismaClient } from "@prisma/client";
import Router from "express"

const router = Router();
const prisma = new PrismaClient()

router.get('/',async (req,res)=>{
    const allUsers = await prisma.user.findMany()
    res.json(allUsers)
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    const singleUser = await prisma.user.findUnique({
        where: {id: Number(id)}
    })
    res.json(singleUser)
})

router.post('/',async (req,res)=>{
    try {
        const {name, username, email} = req.body;
        const result = await prisma.user.create({
            data:{
                name,
                username,
                email 
            }
        })
        !result && res.json('Data Not Found!')
        res.json(result);
    } catch (error) {
        console.log('error',error);
    }
})

router.put('/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const {username, bio, image, email} = req.body;
        const result = await prisma.user.update({
            where: {id: Number(id)},
            data:{
                username,
                email,
                bio,
                image
            }
        })
        !result && res.json('Data Not Found!')
        res.json(result);
    } catch (error) {
        console.log('error',error);
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await prisma.user.delete({
            where: {id: Number(id)}
        })
        !result && res.json('Data Not Found!')
        res.sendStatus(200);
    } catch (error) {
        console.log('error',error);
    }
})

export default router;