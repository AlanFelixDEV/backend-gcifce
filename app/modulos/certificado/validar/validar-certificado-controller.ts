import { Request, Response } from "express";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { ValidarCertificadoRepository } from "./validar-certificado-repository";



export class ValidarCertificadoController {

    async handle(request: Request, response: Response) {

        try {
            
            const { id_certificado } = request.body;
            const validarCertificadoController = new ValidarCertificadoRepository();
            const resultado = await validarCertificadoController.execute({ id_certificado });
    
            return response.json({ id: resultado.id, status: "Certificado Válido"});
        } catch (error) {
            if(error instanceof Error){
                return response.status(400).json({status: error.message});   
            } 
            return response.status(400).json({Error: "error.message"});   
        }

    }
}