import { compare, hash } from "bcrypt";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

interface IEditarSenha{
    senha_atual: string;
    senha_nova: string;
    id_usuario: string;
}

export class EditarSenhaRepository {
    async execute({id_usuario, senha_atual, senha_nova}:IEditarSenha ) {
        

        const usuario = await prisma.usuario.findUnique({
            where:{
                id: id_usuario,
            }
        });

        if (usuario == null) {
            throw new Error("Usuário não encontrado");
        }else{
            const compareSenha = await compare(senha_atual, usuario.senha);
            if(compareSenha == false){
                throw new Error("Verifique a senha digitada");
            }

            const hashPassword = await hash(senha_nova, 10);

            const resultado = await prisma.usuario.update({
                where:{
                    id:id_usuario,
                },
                data:{
                    senha: hashPassword
                }
            });

            return "Senha alterada";
        }
    }
}