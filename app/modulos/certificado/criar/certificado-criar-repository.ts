import { prisma } from "../../../services/cliente-prisma/cliente-prisma";





export class CertificadoCriarRepository {
    async execute(id_evento : string) {
      
        const evento = await prisma.evento.findUnique({
            where:{
                id:id_evento,
            },
            include:{
                certificado:true,
                participantes:true,
            }
        });

        if(evento?.certificado.length == 0){
            evento.participantes.map(async (participante) => await prisma.certificado.create({
                data:{
                    evento:{
                        connect:{
                            id: id_evento
                        },
                    },
                    participante:{
                        createMany:{
                            data:{
                                id_participante: participante.id_participante
                            }
                        }
                    }
                }
            }));
        }else{
            throw new Error("Certificado já existente para o evento");
        }

        return "Certificados criados";
    }
}