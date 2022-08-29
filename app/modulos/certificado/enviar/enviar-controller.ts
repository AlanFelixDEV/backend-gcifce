import { Request, Response } from "express";
import { EnviarRepository } from "./enviar-repository";


export class EnviarController {

    async handle(request: Request, response: Response){

        try {
            const {id_evento, access_token} = request.body;
            const id_usuario = request.id_usuario;
            const enviarRepository = new EnviarRepository();
            await enviarRepository.execute({id_usuario , id_evento, access_token, });
            return response.status(201).json({status: "Certificados enviado por email"});
        } catch (error) {
            if(error instanceof Error){
                return response.status(400).json({Error: error.message});   
            }
        }

    }
}