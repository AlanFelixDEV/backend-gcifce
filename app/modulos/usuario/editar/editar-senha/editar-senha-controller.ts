import { Request, Response } from "express";
import { VerificarNullEmpty } from "../../../../utils/validacao/verificar-null-empty";
import { EditarSenhaRepository } from "./editar-senha-repository";
export class EditarSenhaController {
  async handle(request: Request, response: Response) {
    try {
      const { senha_atual, senha_nova } = request.body;
      const id_usuario = request.id_usuario;
      if (
        VerificarNullEmpty(senha_atual) == false &&
        VerificarNullEmpty(senha_nova) == false
      ) {
        const editarSenhaRepository = new EditarSenhaRepository();
        const resultado = await editarSenhaRepository.execute({
          id_usuario,
          senha_atual,
          senha_nova,
        });
        return response.status(200).json({ status: resultado });
      } else {
        return response
          .status(400)
          .json({ Error: "Senha atual ou nova inválida" });
      }
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ Error: error.message });
      }
    }
  }
}
