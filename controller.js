class Controller{
    constructor(){
        this.fileSystem = require("./file-system.js");
        this.utils = require("./utils.js");
    }

    async pegarDados(){
        return Promise.all(
            [this.fileSystem.lerArquivo("Estados.json")
            ,this.fileSystem.lerArquivo("Cidades.json")]
        );
    }

    criarArquivosPorEstado(){
        let arrayPromise = [];
        this.estados.forEach(estado => {
            let cidadesDoEstado = this.cidades.filter((item)=>item.Estado==estado.ID);
            arrayPromise.push(this.fileSystem.escreverArquivo(estado.Sigla+".json",JSON.stringify(cidadesDoEstado)));
        });
        return Promise.all(arrayPromise);
    }

    async quantidadeCidades(uf){
        try{
            return JSON.parse(await this.fileSystem.lerArquivo(uf+".json")).length;
        }catch(ex){
            console.log(ex);
            return 0;
        }
    }

    async estadosComMaisCidades(){
        try{
            let array = [];
            for(let i = 0;i<this.estados.length;i++){
                let estado = this.estados[i];
                let quantidade = await this.quantidadeCidades(estado.Sigla);
                array.push(
                    {"sigla":estado.Sigla,
                    "nome":estado.Nome,
                    "valor":quantidade
                });
            }
            array = this.utils.ordenarDecrescente(array);
            array = array.slice(0,5).map((item)=>`(${item.sigla}) ${item.nome} - ${item.valor}`);
            console.log("MAIORES QUANTIDADES DE CIDADES POR ESTADO: ");
            console.log("\n"+array.join("\n")+"\n");
        }catch(ex){
            console.log(ex);
        }
    }

    async estadosComMenosCidades(){
        try{
            let array = [];
            for(let i = 0;i<this.estados.length;i++){
                let estado = this.estados[i];
                let quantidade = await this.quantidadeCidades(estado.Sigla);
                array.push(
                    {"sigla":estado.Sigla,
                    "nome":estado.Nome,
                    "valor":quantidade
                });
            }
            array = this.utils.ordenarCrescente(array);
            array = this.utils.ordenarDecrescente(array.slice(0,5));
            array = array.map((item)=>`(${item.sigla}) ${item.nome} - ${item.valor}`);
            console.log("MENORES QUANTIDADES DE CIDADES POR ESTADO: ");
            console.log("\n"+array.join("\n")+"\n");
        }catch(ex){
            console.log(ex);
        }
    }

    async maiorCidadePorEstado(){
        try{
            let array = [];
            for(let i = 0;i<this.estados.length;i++){
                let estado = this.estados[i];
                let cidades = JSON.parse(await this.fileSystem.lerArquivo(estado.Sigla+".json"));
                cidades = this.utils.ordenarCidadesDecrescente(cidades);
                array.push(`${cidades[0].Nome} - ${estado.Nome} (${estado.Sigla}) - ${cidades[0].Nome.length} letras`)
            }
            console.log("CIDADES COM MAIOR NOME DE CADA ESTADO: ");
            console.log("\n"+array.join("\n")+"\n");
        }catch(ex){
            console.log(ex);
        }
    }

    async maiorCidadeDosEstados(){
        let array = [];
        for(let i = 0;i<this.estados.length;i++){
            let estado = this.estados[i];
            this.cidades.map((cidade)=>{
                if(estado.ID == cidade.Estado){
                    cidade.uf = estado.Sigla;
                    cidade.estado = estado.Nome;
                }
                return cidade;
            });
        }
        this.cidades = this.utils.ordenarCidadesDecrescente(this.cidades);
        array.push(`${this.cidades[0].Nome} - ${this.cidades[0].estado} (${this.cidades[0].uf}) - ${this.cidades[0].Nome.length} letras`)
        console.log("CIDADE COM MAIOR NOME DE TODOS OS ESTADOS: ");
        console.log("\n"+array.join("\n")+"\n");
    }

    async menorCidadeDosEstados(){
        let array = [];
        for(let i = 0;i<this.estados.length;i++){
            let estado = this.estados[i];
            this.cidades.map((cidade)=>{
                if(estado.ID == cidade.Estado){
                    cidade.uf = estado.Sigla;
                    cidade.estado = estado.Nome;
                }
                return cidade;
            });
        }
        this.cidades = this.utils.ordenarCidadesCrescente(this.cidades);
        array.push(`${this.cidades[0].Nome} - ${this.cidades[0].estado} (${this.cidades[0].uf}) - ${this.cidades[0].Nome.length} letras`)
        console.log("CIDADE COM MENOR NOME DE TODOS OS ESTADOS: ");
        console.log("\n"+array.join("\n")+"\n");
    }

    async menorCidadePorEstado(){
        let array = [];
        for(let i = 0;i<this.estados.length;i++){
            let estado = this.estados[i];
            let cidades = JSON.parse(await this.fileSystem.lerArquivo(estado.Sigla+".json"));
            cidades = this.utils.ordenarCidadesCrescente(cidades);
            array.push(`${cidades[0].Nome} - ${estado.Nome} (${estado.Sigla}) - ${cidades[0].Nome.length} letras`)
        }
        console.log("CIDADES COM MENOR NOME DE CADA ESTADO: ");
        console.log("\n"+array.join("\n")+"\n");
    }

    setDados(dados){
        this.estados = JSON.parse(dados[0]);
        this.cidades = JSON.parse(dados[1]);
    }
}

module.exports = new Controller();