import { Evento, Participante } from "@prisma/client";
import { Request, Response } from "express";
import { CriarEventoRepository } from "./criar-evento-repository";

export class CriarEventoController {
  async handle(request: Request, response: Response) {
    try {
      const evento = request.body;
      const id_usuario = request.id_usuario;
      evento.id_usuario = id_usuario
      const criarEventoRepository = new CriarEventoRepository();
      const resultado = await criarEventoRepository.execute(evento);
      return response.status(201).json(resultado);
    } catch (error) {
        if(error instanceof Error){
            return response.status(400).json({Error: error.message});   
        }
    }
  }
}
