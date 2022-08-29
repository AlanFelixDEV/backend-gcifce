import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../services/cliente-prisma/cliente-prisma";

interface ILoginCredenciais {
  email: string;
  senha: string;
}

export class LoginCredenciaisRepository {
  async execute({ email, senha }: ILoginCredenciais) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!usuario) {
      throw new Error("Email ou senha incorreton");
    }
    
    const compararSenha = await compare(senha, usuario.senha);
    if (!compararSenha) {
      throw new Error("Email ou senha incorreto");
    }


    const token = sign({ id: usuario.id, email: usuario.email }, "ifce", {
      subject: usuario.id,
      expiresIn: "3h",
    });

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      status: usuario.status,
      accessToken: token,
    };
  }
}
