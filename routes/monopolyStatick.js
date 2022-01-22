const city = [
    { type: "city", name: "Pekin", price: 300, tax: 100, img: "pekin" },
    { type: "city", name: "Praga", price: 400, tax: 100, img: "praga" },
    { type: "city", name: "Vashington", price: 500, tax: 100, img: "vashington" },
    { type: "city", name: "Milan", price: 600, tax: 200, img: "milan" },
    { type: "city", name: "Kyiv", price: 700, tax: 200, img: "kyiv" },
    { type: "city", name: "Rome", price: 800, tax: 200, img: "rome" },
    { type: "city", name: "Paris", price: 900, tax: 300, img: "paris" },
    { type: "city", name: "Berlin", price: 1000, tax: 300, img: "berlin" },
    { type: "city", name: "Ottava", price: 1200, tax: 300, img: "ottava" },
    { type: "city", name: "New-York", price: 1500, tax: 400, img: "new_york" },
];

const company = {
    car: propagate({ type: "company", name: "car", img: "pekin" }),
    hps: propagate({ type: "company", name: "hps", img: "pekin" }),
    ship: propagate({ type: "company", name: "ship", img: "pekin" }),
    fifa: propagate({ type: "company", name: "fifa", img: "pekin" }),
    plane: propagate({ type: "company", name: "plane", img: "pekin" }),
};

const companyPrices = {
    car: { min: 200, max: 1200 },
    hps: { min: 400, max: 1000 },
    ship: { min: 300, max: 1100 },
    fifa: { min: 200, max: 1400 },
    plane: { min: 500, max: 1500 },
}

const field = [
    { type: "start" },
    company.car[3],
    company.plane[1],
    company.car[6],
    company.hps[3],
    city[7],
    company.ship[7],
    { type: "surprise", value: -500 },
    { type: "surprise", value: 1000 },
    company.fifa[2],
    company.hps[7],
    company.car[2],
    { type: "surprise", value: -100 },
    company.fifa[3],
    city[3],
    company.plane[6],
    company.hps[6],
    city[1],
    city[9],
    company.plane[2],
    company.fifa[0],
    city[5],
    { type: "empty" },
    company.ship[5],
    city[4],
    company.hps[2],
    city[0],
    { type: "surprise", value: -200 },
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
    { type: "surprise", value: 100 },
    company.car[0],
    company.ship[1],
    company.plane[7],
    company.hps[5],
    company.ship[3],
    { type: "empty" },
    { type: "surprise", value: -1000 },
    company.fifa[6],
    company.fifa[7],
    { type: "empty" },
    company.plane[0],
    { type: "surprise", value: 500 },
    company.plane[5],
    company.ship[4],
    company.plane[3],
    company.fifa[4],
    { type: "surprise", value: 200 },
    company.car[5],
    company.ship[2],
    city[6],
    company.ship[6],
    company.hps[1],
    city[2],
    { type: "end" },
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