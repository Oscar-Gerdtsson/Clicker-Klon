//  Variables
let score = 0;
function getClicksPerSecond(){return Math.floor(10*getClickPower()*autoclicker.amount/0.9**autoclickIntervalUpgrade.amount)/10}
function getClickPower(){return 1+clickPowerUpgrade.amount};
function getAutoclickInterval(){return 1000*0.9**autoclickIntervalUpgrade.amount};
function getAutoclickSpeed(){return Math.round(10/0.9**autoclickIntervalUpgrade.amount)/10};

const scoreDisplay = document.getElementById("score");
const clicksPerSecondDisplay = document.getElementById("clicks-per-second");
const clickPowerDisplay = document.getElementById("points-per-click");
const autoclickersDisplay = document.getElementById("autoclickers");
const autoclickSpeedDisplay = document.getElementById("autoclicks-per-second");
const targetArea = document.getElementById("click-target");
const messageArea = document.getElementById("message-area");

//  Upgrades
class Upgrade{
    constructor(type, id, startingPrice, priceIncrease, amount){
        this.type = type;
        this.id = id;
        this.startingPrice = startingPrice;
        this.priceIncrease = priceIncrease;
        this.amount = amount;
    }
    get price(){return Math.floor(this.startingPrice*this.priceIncrease**this.amount);}
}

const clickPowerUpgrade = new Upgrade("click","clickPowerUpgrade", 100,1.8,0);
const autoclicker = new Upgrade("autoclicker","autoclicker", 10, 1.2, 0)
const autoclickIntervalUpgrade = new Upgrade("autoclicker","autoclickIntervalUpgrade", 100, 2.5,0)

const upgradesArr =[clickPowerUpgrade, autoclicker, autoclickIntervalUpgrade];



//  Get localStorage
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

document.getElementById("reset").addEventListener("click", restart);


//  On Start
updateDisplay();
autoclick();

//  Basic Functions
function updateDisplay(){
    scoreDisplay.innerHTML = "<b>Clicks: </b>" + score;
    clicksPerSecondDisplay.innerHTML = "<b>Per Second: </b>" + getClicksPerSecond();
    clickPowerDisplay.innerHTML = "<b>Click Power: </b>" + getClickPower();
    autoclickersDisplay.innerHTML = "<b>Autoclickers: </b>" + autoclicker.amount;
    autoclickSpeedDisplay.innerHTML = "<b>Autoclick Speed: </b>" + getAutoclickSpeed() + "/s"

    upgradesArr.forEach(i => {
        document.getElementById(i.id).getElementsByClassName("price")[0].innerHTML = "<b>Price: </b>"+i.price+" Clicks";
        localStorage.setItem(i.id+"amount", i.amount)
    });
    localStorage.setItem("score", score);
}
function autoclick(){
    score+=autoclicker.amount*getClickPower();
    updateDisplay();
    setTimeout(autoclick ,getAutoclickInterval())
}
function click(){
    score +=getClickPower();
    updateDisplay();
}
function buyUpgrade(id){
    if (score>=id.price) {
        score-=id.price;
        id.amount++;
        updateDisplay();
    }
}
function restart(){
    localStorage.clear();
    location.reload();
}






//  testing


