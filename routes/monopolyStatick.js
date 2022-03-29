const city = [
    { type: "city", name: "Pekin", price: 300, tax: 100, img: "pekinM.jpg" },
    { type: "city", name: "Praga", price: 400, tax: 100, img: "pragaM.jpg" },
    { type: "city", name: "Vashington", price: 500, tax: 100, img: "vashingtonM.jpg" },
    { type: "city", name: "Milan", price: 600, tax: 200, img: "milanM.jpg" },
    { type: "city", name: "Kyiv", price: 700, tax: 200, img: "kyivM.jpg" },
    { type: "city", name: "Rome", price: 800, tax: 200, img: "romeM.jpg" },
    { type: "city", name: "Paris", price: 900, tax: 300, img: "parisM.jpg" },
    { type: "city", name: "Berlin", price: 1000, tax: 300, img: "berlinM.jpg" },
    { type: "city", name: "Ottava", price: 1200, tax: 300, img: "ottavaM.jpg" },
    { type: "city", name: "New-York", price: 1500, tax: 400, img: "new_yorkM.jpg" },
];

const company = {
    car: propagate({ type: "company", name: "car", img: "carM.jpg" }),
    hps: propagate({ type: "company", name: "hps", img: "hpsM.jpg" }),
    ship: propagate({ type: "company", name: "ship", img: "shipM.jpg" }),
    fifa: propagate({ type: "company", name: "fifa", img: "fifaM.jpg" }),
    plane: propagate({ type: "company", name: "plane", img: "planeM.jpg" }),
};

const companyPrices = {
    car: { min: 200, max: 1200 },
    hps: { min: 400, max: 1000 },
    ship: { min: 300, max: 1100 },
    fifa: { min: 200, max: 1400 },
    plane: { min: 500, max: 1500 },
}

const field = [
    { type: "start", img: "startM.jpg" },
    company.car[3],
    company.plane[1],
    company.car[6],
    company.hps[3],
    city[7],
    company.ship[7],
    { type: "surprise", value: -500, img: "priseM.jpg" },
    { type: "surprise", value: 1000, img: "priseM.jpg" },
    company.fifa[2],
    company.hps[7],
    company.car[2],
    { type: "surprise", value: -100, img: "priseM.jpg" },
    company.fifa[3],
    city[3],
    company.plane[6],
    company.hps[6],
    city[1],
    city[9],
    company.plane[2],
    company.fifa[0],
    city[5],
    { type: "empty", img: "emptyM.jpg" },
    company.ship[5],
    city[4],
    company.hps[2],
    city[0],
    { type: "surprise", value: -200, img: "priseM.jpg" },
    company.car[7],
    company.plane[4],
    company.fifa[1],
    company.car[4],
    city[8],
    company.car[1],
    company.ship[0],
    company.hps[4],
    company.fifa[5],
    company.hps[0],
    { type: "surprise", value: 100, img: "priseM.jpg" },
    company.car[0],
    company.ship[1],
    company.plane[7],
    company.hps[5],
    company.ship[3],
    { type: "empty", img: "emptyM.jpg" },
    { type: "surprise", value: -1000, img: "priseM.jpg" },
    company.fifa[6],
    company.fifa[7],
    { type: "empty", img: "emptyM.jpg" },
    company.plane[0],
    { type: "surprise", value: 500, img: "priseM.jpg" },
    company.plane[5],
    company.ship[4],
    company.plane[3],
    company.fifa[4],
    { type: "surprise", value: 200, img: "emptyM.jpg" },
    company.car[5],
    company.ship[2],
    city[6],
    company.ship[6],
    company.hps[1],
    city[2],
    { type: "end", img: "endM.jpg" },
]

function rand(min, max) {
    return Math.round(min + Math.random() * (max - min));
}
    
function stepChange(min, max) {
    let price = Math.round(min + Math.random() * (max - min));
    return (price*50);
}

function propagate(cell) {
    return [100, 100, 100, 200, 200, 200, 300, 300].map(tax => {
        return { ...cell, tax: tax }
    });
}
module.exports = {field, companyPrices, rand, stepChange};