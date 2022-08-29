import { Evento } from "@prisma/client";
import { Request, Response } from "express";
import { EditarEventoRepository } from "./editar-evento-repository";




export class EditarEventoController{

    async handle(request: Request, response: Response){

        try {
            const evento = request.body;
            const editarEventoRepository = new EditarEventoRepository();
            const resultado = await editarEventoRepository.execute(evento);
            response.status(200).json(resultado);
        } catch (error) {
            if (error instanceof Error) {
              return response.status(400).json({ Error: error.message });
            }
          }
    }
}