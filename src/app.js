import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

import {default as UserRout} from './router/userRouter.js';



app.use('/users',UserRout);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})