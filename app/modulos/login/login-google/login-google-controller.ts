import { Request, Response } from "express";
import { VerificarEmail } from "../../../utils/validacao/verificar-email";
import { LoginGoogleRepository } from "./login-google-repository";

export class LoginGoogleController {
  async handle(request: Request, response: Response) {
    const { nome, email } = request.body;
    if (VerificarEmail(email) == false) {
      return response.status(400).json({ Error: "Email inválido para efetuar login" });
    }
    try {
      console.log(nome, email);
      const loginGoogleRepository = new LoginGoogleRepository();
      const result = await loginGoogleRepository.execute({ nome, email });
      return response.json(result);
    } catch (e) {
      if (e instanceof Error) {
        return response.status(401).json({ Error: e.message });
      }
    }
  }
}
