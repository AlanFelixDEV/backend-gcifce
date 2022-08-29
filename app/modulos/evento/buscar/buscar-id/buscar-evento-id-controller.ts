import { Request, Response } from "express";
import { BuscarEventoIdRepository } from "./buscar-evento-id-repository";

export class BuscarEventoIdController {
  async handle(request: Request, response: Response) {
    try {
      const {id_evento}= request.body;
      const buscarEventoIdRepository = new BuscarEventoIdRepository();
      const resultado = await buscarEventoIdRepository.execute(id_evento);
      return response.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}
