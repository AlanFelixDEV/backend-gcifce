import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { createHash } from "crypto";
import { prisma } from "../../../services/cliente-prisma/cliente-prisma";

interface IAuthRepository {
  nome: string;
  email: string;
}

export class LoginGoogleRepository {
  async execute({ email, nome }: IAuthRepository) {
    console.log(email, nome);
    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (usuario) {
      const token = sign({ nome: usuario.nome, email: usuario.email }, "ifce", {
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
    } else {
      var current_date = new Date().valueOf().toString();
      var random = Math.random().toString();
      const randomHash = createHash("sha1")
        .update(current_date + random)
        .digest("hex");
      const hashPassword = await hash(randomHash, 10);
      const novo_usuario = await prisma.usuario.create({
        data: {
          email,
          nome,
          senha: hashPassword,
        },
      });
      const token = sign(
        { nome: novo_usuario.nome, email: novo_usuario.email },
        "ifce",
        { subject: novo_usuario.id, expiresIn: "3h" }
      );
      return {
        id: novo_usuario.id,
        nome: novo_usuario.nome,
        email: novo_usuario.email,
        perfil: novo_usuario.perfil,
        status: novo_usuario.status,
        accessToken: token,
      };
    }
  }
}
