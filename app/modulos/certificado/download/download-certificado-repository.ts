import { prisma } from "../../../services/cliente-prisma/cliente-prisma";

interface IListarCertificado {
  id_certificado: string;
}

export class DownloadCertificadoRepository {
  async execute({ id_certificado }: IListarCertificado) {
    const certificado = await prisma.certificado.findUnique({
      where: {
        id: id_certificado,
      },
      include: {
        evento: true,
        participante: {
          select: {
            participante: {
              select: {
                nome: true,
                email: true,
              },
            },
          },
        },
      },
    });
    return certificado;
  }
}
