import { Participante, StatusEvento } from "@prisma/client";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";
import { converterData } from "../../../../utils/conversao-data/conversao-data";

interface IEditarEvento {
  id: string;
  nome: string;
  data: Date;
  tipo: string;
  template: string;
  palestrante: string;
  carga_horaria: string;
  status: StatusEvento;
  participantes: Array<String>;
}

export class EditarEventoRepository {
  async execute({
    id,
    nome,
    data,
    tipo,
    carga_horaria,
    palestrante,
    template,
    status,
    participantes,
  }: IEditarEvento) {

    const existeEvento = await prisma.evento.findUnique({
      where: {
        id: id,
      },
    });

    if (!existeEvento) {
      throw new Error("Evento não encontrado");
    }

    participantes.map(async (e) => {
      const participante: Participante = JSON.parse(JSON.stringify(e));
      const participanteExiste = await prisma.participante.findUnique({
        where: {
          email: participante.email,
        },
      });

      const eventoExisteParticipante =
        await prisma.participanteEvento.findFirst({
          where: {
            id_evento: id,
            participantes: {
              email: participante.email,
            },
          },
        });

      if (!participanteExiste) {
        const novo_participante = await prisma.participante.create({
          data: {
            nome: participante.nome,
            email: participante.email,
            eventos: {
              create: {
                eventos: {
                  connect: {
                    id: id,
                  },
                },
              },
            },
          },
        });
      } else {
        if (!eventoExisteParticipante) {
          const participant = await prisma.participante.update({
            where: {
              email: participante.email,
            },
            data: {
              eventos: {
                create: {
                  eventos: {
                    connect: {
                      id: id,
                    },
                  },
                },
              },
            },
          });
        }
      }
    });

    const evento_alterado = await prisma.evento.update({
      where: {
        id: id,
      },
      data: {
        nome,
        tipo,
        carga_horaria,
        data: converterData(data),
        palestrante,
        template,
        status: status,
      },
    });

    return evento_alterado;
  }
}
