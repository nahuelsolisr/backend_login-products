import {Request, Response}from 'express';

import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'



//Extrae el nombre de usuario y la contraseña de la solicitud, 

export const newUser = async (req: Request, res: Response) =>{

const{username, password}=req.body;
//Validamos si el usuario ya existe en la base de datos
const user = await User.findOne({where:{username:username}});

if(user){
      res.status(400).json({
        msg:`ya existe un usuario con el nombre ${username}`
    })
}else {
    //cifra la contraseña con bcrypt
    //crea un nuevo usuario en la base de datos. En caso de error, devuelve una respuesta JSON 
    //con un código de estado 400 y un mensaje de error.
    const hashedPassword = await bcrypt.hash(password,10);

    try {
        await User.create({
            username:username,
            password:hashedPassword    
        })
    
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        })
        
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrió un error', error
        })
        
    }}
}

export const loginUser = async (req: Request, res: Response) =>{

    const{username,password}=req.body;
    
   //validamos si el usuario existe en la base de datos
   const user:any = await User.findOne({where:{username:username}});

   if(!user){
    return res.status(400).json({
        msg:`No existe un usuario con el nombre ${username}`
    })
   }


 //validamos password 
  const passwordValid= await  bcrypt.compare(password,user.password)
  
  if(!passwordValid){
    return res.status(400).json({
        msg: `Password incorrecta`
    })
  }

   //generamos token 
   const token = jwt.sign({
    username:username

   },process.env.SECRET_KEY || 'pepito123')
   



   res.json(token)
}
