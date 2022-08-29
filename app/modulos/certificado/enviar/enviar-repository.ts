import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { prisma } from '../../../services/cliente-prisma/cliente-prisma';

interface IEnviarCertificado {
    id_usuario: string;
    id_evento: string;
    access_token: string;
};

export class EnviarRepository {
    async execute({ id_evento, id_usuario, access_token }: IEnviarCertificado) {


        const evento = await prisma.evento.findUnique({
            where: {
                id: id_evento,
            },
            include: {
                certificado: true,
                participantes: {
                    select:{
                        participantes:{
                            select:{
                                nome:true,
                                email:true,
                            }
                        }
                    }
                }
            }
        });

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: id_usuario,
            }
        });


        if (!evento) {
            throw new Error("Evento inválido");
        }

        if (!usuario) {
            throw new Error("Usuario invalido");
        }


        const quantidadeCertificado = evento.certificado.length;

        for (let index = 0; index < quantidadeCertificado; index++) {


            const doc = new PDFDocument({ layout: "landscape", size: 'A4' });


            doc.fontSize(20)
            doc.font('app\\utils\\fonts\\Roboto-Bold.ttf')

            doc.text("INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ", 80, 50, { width: 350 });

            doc.lineJoin('round')
                .circle(23, 27, 8)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(15, 38, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(15, 56, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(15, 74, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(35, 20, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(35, 38, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(35, 56, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(35, 74, 15, 15)
                .fillAndStroke("#363634")
                .stroke();


            doc.lineJoin('round')
                .rect(54, 20, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.lineJoin('round')
                .rect(54, 56, 15, 15)
                .fillAndStroke("#363634")
                .stroke();

            doc.fontSize(35)
            doc.text("CERTIFICADO DE CONCLUSÃO", 15, 150);

            doc.fontSize(20);
            doc.fillColor('#363634')
            doc.font('app\\utils\\fonts\\Roboto-Bold.ttf')
            doc.image('app\\utils\\assets\\' + evento?.template, 0, 0, { width: 841.89, height: 595.28 })
                .text('Evento: ' + evento?.nome, 40, 200)
                .text('Nome: ' + evento.participantes[index].participantes?.nome, 40, 250)
                .text('Tipo: ' + evento?.tipo, 40, 300)
                .text('Carga horaria: ' + evento?.carga_horaria, 40, 350)

            doc.fontSize(9)
                .text('Valide o certificado em: http://localhost:5000/certificado/validar   ' + evento.certificado[index].id, 40, 510);

            // TESTAR EM CASA - ESSE TRECHO DE CÓDIGO GERA UM ARQUIVO PDF - TALVEZ NÃO PRECISE
            doc.pipe(fs.createWriteStream('app\\utils\\docs\\'+evento.participantes[index].participantes?.nome+'.pdf'));
            doc.end();

        
            console.log(usuario!.email);


            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    type: "OAuth2",
                    user: "alanfelix.dev@gmail.com",
                    // user: usuario!.email,
                    accessToken: access_token,
                },
            });

            await transporter.sendMail({
                from: usuario?.email,
                to: evento.participantes[index].participantes?.email,
                subject: "Certificado - IFCE",
                text: `Seu certificado de conclusão do curso ${evento?.nome}`,
                attachments: [
                    {
                        filename: evento.participantes[index].participantes?.nome+'.pdf',
                        path: 'app\\utils\\docs\\'+evento.participantes[index].participantes?.nome+'.pdf',
                    }
                ],
            });

        }

        return evento;
    }
}