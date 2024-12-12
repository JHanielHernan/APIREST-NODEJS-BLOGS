import {z} from 'zod';
import {pool} from '../Database/connection.js';
import {UserValidate} from '../validators/usersValidation.js';
import bcrypt from 'bcrypt';

export const GetUsers = async (req,res)=>{
    try{
        const [respuesta] = await pool.query("SELECT * FROM users");
        if(respuesta){
            return res.status(200).json(respuesta);
        }
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}

export const GetIdUsers = async (req,res)=>{
    const {id} = req.params;
    try{
        const [respuesta] = await pool.query("SELECT * FROM users WHERE id = ?" ,[Number(id)]);
        if(respuesta){
            return res.status(200).json(respuesta[0]);
        }
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}

export const AgregarUsers = async (req,res)=>{
    const UserNew = UserValidate.parse(req.body);
    const Password = UserNew.password;
    const saltRounds = 10;

    try{
        const hash = await bcrypt.hash(Password, saltRounds);
        const response = await pool.query("INSERT INTO users (username , email, password) VALUES (?,?,?)",
            [UserNew.username, UserNew.email, hash]
        );
        res.json({message:"Se inserto correctamente el usuario"});
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message:exception.message});
    }   
}

export const UpdateUser = async(req,res)=>{

    const {id} = req.params;
    const newUser = UserValidate.parse(req.body);
    const saltRounds = 10;
    const passwordd = newUser.password;
    try{
        //Comprobar que exista el usuario 
        const CompUser = await pool.query("SELECT * FROM users WHERE id = ?",[Number(id)]);
        //Si existe el usuario
        if(CompUser){
            const hash = await bcrypt.hash(passwordd, saltRounds);

            let Query = await pool.query("UPDATE users SET username = COALESCE(?,username) , email = COALESCE(?,email), password = COALESCE(?,password) WHERE id = ?",[newUser.username,newUser.email,hash,Number(id)]);
            return res.json({message:"Se actualizo el user"});
        }

    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message:exception.message});
    }
}

export const DeleteUser = async(req,res)=>{
    const {id} = req.params;
    try{
        const ress = await pool.query("DELETE FROM users WHERE id = ?",[Number(id)]);
        return res.json({message:"Se elimino el user"});
    }
    catch(exception){
        res.status(404).json({message:exception.message});
    }
}
