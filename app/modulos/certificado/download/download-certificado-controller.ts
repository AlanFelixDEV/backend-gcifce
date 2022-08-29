import { Request, Response } from "express";
import { DownloadCertificadoRepository } from "./download-certificado-repository";
import PDFDocument from "pdfkit";
import fs from "fs";

export class DownloadCertificadoController {
  async handle(request: Request, response: Response) {
    const { id_certificado } = request.body;
    const downloadCertificadoController = new DownloadCertificadoRepository();
    const resultado = await downloadCertificadoController.execute({
      id_certificado,
    });

    const doc = new PDFDocument({ layout: "landscape", size: "A4" });

    doc.fontSize(20);
    doc.font("app\\utils\\fonts\\Roboto-Bold.ttf");

    doc.text(
      "INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ",
      80,
      50,
      { width: 350 }
    );

    doc.lineJoin("round").circle(23, 27, 8).fillAndStroke("#363634").stroke();

    doc
      .lineJoin("round")
      .rect(15, 38, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(15, 56, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(15, 74, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(35, 20, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(35, 38, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(35, 56, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(35, 74, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(54, 20, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc
      .lineJoin("round")
      .rect(54, 56, 15, 15)
      .fillAndStroke("#363634")
      .stroke();

    doc.fontSize(35);
    doc.text("CERTIFICADO DE CONCLUSÃO", 15, 150);

    doc.fontSize(20);
    doc.fillColor("#363634");
    doc.font("app\\utils\\fonts\\Roboto-Bold.ttf");
    doc
      .image("app\\utils\\assets\\" + resultado?.evento?.template, 0, 0, {
        width: 841.89,
        height: 595.28,
      })
      .text("Evento: " + resultado?.evento?.nome, 40, 200)
      .text("Nome: " + resultado?.participante[0].participante?.nome, 40, 250)
      .text("Tipo: " + resultado?.evento?.tipo, 40, 300)
      .text("Carga horaria: " + resultado?.evento?.carga_horaria, 40, 350);

    doc
      .fontSize(9)
      .text(
        "Valide o certificado em: http://localhost:5000/certificado/validar   " +
          resultado?.id,
        40,
        510
      );

    // TESTAR EM CASA - ESSE TRECHO DE CÓDIGO GERA UM ARQUIVO PDF - TALVEZ NÃO PRECISE
    // doc.pipe(fs.createWriteStream('src\\docs\\'+nome_participante+'.pdf'));
    doc.end();

    const stream = response.writeHead(200, {
      "Content-type": "application/pdf",
      "Content-Disposition": "attachment;filename=al.pdf",
    });

    doc.on("data", (chunk) => stream.write(chunk));
    doc.on("end", () => stream.end());
  }
}
