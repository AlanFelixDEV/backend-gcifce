import { Request, Response } from "express";
import { BuscarTodosEventosRepository } from "./buscar-todos-eventos-repository";

export class BuscarTodosEventosController {
  async handle(request: Request, response: Response) {
    try {
      const buscarTodosEventosRepository = new BuscarTodosEventosRepository();
      const resultado = await buscarTodosEventosRepository.execute();
      return response.status(201).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}
