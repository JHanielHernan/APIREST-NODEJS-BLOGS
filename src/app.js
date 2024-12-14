import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use((req,res,next)=>{
    const token = req.cookies.acces_token;
    req.session = {user: null};
    try{
        const data = jwt.verify(token,process.env.SECRET_JWT_KEY);
        req.session.user = data;
    }catch{}
    next();
});

import {default as UserRout} from './router/userRouter.js';
import {default as LoginRouter} from './router/loginRouter.js'
import {default as PostRouter} from './router/postRouter.js'

app.get('/',(req,res)=>{
    const {user} = req.sesion;
    res.send(user);
});

app.use('/users',UserRout);
app.use('/login',LoginRouter);
app.use('/posts',PostRouter);


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})