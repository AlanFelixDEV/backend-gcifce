import { Evento } from "@prisma/client";
import { Request, Response } from "express";
import { EditarEventoStatusRepository } from "./editar-evento-status-repository";

export class EditarEventoStatusController {
  async handle(request: Request, response: Response) {
    try {
      const { id_evento, status } = request.body;
      const editarEventoStatusRepository = new EditarEventoStatusRepository();
      const resultado = await editarEventoStatusRepository.execute(
        id_evento,
        status
      );
      response.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}
