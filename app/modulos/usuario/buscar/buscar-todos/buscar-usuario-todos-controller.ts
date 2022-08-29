import { Request, Response } from "express";
import { BuscarUsuarioTodosRepository } from "./buscar-usuario-todos-repository";

export class BuscarUsuarioTodosController {
  async handle(request: Request, response: Response) {
    try {
      const buscarUsuarioRepository = new BuscarUsuarioTodosRepository();
      const resultado = await buscarUsuarioRepository.execute();
      return response.status(201).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}
