// https://dodona.ugent.be/nl/courses/1151/series/12995/activities/1603574206
const assert = require("assert");
class Rooster {
    rooster;
    getalRooster = []
    ad = {}
    constructor(rooster) {
        for(let i=1 ; i<=rooster.length ; i++){
            assert(rooster.includes(i), "ongeldige getallen")
        }
        assert(Number.isInteger(Math.sqrt(rooster.length)), "ongeldige getallen");

        rooster.forEach((x) => this.ad[x] = true);
        //2dim array van rooster maken
        const LENGTH = Math.sqrt(rooster.length);
        this.rooster = []
        for(let i = 0; i < rooster.length; i+=LENGTH){
            this.rooster.push(rooster.slice(i,i+LENGTH).join(" "))
        }

        for (let i = 0; i < this.rooster.length; i++) {
            this.rooster[i] = (this.rooster[i].replace(/ $/, "")).split(" ")
        }
        this.rooster.forEach((rij) => {
            this.getalRooster.push(rij.slice())
        })
    }
    toString() {
        let returnValue = ""
        let padding = (this.rooster.length **2).toString().length

        returnValue = this.rooster.map(e => e.map(a => a.padStart(padding, " ")).join(" ")).join("\n")
        return returnValue;
    }

    getal(x, y){
        assert((x >= 0 && y>= 0 && x< this.rooster.length && y< this.rooster.length), "ongeldige positie")
        return this.getalRooster[x][y];
    }

    positie(x){
        let rijIndex = -1;
        let kolomIndex = -1;
        this.getalRooster.forEach((rij) => {
            if(rij.includes(x.toString())){
                rijIndex = this.getalRooster.indexOf(rij);
                kolomIndex = rij.indexOf(x.toString())
            }
        })
        assert((rijIndex >= 0 && kolomIndex>= 0), "getal niet gevonden")
        return [rijIndex, kolomIndex]
    }

    selecteer(x){
        assert(x <= this.rooster.length **2, "getal niet gevonden")
        assert(this.ad[x] === true, "ongeldige selectie")
        let coord = this.positie(x);
        for(let i=0 ; i<this.rooster[coord[0]].length ; i++){
            this.ad[this.rooster[coord[0]][i]] = false;
            if(this.rooster[coord[0]][i] != x.toString()){
                this.rooster[coord[0]][i] = "-"
            }
        }

        for(let i=0 ; i<this.rooster.length ; i++){
            this.ad[this.rooster[i][coord[1]]] = false;
            if(this.rooster[i][coord[1]] != x.toString()){
                this.rooster[i][coord[1]] = "-"
            }
        }
        return this;
    }

    isGeschrapt(x, y){
        return this.rooster[x][y] == "-"
    }
}