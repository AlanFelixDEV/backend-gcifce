import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

export class BuscarTodosEventosRepository {
  async execute() {
    const eventos = await prisma.evento.findMany({
      select: {
        id:true,
        nome:true,
        data:true,
        tipo:true,
        template:true,
        palestrante:true,
        carga_horaria:true,
        status:true,
      },
    });

    if (eventos == null) {
      throw new Error("Nenhum evento encontrado");
    } else {
      return eventos;
    }
  }
}
