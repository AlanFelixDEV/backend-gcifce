import { Request, Response } from "express";
import { VerificarEmail } from "../../../utils/validacao/verificar-email";
import { VerificarNullEmpty } from "../../../utils/validacao/verificar-null-empty";
import { LoginCredenciaisRepository } from "./login-credenciais-repository";

export class LoginCredenciaisController {
  async handle(request: Request, response: Response) {
    const { email, senha } = request.body;
    if (VerificarEmail(email) == false) {
      return response.status(400).json({ Error: "Email ou senha inválido" });
    }

    try {
      const loginCredenciaisRepository = new LoginCredenciaisRepository();
      const resultado = await loginCredenciaisRepository.execute({ email, senha });
      return response.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(401).json({ Error: error.message });
      }
    }
  }
}
