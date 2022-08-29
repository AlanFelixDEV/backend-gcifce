import express from 'express';
import cors from 'cors';
import { rotas } from './rotas';

import "dotenv/config";

const PORT = 5001;

const servidor = express();
servidor.use(cors());
servidor.use(express.json());
servidor.use(rotas);


servidor.listen(PORT, () => { console.log("Servidor rodando na porta 5001")});
