let defaultTarget = 5;
let userScore = 0;
let computerScore = 0;
let winnerClass = "";

let gameChoices = document.querySelectorAll(".game");
addGameOption();        

let selectedChoices = document.querySelector(".selectedChoices");
selectedChoices.setAttribute("style", "display:none");

let targetScore = document.querySelector("#targetScore");

let playerName = document.querySelector("#playerName");        
playerName.addEventListener("change", setNickName);

let nickName = document.querySelectorAll(".nickName");

let details = document.querySelectorAll(".details");

let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", resetAll);                                

let finalWinner = document.querySelector("#winner");
let userPoint = document.querySelector("#userPoint");
let computerPoint = document.querySelector("#computerPoint");
let userOption = document.querySelector("#userOption");
let computerOption = document.querySelector("#computerOption");

function setNickName(){
    playerName.value = playerName.value || "User";
    [...nickName].map((nick)=>{
        nick.innerHTML = playerName.value;
    });            
}

function addGameOption(){
    [...gameChoices].map((game)=>{
        let choice = game.getAttribute("alt");
        game.setAttribute("title", choice);
        game.addEventListener("click", playGame, false);
        game.play = choice;
    });
}

function playGame(event){
    [...details].map((detail) => {
        detail.setAttribute("readonly", true);
    });

    let userChoice = event.currentTarget.play;    
    let choices = ['rock', 'paper', 'scissors'];
    let computerChoice = choices[Math.floor(Math.random() * 3)];
    let winner = findWinner(userChoice, computerChoice);
    finalWinner.classList = "";    

    userOption.innerHTML = userChoice;
    computerOption.innerHTML = computerChoice;
    selectedChoices.setAttribute("style", "display:block");
    finalWinner.classList = winnerClass;
    finalWinner.innerHTML = winner;
    userPoint.innerHTML = userScore;
    computerPoint.innerHTML = computerScore;
    
    if(userScore == targetScore.value){
        playerName.value = playerName.value || "User";
        playerWins = "Congrats! "+playerName.value+" wins";
        alert(playerWins);
        stopPlay();
        finalWinner.innerHTML = playerWins;
    }else if(computerScore == targetScore.value){
        alert("CPU wins");
        stopPlay();
        finalWinner.innerHTML = "Final winner : CPU";
    }
}

function findWinner(userChoice, computerChoice){
    if(userChoice === computerChoice){
        winnerClass = "tie";
        return "It's a tie";
    }
    switch (userChoice) {
        case "rock":
            if(computerChoice == "paper"){
                computerScore++;
                winnerClass = "lose";
                return "CPU wins";
            }else if(computerChoice == "scissors"){
                userScore++;
                winnerClass = "win";
                return "User wins";
            }
        break;

        case "paper":
            if(computerChoice == "rock"){
                userScore++;
                winnerClass = "win";
                return "User wins";
            }else if(computerChoice == "scissors"){
                computerScore++;
                winnerClass = "lose";
                return "CPU wins";
            }
        break;
        
        case "scissors":
            if(computerChoice == "rock"){
                computerScore++;
                winnerClass = "lose";
                return "CPU wins";                        
            }else if(computerChoice == "paper"){
                userScore++;
                winnerClass = "win";
                return "User wins";
            }    
        break;
    }
}

function stopPlay(){
    [...gameChoices].map((game)=>{
        game.removeEventListener("click", playGame);
    });
    selectedChoices.setAttribute("style", "display:none");            
}

function resetAll(){
    userScore = 0;
    computerScore = 0;
    targetScore.value = 5;
    [...nickName].map((nick)=>{
        nick.innerHTML = "User";
    });

    [...details].map((detail) => {
        detail.removeAttribute("readonly");
    });

    playerName.value="";
    userOption.innerHTML = "";
    computerOption.innerHTML = "";
    finalWinner.classList = "";
    finalWinner.innerHTML = "Choose your move!";
    userPoint.innerHTML = 0;
    computerPoint.innerHTML = 0;
    selectedChoices.setAttribute("style", "display:none");

    addGameOption();
    targetScore.focus();
}