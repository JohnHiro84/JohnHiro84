let money = 10000;
let your_spin = [];
let bet = 0;
let payout = 0;
let roll_options = ["Diamond", "Gold", "Seven", "Kale", "Cherry", "Banana", "Tab"];
let congratsMessegeType = "";

//sound effects/music
var lever_sfx = document.createElement("audio");
lever_sfx.src = "./sfx/lever.wav";

var panelstop = document.createElement("audio");
panelstop.src = "./sfx/panelstop.wav";

var mildsuccess = document.createElement("audio");
mildsuccess.src = "./sfx/mildsuccess.wav";

var bigsuccess = document.createElement("audio");
bigsuccess.src = "./sfx/bigsuccess.wav";

var jackpot = document.createElement("audio");
jackpot.src = "./sfx/jackpot.mp3";
//
var journey = document.createElement("audio");
journey.src = "./sfx/journey.mp3";


function updateMoneyDisplay(){
  document.getElementById("money-display").innerHTML = money.toFixed(2);
}

function musicBet(){
  if( bet === 77){
    journey.play();
    document.getElementById("messege-box").innerHTML = "Playing music";
  } else if (bet === 88){
    journey.pause();
  }
}

function validateAndPlaceBet(){
  bet = Number(document.getElementById("bet-amount").value);
  console.log(bet);
  musicBet();
  if(bet === 0 || bet < 0){
    document.getElementById("messege-box").innerHTML = "Enter amount greater than 0";
    return false;
  } else if (bet > money){
    document.getElementById("messege-box").innerHTML = "You need more money";
    return false;
  }

  money = money - bet;
  updateMoneyDisplay();
  return true;
}


function generateSpin(){
  for(i =0; i< 3;i++){
    let index = Math.floor(Math.random() * roll_options.length);
    your_spin.push(roll_options[index]);
  }
// your_spin = ["Kale", "Kale", "Kale"];
// your_spin = ["Diamond", "Diamond", "Diamond"];
}



//Big Payoff - Three In a Row
function threeInARow(){
  const allEqual = arr => arr.every(v => v === arr[0]);
  if(allEqual(your_spin) === false){
    return 0;
  } else {
    if(your_spin[0] === "Diamond"){
      return bet * 100;
    } else if(your_spin[0] === "Gold"){
      return bet * 50;
    } else if(your_spin[0] === "Kale"){
      return bet * 30;
    } else if(your_spin[0] === "Seven"){
      return bet * 7;
    } else if(your_spin[0] === "Cherry"){
      return bet * 5;
    } else if(your_spin[0] === "Tab"){
      return bet * 3;
    } else if(your_spin[0] === "Banana"){
      return bet * 2;
    }
  }
}

//Small Payoff
function littlePayoff(){
let multiplcation_factor = 0;
    for(i in your_spin){
        if(your_spin[i] ==="Diamond"){
          multiplcation_factor +=.48;
        }
        if(your_spin[i] ==="Gold"){
          multiplcation_factor +=.45;
        }
        if(your_spin[i] ==="Kale"){
          multiplcation_factor +=.43;
        }
        if(your_spin[i] ==="Seven"){
          multiplcation_factor +=.38;
        }
        if(your_spin[i] ==="Cherry"){
          multiplcation_factor +=.23;
        }
    }
    let output_amount = Math.floor((multiplcation_factor * bet));
    return output_amount;
}

//calculate either threeInARow payoff or a little payoff
function calculatePayout(){

  let checkThrees = threeInARow();
  if(checkThrees > 0){
    congratsMessegeType = your_spin[0];
    return checkThrees;
  } else {
    congratsMessegeType = "standard";
    return littlePayoff();
  }

}

function setPanelOneDelayed(){
  document.getElementById("panel1").className = your_spin[0];
}

function setPanelTwoDelayed(){
  document.getElementById("panel2").className = your_spin[1];
}

function setPanelThreeDelayed(){
  document.getElementById("panel3").className = your_spin[2];
}

//display the panels at time intervals of 1sec, 3sec and 5sec
function addPanelPictures(){

  setTimeout('setPanelOneDelayed()', 3000);
  setTimeout('setPanelTwoDelayed()', 5000);
  setTimeout('setPanelThreeDelayed()', 7000);

}

function activatePanelLights(){
  document.getElementById("panel1").className = "panel-flash-active";
  document.getElementById("panel2").className = "panel-flash-active";
  document.getElementById("panel3").className = "panel-flash-active";
}

function playSounds(){

lever_sfx.play();
  setTimeout('panelstop.play()', 3000);
  setTimeout('panelstop.play()', 5000);
  setTimeout('panelstop.play()', 7000);

}

function resetVariables(){

  your_spin = [];
  document.getElementById("messege-box").innerHTML = "";
}


function gameMessage(){
  let messege;
  if(congratsMessegeType === "standard" || congratsMessegeType === "Cherry"
  || congratsMessegeType === "Tab" || congratsMessegeType === "Banana"){
    messege = ("You won $" + payout);
    mildsuccess.play();
    // journey.play();

  } else if(congratsMessegeType === "Diamond"){
    messege = ("You won the Jackpot! $" + payout);
    jackpot.play();
    //maybe add flashing lights

  } else if(congratsMessegeType ==="Gold" || congratsMessegeType === "Kale" ||
    congratsMessegeType ==="Seven"){
    bigsuccess.play();
    messege = ("Whoa! Big Win! $" + payout);
  }
  document.getElementById("messege-box").innerHTML = messege;
}

function updateWinnings(){
  money += payout;
  updateMoneyDisplay();
}

function toggleButton(){

  if(document.querySelector('button').disabled === true){
    document.querySelector('button').disabled = false;
  } else {
    document.querySelector('button').disabled = true;
  }
}



function spin(){
  toggleButton();
  resetVariables();
  if(validateAndPlaceBet() === false){
    toggleButton();
    return;
  }
  generateSpin();
  payout = calculatePayout();

  //change the front end display
  activatePanelLights();
  playSounds();
  addPanelPictures();
  setTimeout('gameMessage()', 8500);
  setTimeout('updateWinnings()', 8500);
  setTimeout('toggleButton()', 8500);
}
