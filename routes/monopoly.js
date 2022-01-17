let {field, companyPrices, rand, stepChange} = require("./monopolyStatick");

class Monopoly {
    constructor() {
        this.players = [];
        this.move = 0;
        this.field = field.map((f) => { return { ...f } });
        this.companyPrices = JSON.parse(JSON.stringify(companyPrices)); // TODO make better
        this.io = null;

    }
    nextStep() {
        if (this.players.filter(p => p.money < 0).length != 0) return;
        if (this.players.filter(p => p.isReady == false).length != 0) return;
        this.setNewPrices();
        this.players.forEach((p) => {
            p.dice = rand(1, 6);
            p.position += p.dice;
            if(p.position >= field.length){
                p.position -= field.length;
                this.fullCircle(p);
            }
            this.processMove(p);
            p.isReady = false;
        });
        this.move++;
    }
    fullCircle(player) {
        player.money -= 500;
    }
    processMove(player){
        let cell = this.field[player.position];

        switch(cell.type){
            case "surprise": 
            player.money += cell.value; 
            break;
            
            case "city": 
            case "company": 
                if(cell.playerId){
                    player.money -= cell.tax;
                    let owner = this.players.find(p => p.id == cell.playerId);
                    owner.money += cell.tax;
                }
            break;
            
        }
        // TODO оповестить браузер
    }

    addPlayer(id){
        if(!this.players.find(p => p.id == id)){
            this.players.push({ id: id, position: 0, money: 8000, isReady: false });
        }
    }

    setNewPrices(){
        for(let k in this.companyPrices){ 
            let company = this.companyPrices[k];
            company.current = stepChange(company.min/50, company.max/50)
            // TODO more intersting price generator
        }
    }

    processAction(action){
        let player = this.players.find(p => p.id == action.id);
        switch(action.act){
            case "BUY": {
                let cell = this.field[player.position];
                
                if(cell.type == "company" && !cell.playerId){
                    if(player.money >= this.companyPrices[cell.name].current){
                        player.money -= this.companyPrices[cell.name].current;
                        cell.playerId = action.id;
                    }
                }
                if(cell.type == "city" && !cell.playerId){
                    if(player.money >= cell.price){
                        player.money -= cell.price;
                        cell.playerId = action.id;
                    }
                }
            } break;
            case "READY":{
                player.isReady = true;
                this.nextStep();
                console.log("ready");
            }
        }
    }
    sendState(){
        let game = {field: this.field, players: this.players, move: this.move, companyPrices: this.companyPrices};
        this.io.emit("game",game);
    }
}



//let players = [
    //{ id: 1, name: "Yura" },
    //{ id: 2, name: "Sasha" }
//]

let actionBuy = {
    id: 1,
    act: "BUY",
}
let actionReady = {
    id: 1,
    act: "READY",
}


//let game = new Monopoly(players);
///game.nextStep();
//game.processAction(actionBuy);
//let g = 0;

module.exports = {Monopoly};