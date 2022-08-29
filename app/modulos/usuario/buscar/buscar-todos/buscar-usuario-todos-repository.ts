import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

export class BuscarUsuarioTodosRepository {
  async execute() {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id:true,
        nome:true,
        email:true,
        perfil:true,
        status:true,
        eventos:true,
      },
    });

    if (usuarios == null) {
      throw new Error("Nenhum usuário encontrado");
    } else {
      return usuarios;
    }
  }
}
