import { Request, Response } from "express";
import { BuscarUsuarioLogadoRepository } from "./buscar-usuario-logado-repository";

export class BuscarUsuarioLogadoController {
  async handle(request: Request, response: Response) {
    try {
      const id_usuario = request.id_usuario;
      const buscarUsuarioLogadoRepository = new BuscarUsuarioLogadoRepository();
      const resultado = await buscarUsuarioLogadoRepository.execute(id_usuario);
      return response.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}