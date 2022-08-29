import express from 'express';
import cors from 'cors';
import { rotas } from './rotas';

import "dotenv/config";

const servidor = express();
servidor.use(cors());
servidor.use(express.json());
servidor.use(rotas);


servidor.listen(5001, () => { console.log("Servidor rodando na porta 5001")});