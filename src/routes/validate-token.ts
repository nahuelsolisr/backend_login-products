import { Request,Response,NextFunction} from "express"
import jwd from 'jsonwebtoken'


const validateToken=(req : Request,res : Response,next : NextFunction) =>{
   
    const headerToken = req.headers['authorization'];


    if(headerToken != undefined && headerToken.startsWith('Bearer ')){

        try {//tiene token
        const bearerToken = headerToken.slice(7)
        jwd.verify(bearerToken, process.env.SECRET_KEY || 'pepito123')
        next();

        } catch (error) {
            res.status(400).json({
                msg: 'Token invalido'
    
            })    
        } 
    }

    else{
        res.status(400).json({
            msg: 'Acceso denegado'
        })
    }



}



export default validateToken