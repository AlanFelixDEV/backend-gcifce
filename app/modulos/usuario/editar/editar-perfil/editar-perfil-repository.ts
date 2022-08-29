import { Perfil } from "@prisma/client";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";

interface IEditarPerfil{
    id: string;
    perfil: Perfil;
}

export class EditarPerfilRepository{


    async execute({id, perfil}:IEditarPerfil){

        const usuario = await prisma.usuario.findUnique({
            where:{
                id:id,
            }
        });

        if(!usuario){
            throw new Error("Usuário não encontrado");
        }

        await prisma.usuario.update({
            where:{
                id: id,
            },
            data:{
                perfil,
            }
        })

        return "Perfil alterado";
    }
}