import { PrismaClient } from "@prisma/client";
import Router from "express"

const router = Router();
const prisma = new PrismaClient()

router.get('/',async (req,res)=>{
    const allCampaigns = await prisma.campaigns.findMany()
    res.json(allCampaigns)
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    const singleCampaign = await prisma.campaigns.findUnique({
        where: {id: Number(id)}
    })
    res.json(singleCampaign)
})

router.post('/',async (req,res)=>{
    try {
        const {name, url, views, view_time, campaign_coins, price,userId} = req.body;
        const result = await prisma.campaigns.create({
            data:{
                name,
                url,
                views,
                view_time,
                campaign_coins,
                price,
                userId 
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
        const {name, url, campaign_coins, price, userId} = req.body;
        const result = await prisma.campaigns.update({
            where: {id: Number(id)},
            data:{
                name,
                url,
                campaign_coins,
                userId 
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
        const result = await prisma.campaigns.delete({
            where: {id: Number(id)}
        })
        !result && res.json('Data Not Found!')
        res.sendStatus(200);
    } catch (error) {
        console.log('error',error);
    }
})

export default router;