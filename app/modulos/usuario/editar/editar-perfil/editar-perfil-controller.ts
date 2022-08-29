import { Request, Response } from "express";
import { EditarPerfilRepository } from "./editar-perfil-repository";


export class EditarPerfilController {

    async handle(request: Request, response: Response){

        try {
            const {id ,perfil} = request.body;
            const editarPerfilRepository = new EditarPerfilRepository();
            const resultado = await editarPerfilRepository.execute({id, perfil});
    
            return response.status(200).json(resultado);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(400).json({ Error: error.message });
              }
        }

       
    }

}