export function VerificarEmail(email: String){
    const dominio = email.split("@")[1];
    if(dominio == "aluno.ifce.edu.br" || dominio == "ifce.edu.br"){
        return true;
    }else{
        return false;
    }
};