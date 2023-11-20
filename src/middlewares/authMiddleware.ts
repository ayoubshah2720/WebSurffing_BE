import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface JwtPayload {
    tokenId: number
  }


const prisma = new PrismaClient();
const JWT_SECRET = "SUPER SECRET";

type AuthRequest = Request & {user?: User}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const jwtToken = authHeader?.split(" ")[1]
    console.log('authHeader',jwtToken);
    !jwtToken && res.sendStatus(401);

    try {
        const payload = jwtToken &&  await jwt.verify(jwtToken, JWT_SECRET)
        console.log('payloadpayloadpayload',payload);
        
        const dbToken = await prisma.token.findUnique({
            where:{id: (payload as JwtPayload)?.tokenId},
            include: {user: true}
        })
        if(!dbToken?.valid || (dbToken && dbToken?.expiration < new Date())){
            return res.status(401).json({error: "API Token is expired."})
        }   
        req.user = dbToken.user;    
        console.log('payloadpayloadpayload',req.user);
    } catch (error) {
       return res.sendStatus(401);
    }
    next();
}