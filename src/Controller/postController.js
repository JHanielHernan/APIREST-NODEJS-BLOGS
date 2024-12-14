import { pool } from "../Database/connection.js";
import { postValidation } from "../validators/postValidation.js";
import {z} from 'zod';

export const GetMyPost = async(req,res)=>{
    const {id} = req.session.user;

    try{
        if(!id) return res.status(404).json({message:"Posts no encontrados por falta de sesión"});

        const [respuesta] = await pool.query("SELECT * FROM posts WHERE id_user = ?",[Number(id)]);
        res.json(respuesta);

    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}

export const AgregarPost = async (req,res)=>{
    const {id} = req.session.user;
    const Post = postValidation.parse(req.body);
    const {id_categoria , id_tags} = req.body;
    try{
        if(!id) return res.status(404).json({message:"Posts no ingresado por falta de sesión"});

        const [respuesta] = await pool.query("INSERT INTO posts (title,content,id_user,id_categoria,id_tags) VALUES (?,?,?,?,?)",
            [Post.title,Post.content,Number(id),Number(id_categoria) || null, Number(id_tags) || null ]
        );
        res.json({message:"Post ingresado"})
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message:exception.message});

    }
}

export const ActualizarPost = async (req,res)=>{
    const {id} = req.body;
    const Post = postValidation.parse(req.body);

    try{
        if(!id) return res.status(404).json({message:"Posts no se actualizo por falta de sesión"});

        const [respuesta] = await pool.query("UPDATE posts SET title = COALESCE(?,title),content = COALESCE(?,content) WHERE id = ?",[
            Post.title,Post.content,Number(id)
        ]);
        res.json({message:"Modificado correctamente"});
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message:exception.message});
    }
}
export const EliminarPost = async (req,res)=>{
    const {id} = req.body;
    try{
        if(!id) return res.status(404).json({message:"Posts no elimino por falta de sesión"});
        const respuesta = await pool.query("DELETE FROM posts WHERE id = ?",[Number(id)]);
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}