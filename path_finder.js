// https://dodona.ugent.be/nl/courses/1151/series/12996/activities/1430951845
const assert = require("assert");

let directions={"N":[-1,0],"O":[0,1],"Z":[1,0],"W":[0,-1]};
let signs={"ZO":"┗","WN":"┗","ZZ":"┃","NN":"┃","ZW":"┛","ON":"┛","WZ":"┏","NO":"┏","OZ":"┓","NW":"┓","OO":"━","WW":"━",};
class Puzzel{
    constructor(rijwaarden,kolomwaarden,ingang,uitgang) {
        if((ingang[0]===uitgang[0]&&ingang[1]===uitgang[1])||! (ingang[0]%(rijwaarden.length-1)===0||ingang[1]%(kolomwaarden.length-1)===0)||! (uitgang[0]%(rijwaarden.length-1)===0||uitgang[1]%(kolomwaarden.length-1)===0)||
            !(rijwaarden.every(el=> 0<=el && el<=kolomwaarden.length) && kolomwaarden.every(el=> 0<=el && el<=rijwaarden.length))){
            throw {name:"AssertionError",message:"ongeldige puzzel"};
        }

        this.ingang=ingang;
        this.uitgang=uitgang;
        this.rijwaarden=rijwaarden;
        this.kolomwaarden=kolomwaarden;
        this.rijpass=[...rijwaarden];
        this.kolompass=[...kolomwaarden];
        this.rijpass[ingang[0]]-=1;
        this.kolompass[ingang[1]]-=1;
        this.bord=[];
        for(let i=0;i<rijwaarden.length;i++){
            this.bord.push(new Array(kolomwaarden.length).fill("."));
        }
        this.bord[ingang[0]][ingang[1]]="+"
        this.bord[uitgang[0]][uitgang[1]]="#"
        this.positie=ingang;
        this.vorige="";
    }

    isBinnen(pos){
        return 0<=pos[0] && 0<=pos[1] && pos[1]<=this.kolomwaarden.length && pos[0]<=this.rijwaarden.length;
    }

    isRand(pos){
        return (pos[0]%(this.rijwaarden.length-1)===0) || (pos[1]%(this.kolomwaarden.length-1)===0);
    }

    rijPassages(r){
        if(r>this.rijwaarden.length || r<0){
            throw {name:"AssertionError",message:"ongeldige rij"};
        }
        return this.rijwaarden[r]-this.rijpass[r];
    }

    kolomPassages(k){
        if(k>this.kolomwaarden.length || k<0){
            throw {name:"AssertionError",message:"ongeldige rij"};
        }
        return this.kolomwaarden[k]-this.kolompass[k];
    }

    stap(richting){
        assert(richting in directions, "ongeldige richting")
        const [r, k] = this.positie;
        const [dx, dy] = directions[richting];
        let newPos = [r + dx, k + dy];
        let p_ = this.bord[newPos[0]]?.[newPos[1]];
        assert(p_ && (p_ === "." || p_ === "#"), "ongeldige richting");
        assert(this.isBinnen(newPos), "ongeldige richting");
        assert(this.rijpass[newPos[0]] > 0 && this.kolompass[newPos[1]] > 0, "ongeldige richting");
        this.rijpass[newPos[0]]--;
        this.kolompass[newPos[1]]--;
        if (this.vorige) this.bord[r][k]= signs[this.vorige + richting];
        this.vorige = richting;
        this.positie = newPos;
        this.bord[newPos[0]][newPos[1]]= "*";
        return newPos
    }

    toString(){
        let copy=this.bord.map(el=>[...el])
        this.bord[this.positie[0]][this.positie[1]]="*";
        let res=" "+this.kolomwaarden.join("")+"\n"
        for(let i=0;i<this.rijwaarden.length;i++){
            res+=this.rijwaarden[i]+this.bord[i].join("")+"\n";
        }
        this.bord=copy
        return res.replace(/\n$/,"");
    }
}