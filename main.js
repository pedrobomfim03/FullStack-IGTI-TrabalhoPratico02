class Main{

    constructor(){
        this.controller = require("./controller.js");
    }

    async main(){
        try{
            let dados = await this.controller.pegarDados();
            this.controller.setDados(dados);
            await this.controller.criarArquivosPorEstado();
            this.controller.estadosComMaisCidades();
            this.controller.estadosComMenosCidades();
            this.controller.maiorCidadePorEstado();
            this.controller.menorCidadePorEstado();
            this.controller.maiorCidadeDosEstados();
            this.controller.menorCidadeDosEstados();
        }catch(ex){
            console.log(ex);
        }
    }
}

new Main().main();