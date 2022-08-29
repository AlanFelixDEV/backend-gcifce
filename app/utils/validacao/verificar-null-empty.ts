export function VerificarNullEmpty(valor: string){


    if(valor == undefined || valor == null || valor.length == 0){
        return true;
    }else{
        return false;
    }
};