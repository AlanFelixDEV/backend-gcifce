import { prisma } from "../../../services/cliente-prisma/cliente-prisma";


interface IValidarCertificado{
    id_certificado: string;
}

export class ValidarCertificadoRepository{

    async execute({id_certificado}: IValidarCertificado){


        const certificado = await prisma.certificado.findUnique({
            where:{
                id: id_certificado,
            },
            select:{
                id:true,
            }
        });

        if(!certificado){
            throw new Error("Certificado não encontrado");
        }

        return certificado;
    }
}