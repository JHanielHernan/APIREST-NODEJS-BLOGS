import {z} from 'zod';

export const postValidation = z.object({
    title: z.string().min(5,"No cumple con los caracteres minimos").max(50,"Se alcanzo la maxima cantidad de caracteres"),
    content: z.string().min(10,"No cumple con los caracteres minimos").max(400,"Se alcanzo la maxima cantidad de caracteres")
});