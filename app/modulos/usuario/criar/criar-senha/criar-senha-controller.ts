import { Request, Response } from "express";
import { CriarSenhaRepository } from "./criar-senha-repository";

export class CriarSenhaController {
  async handle(request: Request, response: Response) {
    try {
      const { senha } = request.body;
      const id_usuario = request.id_usuario;
      const criarSenhaRepository = new CriarSenhaRepository();
      const resultado = await criarSenhaRepository.execute({
        senha,
        id_usuario,
      });
      return response.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
      return response.status(400).json({ Error: "error.message" });
    }
  }
}
