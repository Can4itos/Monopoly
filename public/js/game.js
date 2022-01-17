function rand(min, max) {
    return Math.round(min + Math.random() * (max - min));
}
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

let fields = document.querySelector("#fields");
let players = document.querySelector("#players");
let prices = document.querySelector("#prices");
let move = document.querySelector("#move");

buy.addEventListener('click', async() => {
    socket.emit("action",{id: localStorage.getItem("id"), act: "BUY"});
});
ready.addEventListener('click', async() => {
    socket.emit("action",{id: localStorage.getItem("id"), act: "READY"});
});

socket.on('game', (g) => {
    fields.innerHTML="";
    g.field.forEach(f => {
        fields.innerHTML+= `<p>${JSON.stringify(f.type)}</p>`;
    });

    players.innerHTML="";
    g.players.forEach(p => {
        players.innerHTML+= `<div id="player${p.id}"></div>`;
        let playerX = document.querySelector(`#player${p.id}`);
        for(let i = 0; i < p.position; i++){
            playerX.innerHTML+=`<p>&nbsp;</p>`;
        }
        playerX.innerHTML+=`<pre>${JSON.stringify(p.id)}</pre>`;
        let l = 0;
    });

    prices.innerHTML=``;
    for(let p in g.companyPrices){
            prices.innerHTML+= `<p>${JSON.stringify(p)}: ${JSON.stringify(g.companyPrices[p].current)}</p>`;
    };
    
    move.innerHTML=`<p>Move№ ${JSON.stringify(g.move)}</p>`;

});
