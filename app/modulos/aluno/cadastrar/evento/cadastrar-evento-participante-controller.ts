import { Request, Response } from "express";
import { VerificarEmail } from "../../../../utils/validacao/verificar-email";
import { CadastrarEventoParticipanteRepository } from "./cadastrar-evento-participante-repository";

export class CadastrarEventoParticipanteController {
  async handle(request: Request, response: Response) {
    
    const { id_evento, nome, email } = request.body;
    if (VerificarEmail(email) == true) {
      try {
        const cadastrarEventoParticipanteRepository =
          new CadastrarEventoParticipanteRepository();
        const resultado = await cadastrarEventoParticipanteRepository.execute({id_evento, nome, email});
        response.status(200).json(resultado);
      } catch (error) {
        if (error instanceof Error) {
          return response.status(400).json({ Error: error.message });
        }
      }
    }else{
      return response.status(400).json({ Error: "Email inválido para cadastro" });
    }
  }
}
