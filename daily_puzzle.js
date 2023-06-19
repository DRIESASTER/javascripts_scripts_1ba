const assert = require("assert");
class Kalender{
    maanden = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "###", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "###"]
    dagen = ["Sun","Mon","Tue","Wed","###","###", "###", "###","Thu","Fri","Sat"]
    numbers = []

    constructor() {
        this.labels = []
        this.maanden.forEach((el) => this.labels.push(el))
        for(let i=1 ; i<32 ; i++){
            if(i<10){
                this.numbers.push("  " + i)
            }
            if(i>=10){
                this.numbers.push(" " +i)
            }
        }
        this.numbers.forEach((el) => this.labels.push(el))
        this.dagen.forEach((el) => this.labels.push(el))
        this.bord = [];
        for(let i=0 ; i<8 ; i++) {
            let rij = [];
            for (let k = 0; k < 7; k++) {
                rij.push(this.labels[7*i+k])
            }
            this.bord.push(rij)
        }
    }

    vakje(n){
        let rij = Math.floor(n/7)
        let kolom = n - rij*7
        return this.bord[rij][kolom]
    }

    toString(){
        let str = ""
        for(let i=0 ; i<this.bord.length ; i++){
            str+= this.bord[i].join(" ") + "\n"
        }
        return str.substring(0,str.length-1)
    }

    puzzelstuk(l){
        let coord = []
        for(let i=0 ; i<this.bord.length ; i++){
            for(let k=0 ; k<this.bord.length ; k++){
                if("#"+l+"#" === this.bord[i][k]){
                    coord.push(7*i + k);
                }
            }
        }
        assert(coord.length > 0, "puzzelstuk " + l + " ligt er niet")
        return coord;
    }

    neerleggen(l, p){
        let rij = Math.floor(p/7)
        let kolom = p - rij*7
        let coord = []
        for(let i=0 ; i<this.bord.length ; i++){
            for(let k=0 ; k<this.bord.length ; k++){
                if("#"+l+"#" === this.bord[i[k]]){
                    coord.push(8*i + 7*k);
                }
            }
        }
        for(let i=0 ; i<p.length ; i++){
            let p1 = p[i]
            let rij = Math.floor(p1/7)
            let kolom = p1 - rij*7
            assert(!this.bord[rij][kolom].match("#" + l + "#"), "puzzelstuk " + l + " ligt er al")
            assert(!this.bord[rij][kolom].match(/^#.#$/g), "puzzelstuk " + l + " kan niet gelegd worden")
            // assert(!this.bord[rij][kolom].match(/^#.#$/g), "puzzelstuk " + l + " ligt er al")
            this.bord[rij][kolom] = "#"+l+"#"
        }
        return this
    }

    wegnemen(l){
        let coord = this.puzzelstuk(l)
        for(let i=0 ; i<this.bord.length ; i++) {
            for (let k = 0; k < this.bord.length; k++) {
                if(this.bord[i][k] === "#" + l + "#"){
                    this.bord[i][k] = this.labels[7*i+k]
                }
            }
        }
        return this;
    }

    uitlezen(){
        let onbedekt = []
        for(let i=0 ; i<this.bord.length ; i++) {
            for (let k = 0; k < this.bord[0].length; k++) {
                if(this.bord[i][k].match(/^[^#]/)){
                    onbedekt.push(this.bord[i][k])
                }
            }
        }
        //kijken hoeveel onbedekten en asserten dat dit 3 is
        assert(onbedekt.length === 3, "ongeldige datum");
        let maand = ""
        let number = ""
        let dag = ""
        for(let i=0 ; i<onbedekt.length ; i++){
            if(this.maanden.includes(onbedekt[i])){
                maand = onbedekt[i];
            }
            if(this.numbers.includes(onbedekt[i])){
                number = onbedekt[i];
            }
            if(this.dagen.includes(onbedekt[i])){
                dag = onbedekt[i];
            }
        }
        //assert dat er een maand dag en nummer is gevonden
        assert(maand !== "", "ongeldige datum");
        assert(number !== "", "ongeldige datum");
        assert(dag !== "", "ongeldige datum");
        return dag + "," + number + " " + maand
    }
}