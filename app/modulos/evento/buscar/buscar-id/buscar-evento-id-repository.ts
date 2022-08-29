import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

export class BuscarEventoIdRepository {
  async execute(id_evento: string) {
    const eventos = await prisma.evento.findUnique({
      where: {
        id: id_evento,
      },
      select: {
        id: true,
        nome: true,
        data: true,
        tipo: true,
        template: true,
        palestrante: true,
        carga_horaria: true,
        status: true,
        participantes: {
          select: {
            participantes: {
              select: {
                id: true,
                nome: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (eventos == null) {
      throw new Error("Nenhum evento encontrado");
    } else {
      let eventoJson = JSON.parse(JSON.stringify(eventos));

      let evento = {
        id: eventoJson["id"],
        nome: eventoJson["nome"],
        data: eventoJson["data"],
        tipo: eventoJson["tipo"],
        carga_horaria: eventoJson["carga_horaria"],
        palestrante: eventoJson["palestrante"],
        status: eventoJson["status"],
        template: eventoJson["template"],
        participantes: <any>[],
      };

      for (let j = 0; j < eventoJson["participantes"].length; j++) {
        evento.participantes.push(
          eventoJson["participantes"][j]["participantes"]
        );
      }

      return evento;
    }
  }
}
