const assert = require("assert");
class Centrifuge{
    n = 0;
    config = [];
    constructor(n, config) {
        this.n = n;
        this.config = config;
    }

    toString(){
        let configString = "";
        this.config.sort(function (a, b) {  return a - b;  }).forEach((x) => configString += x + ", ");
        configString = configString.substring(0, configString.length-2);
        return "Centrifuge(" + this.n + ", [" + configString + "])";
    }

    roteer(wijzerin=false){
        if(wijzerin){
            wijzerin = -1;
        }
        else{
            wijzerin = 1;
        }
        for(let i=0 ; i<this.config.length ; i++){
            let current = this.config[i];
            let nieuw = current + wijzerin;
            if(nieuw < 0){
                nieuw+= this.n;
            }
            else if(nieuw >= this.n){
                nieuw-= this.n;
            }
            this.config[i] = nieuw;
        }
        return this;

    }

    spiegel(){
        for(let i=0 ; i<this.config.length ; i++){
            if(this.config[i] !== 0 && this.config[i] !== this.n /2) {
                this.config[i] = this.n - this.config[i];
            }
        }
        return this;
    }

     isGelijk(cent2){
        let cent1 = new Centrifuge(this.n+0, this.config.slice(0,))
        cent2 = new Centrifuge(cent2.n, cent2.config)
        if(cent1.n === cent2.n) {
            for (let k = 0; k < 2; k++) {
                for (let i = 0; i < cent1.n; i++) {
                    if (cent1.config.sort().toString() === cent2.config.sort().toString()) {
                        cent1 = this;
                        return true;
                    }
                    cent1 = cent1.roteer()
                }
                cent1 = cent1.spiegel();
            }
        }
        return false
    }
    
    vul(cent2){
        let cent1 = this;
        assert(cent1.n === cent2.n, "gaten kunnen niet gevuld worden");
        let gevuld = cent2.config.slice(0,);
        for(let i=0 ; i<cent1.config.length ; i++){
            if(gevuld.includes(cent1.config[i])){
                throw {name:"AssertionError", message: "gaten kunnen niet gevuld worden"};
            }
            else{
                gevuld.push(cent1.config[i])
            }
        }
        this.config = gevuld
        return this;
    }
    
        leeg(cent2){
        let cent1 = this;
        assert(cent1.n === cent2.n, "gaten kunnen niet geleegd worden");
        let gevuld = cent1.config.slice(0,);
        for(let i=0 ; i<cent2.config.length ; i++){
            if(!gevuld.includes(cent2.config[i])){
                throw {name:"AssertionError", message: "gaten kunnen niet geleegd worden"};
            }
            else{
                gevuld.splice(gevuld.indexOf(cent2.config[i]),1);
            }
        }
        this.config = gevuld
        return this;
    }

}