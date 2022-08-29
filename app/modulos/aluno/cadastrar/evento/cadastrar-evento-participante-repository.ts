import { Participante, StatusEvento } from "@prisma/client";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";
import { converterData } from "../../../../utils/conversao-data/conversao-data";

interface ICadastrarParticipante {
  id_evento: string;
  nome: string;
  email: string;
}

export class CadastrarEventoParticipanteRepository {
  async execute({ id_evento, nome, email }: ICadastrarParticipante) {
    const evento = await prisma.evento.findFirst({
      where: {
        id: id_evento,
      },
      include: {
        participantes: true,
      },
    });

    if (!evento) {
      throw new Error("Evento não encontrado");
    }

    const participante = await prisma.participante.findUnique({
      where: {
        email,
      },
    });

    if (!participante) {
      console.log(id_evento, nome, email);
      const cadastrarParticipante = await prisma.participante.create({
        data: {
          nome,
          email,
          eventos: {
            create: {
              eventos: {
                connect: {
                  id: id_evento,
                },
              },
            },
          },
        },
      });

      return "Participante cadastrado";
    } else {
      const participeExisteNoEvento = await prisma.participanteEvento.findFirst(
        {
          where: {
            id_evento,
            id_participante: participante.id,
          },
        }
      );

      if (!participeExisteNoEvento) {
        const conectarParticipante = await prisma.evento.update({
          where: {
            id: id_evento,
          },
          data: {
            participantes: {
              create:{
                participantes:{
                  connect:{
                    email:participante.email
                  }
                }
              }
            },
          },
        });
        return "Participante cadastrado";
      } else {
        return "Participante cadastrado";
      }
    }
  }
}
