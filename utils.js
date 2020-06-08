class Utils{
    ordenarCrescente(lista){
        return lista.sort((a,b)=>a.valor-b.valor);
    }

    ordenarDecrescente(lista){
        return lista.sort((a,b)=>b.valor-a.valor);
    }

    ordenarCidadesCrescente(lista){
        return lista.sort((a,b)=>{
            let result = 0
            if(a.Nome.length==b.Nome.length){
                if(a.Nome>b.Nome){
                    result = 1;
                }else{
                    result = -1;
                }
            }else{
                result = a.Nome.length-b.Nome.length;
            }
            return result;
        });
    }

    ordenarCidadesDecrescente(lista){
        return lista.sort((a,b)=>{
            let result = 0
            if(a.Nome.length==b.Nome.length){
                if(a.Nome>b.Nome){
                    result = 1;
                }else{
                    result = -1;
                }
            }else{
                result = b.Nome.length-a.Nome.length;
            }
            return result;
        });
    }

}

module.exports = new Utils();