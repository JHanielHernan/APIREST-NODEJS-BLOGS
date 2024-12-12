import {z} from 'zod';

export const UserValidate = z.object({
    username : z
    .string()
    .min(3,'Se necesita un nombre de usuario'),
    email : z
    .string()
    .email({ message: "Debe ser un correo electrónico válido" }),
    password : z
    .string()
    .min(6,'Debe ser mas de 6 caracteres almenos')
});
