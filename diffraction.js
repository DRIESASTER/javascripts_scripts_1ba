const assert = require("assert");
class Atoom{

    constructor(achterwaarts = null) {
        this.achterwaarts = achterwaarts;
    }

    toString(){
        switch(this.achterwaarts){
            case true:
                return "\\";
                break;
            case false:
                return "/";
                break;
            case null:
                return ".";
                break;
        }
    }

    afbuigen(richting){
        let richtingen = ["N", "O", "Z", "W"]
        assert(richting.match(/^[NWOZ]$/g), "ongeldige richting");
        let index = richtingen.indexOf(richting)
        switch(this.achterwaarts){
            case true:
                if(index === 0 || index === 2) {
                    index -= 1
                }
                else{
                    index += 1
                }
                break;
            case false:
                if(index === 0 || index === 2) {
                    index += 1
                }
                else{
                    index -= 1
                }
                break;
            case null:
                break;
        }
        if(index < 0){
            index+= 4;
        }
        if(index > 3){
            index-= 4;
        }
        return richtingen[index]
    }
}

class Molecule{
    constructor(m, n) {
        this.bord = []
        for(let i=0 ; i<m ; i++){
            let rij = []
            for(let k=0 ; k<n ; k++){
                rij.push(new Atoom())
            }
            this.bord.push(rij)
        }
    }

    toString(){
        let stringBord = "";
        for(let i=0 ; i<this.bord.length ; i++){
            let string = ""
            for(let k=0 ; k<this.bord.length[0] ; k++){
                string += this.bord[i][k].toString() + " "
            }
            stringBord+= string.substring(0, string.length-1)
            stringBord+= this.bord[i].join(" ") + "\n";
        }
        return stringBord.substring(0, stringBord.length - 1);
    }

    plaats(atoom){
        for(let i=1 ; i<arguments.length ; i++) {
            let pos = arguments[i]
            assert(pos[0] >= 0 && pos[0] < this.bord.length && pos[1] >= 0 && pos[1] < this.bord[0].length, "ongeldige positie")
            this.bord[pos[0]][pos[1]] = atoom;
        }
        return this;
    }

    afbuiging(pos, richting, dif = false){
        let kolom = pos[1]
        let rij =  pos[0]
        let gepaseerd = []

        while(rij<this.bord.length && kolom<this.bord[0].length && rij>=0 && kolom>=0) {
            gepaseerd.push([rij, kolom])
            richting = (this.bord[rij][kolom].afbuigen(richting))
            switch (richting) {
                case "N":
                    rij -= 1;
                    break;
                case "Z":
                    rij += 1;
                    break;
                case "O":
                    kolom += 1;
                    break;
                case "W":
                    kolom -= 1;
                    break;
            }

        }
        if(dif === true){
            return [gepaseerd[gepaseerd.length-1], richting]
        }
        return gepaseerd
    }

    diffractie(pos, richting){
        return this.afbuiging(pos, richting, true)
    }
}