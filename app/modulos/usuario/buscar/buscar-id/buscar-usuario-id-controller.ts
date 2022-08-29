import { Request, Response } from "express";
import { BuscarUsuarioIdRepository } from "./buscar-usuario-id-repository";

export class BuscarUsuarioIdController {
  async handle(request: Request, response: Response) {
    try {
      const {id_usuario} = request.body;
      const buscarUsuarioIdRepository = new BuscarUsuarioIdRepository();
      const resultado = await buscarUsuarioIdRepository.execute(id_usuario);
      return response.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}