import { StatusUsuario, Usuario } from "@prisma/client";
import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";
import { hash } from "bcrypt";

export class CriarUsuarioRepository {
    async execute({ nome, email, senha  }: Usuario ) {

        const buscar_usuario = await prisma.usuario.findUnique({
            where:{
                email
            }
        });

        if(buscar_usuario != null){
            throw new Error("Usuário já cadastrado");
        }else{
            const hashPassword = await hash(senha, 10);
            await prisma.usuario.create({
                data:{
                    nome,
                    email,
                    senha: hashPassword,
                    status: StatusUsuario.ativo,
                }
            });

            return "Usuário cadastrado";
        }
    }
}





// import { prisma } from "../../../../services/cliente-prisma/cliente-prisma";



//export class "NomeClasse" {
    // async execute({ atributos }: INTERFACE ) {
        
        // if (condicional) {
        //     throw new Error("Usuário já cadastrado");
        // }
    //}
//}