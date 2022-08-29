import { StatusUsuario } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

interface IAlterarSenha {
  senha: string;
  id_usuario: string;
}

export class CriarSenhaRepository {
  async execute({ senha, id_usuario }: IAlterarSenha) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id_usuario,
      },
    });

    if (!usuario) {
      throw new Error("Email ou senha incorreto");
    }

    const hashPassword = await hash(senha, 10);

    await prisma.usuario.update({
      where: {
        id: id_usuario,
      },
      data: {
        senha: hashPassword,
        status: StatusUsuario.ativo,
      },
    });

    return "Senha alterada";
  }
}
