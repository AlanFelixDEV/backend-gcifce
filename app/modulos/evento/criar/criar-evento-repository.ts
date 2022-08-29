import { Evento, Participante } from "@prisma/client";
import { prisma } from "../../../services/cliente-prisma/cliente-prisma";
import { converterData } from "../../../utils/conversao-data/conversao-data";

interface ICriarEvento {
  id_usuario: string;
  nome: string;
  data: Date;
  tipo: string;
  palestrante: string;
  template: string;
  carga_horaria: string;
  participantes: Array<String>;
}


export class CriarEventoRepository {
  async execute({nome, data, tipo, carga_horaria, palestrante, template , id_usuario, participantes}: ICriarEvento) {

    const checar_evento = await prisma.evento.findFirst({
      where:{
        nome,
        id_usuario,
      }
    });

    if(checar_evento != null){
      throw new Error("Evento já cadastrado para o usuário");
    }


    const novo_evento = await prisma.evento.create({
      data:{
        nome,
        data: converterData(data),
        carga_horaria,
        palestrante,
        tipo,
        template,
        usuario:{
          connect:{
            id: id_usuario
          }
        }
      }
    });

    participantes.map(
      async (e) => {

          const participante: Participante = JSON.parse(JSON.stringify(e));
          const participanteExiste = await prisma.participante.findUnique({
              where: {
                  email: participante.email,
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
                                      id: novo_evento.id,
                                  }
                              }
                          }
                      }
                  },
              });
          } else {
              

              const participant = await prisma.participante.update({
                  where: {

                      email: participante.email,
                  },

                  data: {
                      eventos: {
                          create: {
                              eventos: {
                                  connect: {
                                      id: novo_evento.id,
                                  }
                              }
                          }
                      }
                  }
              });
          }
      });

    return "Evento criado";
  }
}
