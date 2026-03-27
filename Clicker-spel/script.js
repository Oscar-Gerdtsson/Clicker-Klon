//  Variabler

let score = 0;
function getClicksPerSecond(){return getClickPower()*autoclicker.amount/0.9**autoclickIntervalUpgrade.amount}//  score/s
function getClickPower(){return (1+clickPowerPlusUpgrade.amount)*getClickPowerEfficiency()};//  score/click
function getClickPowerEfficiency(){return 1.2**clickPowerEfficiencyUpgrade.amount}//  multiplier på click power
function getAutoclickInterval(){return 1000*0.9**autoclickIntervalUpgrade.amount};//  ms/autoclick
function getAutoclickSpeed(){return 1/0.9**autoclickIntervalUpgrade.amount};//  autoclicks/s
function setAutoclickerInflation(){autoclicker.inflation= 1+(0.2*0.9**autoclickerInflationUpgrade.amount)}//  ändrar prisökningen på autoclickers

// variabler för vissa html element
const scoreDisplay = document.getElementById("score").lastElementChild;
const clicksPerSecondDisplay = document.getElementById("clicks-per-second").lastElementChild;
const clickPowerDisplay = document.getElementById("points-per-click").lastElementChild;
const autoclickersDisplay = document.getElementById("autoclickers").lastElementChild;
const autoclickSpeedDisplay = document.getElementById("autoclicks-per-second").lastElementChild;
const targetArea = document.getElementById("click-target");
const messageArea = document.getElementById("message-area");


//  Upgraderingar
class Upgrade{
    constructor(type, id, startingPrice, Inflation, amount){
        this.type = type;
        this.id = id;
        this.startingPrice = startingPrice;
        this.inflation = Inflation;
        this.amount = amount;
    }
    get price(){return Math.floor(this.startingPrice*this.inflation**this.amount);}
}

const clickPowerPlusUpgrade = new Upgrade("click", "clickPowerPlusUpgrade", 100, 1.8, 0)
const clickPowerEfficiencyUpgrade = new Upgrade("click", "clickPowerEfficiencyUpgrade", 1000, 3, 0)
const autoclickerInflationUpgrade = new Upgrade("autoclicker", "autoclickerInflationUpgrade", 10000, 10, 0)
const autoclicker = new Upgrade("autoclicker","autoclicker", 10, 1.2, 0)
const autoclickIntervalUpgrade = new Upgrade("autoclicker","autoclickIntervalUpgrade", 100, 2.5,0)


const upgradesArr =[clickPowerPlusUpgrade, clickPowerEfficiencyUpgrade, autoclicker, autoclickIntervalUpgrade, autoclickerInflationUpgrade];



//  hämtar localstorage
if (localStorage.getItem("score")!= null) {
    score = parseInt(localStorage.getItem("score"));
}
upgradesArr.forEach(i => {
    if (localStorage.getItem(i.id+"amount")!==null) {
        i.amount = parseInt(localStorage.getItem(i.id+"amount"));
    }
});




//  Event Listeners
targetArea.addEventListener("click", click);

document.getElementById(upgradesArr[0].id).addEventListener("click", function(){buyUpgrade(upgradesArr[0])});
document.getElementById(upgradesArr[1].id).addEventListener("click", function(){buyUpgrade(upgradesArr[1])});
document.getElementById(upgradesArr[2].id).addEventListener("click", function(){buyUpgrade(upgradesArr[2])});
document.getElementById(upgradesArr[3].id).addEventListener("click", function(){buyUpgrade(upgradesArr[3])});
document.getElementById(upgradesArr[4].id).addEventListener("click", function(){buyUpgrade(upgradesArr[4])});

document.getElementById("reset-button").addEventListener("click", resetProgress);
document.getElementById("save-button").addEventListener("click", saveProgress);


//  vid start
setInterval(saveProgress, 120000);//autosave varannan minut
updateDisplay();
autoclick();

//  funktioner
function updateDisplay(){//uppdaterar stats m.m.
    scoreDisplay.innerHTML = shortenLength(score)
    clicksPerSecondDisplay.innerHTML = shortenLength(getClicksPerSecond());
    clickPowerDisplay.innerHTML = shortenLength(getClickPower());
    autoclickersDisplay.innerHTML = autoclicker.amount;
    autoclickSpeedDisplay.innerHTML = shortenLength(getAutoclickSpeed()) + "/s"
    document.getElementById("clickPowerPlusUpgrade").firstElementChild.innerHTML ="+"+shortenLength(getClickPowerEfficiency())+" Click Power"

    upgradesArr.forEach(i => {
        document.getElementById(i.id).getElementsByClassName("price")[0].innerHTML = "<b>Price: </b>"+i.price+" Clicks <b>Amount: </b>"+i.amount;
    });

    setAutoclickerInflation();// gör detta här för jag behöver skriva om mycket för att göra det på ett mer effektivt sätt
}
function saveProgress(){//sparar progress i localstorage
    upgradesArr.forEach(i => {
        localStorage.setItem(i.id+"amount", i.amount)
    });
    localStorage.setItem("score", score);
}
function autoclick(){//autoclickar baserat på intervallen, om den är för snabb så byter den till en annan funktion på en intervall
    if (getAutoclickInterval()>20) {
        score+=autoclicker.amount*getClickPower();
        updateDisplay();
        setTimeout(autoclick ,getAutoclickInterval())
    }
    else{
        setInterval(autoUpdate, 20);
    }
}
function autoUpdate(){//den här funktionen används istället för autoclick om den blir callad för ofta
    score+=autoclicker.amount*getClickPower()/getAutoclickInterval();
    updateDisplay();
}
function click(){
    score +=getClickPower();
    updateDisplay();
}
function buyUpgrade(id){//id är uppgraderingen man köper
    if (score>=id.price) {
        score-=id.price;
        id.amount++;
        updateDisplay();
    }
}
function resetProgress(){
    localStorage.clear();
    location.reload();
}
function shortenLength(num){//gör tal med lång decimal expansion kortare så de får plats i stats
    return Math.round(10*num)/10
}






//  testing


