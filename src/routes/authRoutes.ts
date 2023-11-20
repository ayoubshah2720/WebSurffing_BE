import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

const EXPIRE_TOKEN_IN_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = "SUPER SECRET";
//Generate 6 digits token
function generateEmailToken(): string {
 return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateAuthToken(tokenId: Number): string {
    const jwtPayload = { tokenId };
    return jwt.sign(jwtPayload, JWT_SECRET,{
        algorithm: "HS256",
        noTimestamp: true
    })
   }

//Authentication

// Create a user if it doesn't exist.
// Generate an email token and send it to their email.
router.post('/login', async (req,res)=>{
    const {email, name, username} = req.body;
    const emailToken = generateEmailToken();

    const expiration = new Date(new Date().getTime() + EXPIRE_TOKEN_IN_MINUTES * 60 * 1000 )

    try {
        
        const createdToken = await prisma.token.create({
            data: {
            type: 'EMAIL',
            emailToken,
            expiration,
            user: {
                connectOrCreate: {
                    where: {email},
                    create: {email, name, username}
                }
            }
        }
    })
    
    console.log("created Token", createdToken),
    res.sendStatus(200);
} catch (error) {
    console.log(error);
    res.status(400).json({error:"Couldn't start the authentication process."})   
}
    
})

// Validate the emailToken.
// Generate a long-live JWT token.
router.post('/authenticate', async (req,res)=>{
    const {email, emailToken} = req.body;
    console.log(email, emailToken);
    const dbEmailedToken = await prisma.token.findUnique({
        where: {
            emailToken,
        },
        include:{
            user: true,
        }
    })

    console.log(dbEmailedToken);
    (!dbEmailedToken || !dbEmailedToken?.valid) && res.sendStatus(401);
    // if(dbEmailedToken?.user?.expiration < new Date()) {
    //     res.status(401).json({error: "Token Expired."})
    // };

    if(dbEmailedToken?.user?.email !== email){
        res.sendStatus(401)
    }

    //Here we validate that the user is the owner of the Email;

    const expiration = new Date(
        new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
    )
    //generate an API token
    const apiToken = await prisma.token.create({
        data:{
            type:"API",
            expiration,
            user:{
                connect:{
                    email
                }
            }
        }
    })

    await prisma.token.update({
        where:{id: dbEmailedToken?.id},
        data:{valid: false}
    })
    // Generate JWT token
    const authToken = generateAuthToken(apiToken?.id)
    res.send(authToken);
})


export default router;