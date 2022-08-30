import express from 'express';
import cors from 'cors';
import { rotas } from './rotas';

import "dotenv/config";

const servidor = express();
const port = process.env.PORT || 5001
servidor.use(cors());
servidor.use(express.json());
servidor.use(rotas);


servidor.listen(port, () => { console.log(`Rodando na porta ${port}`)});