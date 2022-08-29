import { Usuario } from "@prisma/client";
import { Request, Response } from "express";
import { VerificarEmail } from "../../../../utils/validacao/verificar-email";
import { CriarUsuarioRepository } from "./criar-usuario-repository";


export class CriarUsuarioController {
    async handle(request: Request, response: Response){

        const {email} = request.body;
        if(VerificarEmail(email) == true){
            try {
                const usuario : Usuario = request.body;
                const criarUsuarioRepository = new CriarUsuarioRepository();
                const resultado = await criarUsuarioRepository.execute(usuario);
                return response.status(201).json({status: resultado});
            } catch (error) {
                if(error instanceof Error){
                    return response.status(400).json({Error: error.message});   
                }
            }
        }else{
            return response.status(400).json({Error: "Dominio de email não é valido"});   
        }
    }
}


//import { Request, Response } from "express";
//export class {
    //async handle(request: Request, response: Response){
        
        // try {
            
        //     return response.status(201).json({status: "sucesso"});
        // } catch (error) {
            
        //     if(error instanceof Error){
        //         return response.status(400).json({Error: error.message});   
        //     }
        // }
    //}
//}