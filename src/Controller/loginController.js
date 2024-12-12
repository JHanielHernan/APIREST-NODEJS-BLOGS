import {pool} from '../Database/connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const Login = async (req,res)=>{
    const {username,password} = req.body;

    try{
        const [respuesta] = await pool.query("SELECT * FROM users WHERE username = ?",[username]);
        if(respuesta.length > 0){
            const PasswordBD = respuesta[0].password;
            const Match = await bcrypt.compare(password,PasswordBD);
            if(Match){
                const id = respuesta[0].id;
                const token = jwt.sign({id: id, username: username},process.env.SECRET_JWT_KEY,{
                    expiresIn:'1h'
                });
                return res
                .cookie('acces_token',token,{
                    httpOnly: true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:'strict',
                    maxAge:1000 * 60 * 60
                })
                .send([username,password]);
            }
            res.status(404).json({message:"No coinciden"});
        }
    }catch(exception){
        return res.status(404).json({message:exception.message});
    }
}

export const Protected = (req,res)=>{
    const{user} = req.session;
    if(!user) return res.status(403).send('NO ESTAS AUTORIZADO PENDEJO');
    res.send(user);
    
    // if(!token){
    //     return res.status(403).send('No estas autorizado pendejo');
    // }

    // try{
    //     const data = jwt.verify(token,process.env.SECRET_JWT_KEY);
    //     res.send(`<h1>BIENVENIDO MALPARIDO</h1>`);
    // }catch(exception){
    //     res.status(401).send('SIN AUTORIZACION POR PENDEJO');
}

export const CerrarSesion = (ereq,res)=>{
    res
    .clearCookie('acces_token')
    .json({message:'Sesion cerrada'});
}