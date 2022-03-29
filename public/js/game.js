function rand(min, max) {
    return Math.round(min + Math.random() * (max - min));
}
let spiral = [[0,1,2,3,4,5,6,7,8],
[27,28,29,30,31,32,33,34,9],
[26,47,48,49,50,51,52,35,10],
[25,46,59,60,61,62,53,36,11],
[24,45,58,57,56,55,54,37,12],
[23,44,43,42,41,40,39,38,13],
[22,21,20,19,18,17,16,15,14]];

let game;
let idForSale = "";

var socket = io();
if(!localStorage.getItem("id")){
    localStorage.setItem("id", rand(1,1000000));
};
socket.on('connect', function() {
    socket.emit("setId", localStorage.getItem("id"));
});
let buy = document.querySelector("#buy");
let ready = document.querySelector("#ready");
let prices = document.querySelector("#prices");
let move = document.querySelector("#move");
let money = document.querySelector("#money");
let sell = document.querySelector('#sell');
sell.disabled = true;


sell.addEventListener('click', async () => {
    socket.emit("action",{id: localStorage.getItem("id"), act: "SELL", idCell: idForSale});
    sell.disabled = true;
});
buy.addEventListener('click', async() => {
    socket.emit("action",{id: localStorage.getItem("id"), act: "BUY"});
});
ready.addEventListener('click', async() => {
    socket.emit("action",{id: localStorage.getItem("id"), act: "READY"});
});

socket.on('game', (g) => {
    let fields = document.querySelector('#fields');
    let textFields = "<table id = 'table'>";
    for(let i = 0; i < 7; i++){
        textFields += "<tr>";
        for(let j = 0; j < 9; j++){
            textFields += `<td id = place${spiral[i][j]}></td>`;
        }
    }
    fields.innerHTML = textFields+"</tr>"
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 9; j++){
            let fieldsColor = document.querySelector(`#place${spiral[i][j]}`);
            fieldsColor.style = `background-image: url(img/${g.field[spiral[i][j]].img});`
            if(g.field[spiral[i][j]].playerId){
                fieldsColor.innerHTML = `<div id = "buyed" style = 'background-color:${g.field[spiral[i][j]].color};'></div>`
            }
        }
    }
    g.players.forEach(p => {
        let fields = document.querySelector(`#place${p.position}`);
        fields.innerHTML += `<div class = "player" id="player${p.id}"></div>`;
        let playerX = document.querySelector(`#player${p.id}`);
        playerX.style.background = p.color;
    });
    prices.innerHTML=``;
    for(let p in g.companyPrices){
            prices.innerHTML+= `<p>${JSON.stringify(p)}: ${JSON.stringify(g.companyPrices[p].current)}</p>`;
    };
    move.innerHTML=`<p>Move№ ${JSON.stringify(g.move)}</p>`;
    money.innerHTML=``;
    g.players.forEach(p => {
        money.innerHTML += `<p>${JSON.stringify(p.id)}: ${JSON.stringify(p.money)}`;
    });
    let table = document.querySelector('table');
    table.addEventListener('click', function(e){
        idForSale = e.target.id.slice(5);
        if(g.field[idForSale].playerId == localStorage.getItem("id")){
            sell.disabled = false;
        }else{
            sell.disabled = true;
        }
    });
});
