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

buy.addEventListener('click', async() => {
    socket.emit("action",{id: localStorage.getItem("id"), act: "BUY"});
});
ready.addEventListener('click', async() => {
    socket.emit("action",{id: localStorage.getItem("id"), act: "READY"});
});

socket.on('game', (g) => {
    /*let fields;
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 9; j++){
            fields = document.querySelector(`#row${i}str${j}`);
            fields.innerHTML = JSON.stringify(g.field[i*9+j].type);
            if(g.field[i*9+j].color){
                fields.style.background = (g.field[i*9+j].color)
            }
        }
    }*/
    let fields = document.querySelector('#fields');
    let textFields = "<table>";
    for(let i = 0; i < 7; i++){
        textFields += "<tr>";
        for(let j = 0; j < 9; j++){
            textFields += `<td id = plase${spiral[i][j]}>${JSON.stringify(g.field[spiral[i][j]].type)}</td>`;
        }
    }
    fields.innerHTML = textFields+"</tr>"
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 9; j++){
            let fieldsColor = document.querySelector(`#plase${spiral[i][j]}`);
            fieldsColor.style.background = (g.field[spiral[i][j]].color);
        }
    }

    g.players.forEach(p => {
        let fields = document.querySelector(`#plase${p.position}`);
        fields.innerHTML += `<p id="player${p.id}">${JSON.stringify(p.id)}</p>`;
        let playerX = document.querySelector(`#player${p.id}`);
        playerX.style.height = "15px";
        playerX.style.color = p.color;
        playerX.style.background = "white";
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
});
