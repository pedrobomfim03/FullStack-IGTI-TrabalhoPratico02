class FileSystem{

    constructor(){
        this.fs = require("fs");
        this.dir = __dirname+"/files/";
    }

    lerArquivo(nome){
        return new Promise((resolve,reject)=>{
            this.fs.readFile(this.dir+nome,{encoding:"UTF-8"},(err,data)=>{
                if(err) reject(err);
                resolve(data);
            });
        });
    }
    
    escreverArquivo(nome,dados){
        return new Promise((resolve,reject)=>{
            this.fs.writeFile(this.dir+nome,dados,{encoding:"UTF-8"},(err)=>{
                if(err) reject(err);
                resolve("Arquivo salvo com sucesso!");
            });
        });
    }
}

module.exports = new FileSystem();