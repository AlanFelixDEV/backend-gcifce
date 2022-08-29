import { Request, Response } from "express";
import { BuscarEventoUsuarioRepository } from "./buscar-evento-usuario-repository";

export class BuscarEventoUsuarioController {
  async handle(request: Request, response: Response) {
    try {
      const buscarEventoUsuarioRepository = new BuscarEventoUsuarioRepository();
      const id_usuario = request.id_usuario;
      const resultado = await buscarEventoUsuarioRepository.execute(id_usuario);
      return response.status(201).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}
