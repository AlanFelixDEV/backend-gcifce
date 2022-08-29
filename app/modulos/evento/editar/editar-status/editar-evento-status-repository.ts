import { StatusEvento } from "@prisma/client";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

export class EditarEventoStatusRepository {
  async execute(id_evento: string, status: StatusEvento) {
    const buscar_evento = await prisma.evento.findUnique({
      where: {
        id: id_evento,
      },
    });

    if (buscar_evento == null) {
      throw new Error("Evento não encontrado");
    }else if(status != StatusEvento.aprovado && status != StatusEvento.recusado && status != StatusEvento.finalizado && status != StatusEvento.analise){
      throw new Error("Status do evento inválido");
    }

    const editarStatusEvento = await prisma.evento.update({
      where: {
        id: id_evento,
      },
      data: {
        status: status,
      },
    });
    return "Evento atualizado";
  }
}
