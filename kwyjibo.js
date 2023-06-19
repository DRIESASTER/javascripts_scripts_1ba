// https://dodona.ugent.be/nl/courses/1151/series/12996/activities/900625397
const assert = require("assert");
class Scrabble{

    bord = []
    constructor(n) {
        assert(n>=1 && n<=26, "ongeldig spelbord")
        let kolom = []
        for(let i=0 ; i<n ; i++){
            kolom[i] = "-"
        }
        for(let i=0 ; i<n ; i++){
            this.bord[i] = kolom.slice(0,)
        }
    }

    toString(){
        let bordString = ""
        let rij = ""
        for(let i=0 ; i<this.bord.length ; i++){
            rij = ""
            for(let k=0 ; k<this.bord.length ;k++){
                rij+= this.bord[i][k]
            }
            bordString += rij + "\n";
        }
        return bordString.substring(0, bordString.length-1)
    }

    aanleggen(coord, woord) {
        let tempBord = []
        for(let i=0 ; i<this.bord.length ; i++){
            tempBord[i] = this.bord[i].slice(0,)
        }

        let newWord = ""
        let rijNr = coord.replace(/[^\d]/g, "") - 1;
        let kolomNr = (coord.replace(/\d/g, "")).charCodeAt(0) - "A".charCodeAt(0)
        let counter = 0;
        assert(rijNr >= 0, "woord kan niet aangelegd worden")
        if (coord.match(/^[\d]*[A-Z]$/)) {

            assert(kolomNr + woord.length <= tempBord.length, "woord kan niet aangelegd worden")
            for(let c=kolomNr ; c<kolomNr + woord.length ; c++){
                assert(tempBord[rijNr][c] != null, "woord kan niet aangelegd worden")
                if(tempBord[rijNr][c].toUpperCase() === woord.charAt(counter).toUpperCase()){
                    if(newWord.match(/\)$/)){
                        newWord = newWord.substring(0,newWord.length-1)
                        newWord += tempBord[rijNr][c] + ")"
                    }
                    else {
                        newWord += "(" + tempBord[rijNr][c] + ")"
                    }
                }
                else if(tempBord[rijNr][c].toUpperCase() != "-"){
                    throw {name:"AssertionError", message: "woord kan niet aangelegd worden"};
                }
                else{
                    tempBord[rijNr][c] = woord.charAt(counter)
                    newWord += woord.charAt(counter)
                }
                counter++
            }
        }
        else if(coord.match(/^[A-Z][\d]*$/)) {

            assert(rijNr + woord.length <= tempBord.length, "woord kan niet aangelegd worden")
            for (let k = rijNr; k < rijNr + woord.length; k++) {
                assert(tempBord[k][kolomNr] != null, "woord kan niet aangelegd worden")
                if (tempBord[k][kolomNr].toUpperCase() === woord.charAt(counter).toUpperCase()) {
                    if (newWord.match(/\)$/)) {
                        newWord = newWord.substring(0, newWord.length - 1)
                        newWord += tempBord[k][kolomNr] + ")"
                    } else {
                        newWord += "(" + tempBord[k][kolomNr] + ")"
                    }
                } else if (tempBord[k][kolomNr] != "-") {
                    throw {name: "AssertionError", message: "woord kan niet aangelegd worden"};
                } else {
                    tempBord[k][kolomNr] = woord.charAt(counter)
                    newWord += woord.charAt(counter)
                }
                counter++
            }
        }
        this.bord = tempBord
        return newWord
    }
}