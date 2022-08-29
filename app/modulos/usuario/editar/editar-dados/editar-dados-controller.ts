import { Request, Response } from "express";
import { EditarDadosRepository } from "./editar-dados-repository";
export class EditarDadosController {
  async handle(request: Request, response: Response) {
    try {
      const { nome } = request.body;
      const id_usuario = request.id_usuario;
      const editarDadosRepository = new EditarDadosRepository();
      const resultado = await editarDadosRepository.execute({id_usuario, nome});
      return response.status(200).json({ status: resultado });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}
