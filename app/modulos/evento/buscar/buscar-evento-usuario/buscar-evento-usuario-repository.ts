import { Evento, Participante, StatusEvento } from "@prisma/client";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

interface IEventos {
  id: string;
  nome: string;
  data: Date;
  tipo: string;
  template: string;
  palestrante: string;
  carga_horaria: string;
  status: StatusEvento;
  participantes: Array<Participante>;
}
const OEvento: {
  id?: string;
  nome?: string;
  data?: Date;
  tipo?: string;
  template?: string;
  palestrante?: string;
  carga_horaria?: string;
  status?: StatusEvento;
  participantes?: Array<Object>;
} = {};

export class BuscarEventoUsuarioRepository {
  async execute(id_usuario: string) {
    const lista_eventos = [];
    const eventos = await prisma.evento.findMany({
      where: {
        id_usuario,
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
      for (let i = 0; i < eventoJson.length; i++) {
        let evento = {
          id: eventoJson[i]["id"],
          nome: eventoJson[i]["nome"],
          data: eventoJson[i]["data"],
          tipo: eventoJson[i]["tipo"],
          carga_horaria: eventoJson[i]["carga_horaria"],
          palestrante: eventoJson[i]["palestrante"],
          status: eventoJson[i]["status"],
          template: eventoJson[i]["template"],
          participantes: <any>[],
        };

        for (let j = 0; j < eventoJson[i]["participantes"].length; j++) {
          evento.participantes.push(
            eventoJson[i]["participantes"][j]["participantes"]
          );
        }

        lista_eventos.push(evento);
      }

      return lista_eventos;
    }
  }
}
