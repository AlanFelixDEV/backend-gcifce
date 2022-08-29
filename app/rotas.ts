import { Router } from "express";
import { EditarEventoController } from "./modulos/evento/editar/editar-evento/editar-evento-controller";
import { EditarEventoStatusController } from "./modulos/evento/editar/editar-status/editar-evento-status-controller";
import { BuscarEventoUsuarioController } from "./modulos/evento/buscar/buscar-evento-usuario/buscar-evento-usuario-controller";
import { BuscarEventoIdController } from "./modulos/evento/buscar/buscar-id/buscar-evento-id-controller";
import { BuscarTodosEventosController } from "./modulos/evento/buscar/buscar-todos/buscar-todos-eventos-controller";
import { CriarEventoController } from "./modulos/evento/criar/criar-evento-controller";
import { LoginCredenciaisController } from "./modulos/login/login-credenciais/login-credenciais-controller";
import { EditarDadosController } from "./modulos/usuario/editar/editar-dados/editar-dados-controller";
import { EditarSenhaController } from "./modulos/usuario/editar/editar-senha/editar-senha-controller";
import { BuscarUsuarioIdController } from "./modulos/usuario/buscar/buscar-id/buscar-usuario-id-controller";
import { BuscarUsuarioTodosController } from "./modulos/usuario/buscar/buscar-todos/buscar-usuario-todos-controller";
import { CriarUsuarioController } from "./modulos/usuario/criar/criar-usuario/criar-usuario-controller";
import { MiddlewareAutenticacao } from "./services/middlewares/middleware-autenticacao";
import { BuscarUsuarioLogadoController } from "./modulos/usuario/buscar/buscar-usuario-logado/buscar-usuario-logado-controller";
import { CertificadoCriarController } from "./modulos/certificado/criar/certificado-criar-controller";
import { ValidarCertificadoController } from "./modulos/certificado/validar/validar-certificado-controller";
import { DownloadCertificadoController } from "./modulos/certificado/download/download-certificado-controller";
import { EditarPerfilController } from "./modulos/usuario/editar/editar-perfil/editar-perfil-controller";
import { LoginGoogleController } from "./modulos/login/login-google/login-google-controller";
import { CriarSenhaController } from "./modulos/usuario/criar/criar-senha/criar-senha-controller";
import { CadastrarEventoParticipanteController } from "./modulos/aluno/cadastrar/evento/cadastrar-evento-participante-controller";
import { EnviarController } from "./modulos/certificado/enviar/enviar-controller";


const rotas = Router();

// LOGIN

rotas.post("/login", new LoginCredenciaisController().handle);
rotas.post("/login-google", new LoginGoogleController().handle);

rotas.post("/evento/participante", new CadastrarEventoParticipanteController().handle);



// ROTAS USUÁRIO

rotas.post("/usuario/criar", new CriarUsuarioController().handle);
rotas.post("/usuario/criar-senha", MiddlewareAutenticacao, new CriarSenhaController().handle);
rotas.post("/usuario/buscar-id", MiddlewareAutenticacao, new BuscarUsuarioIdController().handle);
rotas.get("/usuario/buscar-todos", new BuscarUsuarioTodosController().handle);
rotas.get("/usuario/logado", MiddlewareAutenticacao,new BuscarUsuarioLogadoController().handle);
rotas.post("/usuario/editar", MiddlewareAutenticacao, new EditarDadosController().handle);
rotas.post("/usuario/editar-senha", MiddlewareAutenticacao, new EditarSenhaController().handle);
rotas.post("/usuario/editar-perfil", MiddlewareAutenticacao, new EditarPerfilController().handle);


// ROTAS EVENTO

rotas.post("/evento/criar", MiddlewareAutenticacao, new CriarEventoController().handle);
rotas.get("/evento/buscar-todos",  new BuscarTodosEventosController().handle);
rotas.get("/evento/buscar-evento-usuario", MiddlewareAutenticacao, new BuscarEventoUsuarioController().handle);
rotas.post("/evento/buscar-id", MiddlewareAutenticacao, new BuscarEventoIdController().handle);
rotas.post("/evento/editar", MiddlewareAutenticacao, new EditarEventoController().handle);
rotas.post("/evento/editar-status", MiddlewareAutenticacao, new EditarEventoStatusController().handle);


// ROTAS CERTIFICADO

rotas.post("/certificado/criar", MiddlewareAutenticacao, new CertificadoCriarController().handle);
rotas.post("/certificado/validar", new ValidarCertificadoController().handle);
rotas.post("/certificado/download", new DownloadCertificadoController().handle);
rotas.post("/certificado/enviar", MiddlewareAutenticacao, new EnviarController().handle);






export { rotas };