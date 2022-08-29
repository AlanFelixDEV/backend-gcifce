
import { Request, Response } from "express";
import { CertificadoCriarRepository } from "./certificado-criar-repository";
export class CertificadoCriarController {
    async handle(request: Request, response: Response){
        
        try {
            const {id_evento} = request.body;
            const certificadoCriarRepository = new CertificadoCriarRepository();
            const resultado = await certificadoCriarRepository.execute(id_evento);
            return response.status(201).json({status: resultado});
        } catch (error) {
            
            if(error instanceof Error){
                return response.status(400).json({Error: error.message});   
            }
        }
    }
}