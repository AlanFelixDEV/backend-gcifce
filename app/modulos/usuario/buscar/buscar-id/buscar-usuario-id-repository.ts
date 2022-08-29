import { sign } from "jsonwebtoken";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

export class BuscarUsuarioIdRepository {
  async execute(id_usuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id_usuario,
      },
      select: {
        id:true,
        nome:true,
        email:true,
        perfil:true,
        status:true,
        // eventos:true,
      },
    });

    
    if (usuario == null) {
      throw new Error("Usuário não encontrado");
    } else {
      const token = sign({ id: usuario.id, email: usuario.email }, "ifce", {
        subject: usuario.id,
        expiresIn: "3h",
      });
      return {id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil, status: usuario.status, accessToken: token};
    }
  }
}