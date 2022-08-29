import { compare, hash } from "bcrypt";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

interface IEditarDados{
    id_usuario: string;
    nome: string;
}

export class EditarDadosRepository {
    async execute({id_usuario, nome}:IEditarDados ) {
        
        const usuario = await prisma.usuario.findUnique({
            where:{
                id: id_usuario,
            }
        });

        if (usuario == null) {
            throw new Error("Usuário não encontrado");
        }else{


            const resultado = await prisma.usuario.update({
                where:{
                    id:id_usuario,
                },
                data:{
                    nome
                }
            });

            return "Dados atualizados";
        }
    }
}