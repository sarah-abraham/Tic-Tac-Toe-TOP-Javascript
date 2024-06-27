let gridElement = document.querySelectorAll(".grid-ele");
const resetBtn = document.querySelector(".reset-btn");
let resultContainer = document.querySelector(".result-container");
let resultAndTurnText = document.querySelector(".result-turn-text");
const startBtn = document.querySelector(".start-btn");
const p1Name = document.querySelector("#p1-name");
const p1Symbol = document.querySelectorAll('input[name="p1-symbol"]');
const p2Name = document.querySelector("#p2-name");
const p2Symbol = document.querySelectorAll('input[name="p2-symbol"]');
const playerForm = document.querySelector(".player-form");
let resultFlag = 0, playFlag = 0;
function Gameboard(){
    let gameboard = [1,2,3,4,5,6,7,8,9];
    function setGameboard(ind, symbol){
        if(gameboard[ind] === "X" || gameboard[ind] ==="O"){
            alert("SYMBOL IS ALREADY PRESENT AT THIS POSITION");
            return false;
        }
        gameboard[ind] = symbol;
        return true;
    }

    function viewGameboard(){
        let board = 
            gameboard[0] + " | " + gameboard[1] + " | " + gameboard[2] + "\n" +
            "----------" + "\n" +
            gameboard[3] + " | " + gameboard[4] + " | " + gameboard[5] + "\n" +
            "----------" + "\n" +
            gameboard[6] + " | " + gameboard[7] + " | " + gameboard[8];
        
        console.log(board);
    }

    return {setGameboard,viewGameboard}
}

function players(id, name, symbol){
    return {id, name, symbol};
}

function playGame(gb, move, player, winObj, tieObj){
    flag = gb.setGameboard(move-1, player.symbol);
    if(flag === false){
        return false;
    }


    if(player.id === 1){
        winObj.updateP1Score(move);
    }
    else{
        winObj.updateP2Score(move);
    }
    
    tieObj.updateCount();
    gb.viewGameboard();
    if(winObj.checkWinner() ||  tieObj.checkTie()){ 
        return true;
        ;}
    return true;
}

function win(){
    const winningCombinations = [
        [1,2,3],[4,5,6],[7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9],[3,5,7]
    ]
    let p1score=[], p2score=[];
    function updateP1Score(move1){
        p1score.push(move1);
        console.log(p1score);
    }
    function checkWinningCombo(moves){
        return winningCombinations.some(combination => combination.every(index => moves.includes(index)));
    }
    function updateP2Score(move2){
        p2score.push(move2);
        console.log(p2score);
    }
    function checkWinner(){
        if(checkWinningCombo(p1score)){
            resultAndTurnText.textContent = "Player 1 wins the game!";
            resultFlag = 1;
            return true;
        }
        else if(checkWinningCombo(p2score)){
            resultAndTurnText.textContent = "Player 2 wins the game!";
            resultFlag = 1;
            return true;
        }
        return false;
    }
    return {updateP1Score, updateP2Score, checkWinner}
}

function tie(){
    let count = 0;
    function updateCount(){
        count++;
    }
    function checkTie(){
        if(count===9){
            resultAndTurnText.textContent = "It's a tie";
            resultFlag = 1;
            return true;
        }
        return false;
    }
    return {updateCount, checkTie}
}

function clearGrid(){
    location.reload();
}

function validation(){
    console.log("validating");
    let radioValue1, radioValue2;
    let radio1flag = 1, radio2flag = 1;
    p1Symbol.forEach(element => {
        if(element.checked){
            radioValue1 = element.value;
            radio1flag = 0;
        }
    })
    p2Symbol.forEach(element => {
        if(element.checked){
            radioValue2 = element.value;
            radio2flag = 0;
        }
    })

    if(!p1Name.value){
        alert("Enter player 1's name");
        return false;
    }
    else if(!p2Name.value === ""){
        alert("Enter player 2's name")
        return false;
    }
    else if(radio1flag === 1){
        alert("Please choose a symbol for player 1");
        return false;
    }
    else if(radio2flag === 1){
        alert("Please choose a symbol for player 2");
        return false;
    }
    else if(radioValue1 === radioValue2){
        alert("Players cannot choose same symbol");
        return false;
    }
    
    return true;
}

let p1;
let p2;
const winObj = win();
const tieObj = tie();
let last = p2;
const gb = Gameboard();
let playGameResponseFlag;




let i = 1;


startBtn.addEventListener('click', () => {
    if(!validation()){
        console.log("not in here")
        return;
    }
    playFlag = 1;
    p1Symbol.forEach((radio) => {
        if (radio.checked) {
            p1SymbolValue = radio.value;
            radio.checked = false;
        }
    });
    p2Symbol.forEach((radio) => {
        if (radio.checked) {
            p2SymbolValue = radio.value;
            radio.checked = false;
        }
    });
    p1 = players(1, p1Name.value, p1SymbolValue);
    console.log(p1);
    p2 = players(2, p2Name.value, p2SymbolValue);
    console.log(p2);
    
    playerForm.style.visibility = 'hidden';
    resultAndTurnText.textContent = p1.name + "'s turn now.";

})


    gridElement.forEach(element => {
        element.addEventListener('click', (event) => {
        console.log(i);
        console.log(parseInt(event.target.id));
        if(playFlag === 1){
            if(i%2!=0){
                playGameResponseFlag = playGame(gb, parseInt(event.target.id), p1, winObj, tieObj);
                if(playGameResponseFlag === true){
                    if(resultFlag === 0){
                        resultAndTurnText.textContent = p2.name + "'s turn now.";
                    }
        
                    element.textContent = p1.symbol;
                    i++;
                }
            }
            else{
                
                playGameResponseFlag = playGame(gb, parseInt(event.target.id), p2, winObj, tieObj);
                
                if(playGameResponseFlag === true){
                    if(resultFlag === 0){
                        resultAndTurnText.textContent = p1.name + "'s turn now.";
                    }
                  
                    element.textContent = p2.symbol;
                    i++;
                }
            }
        }
        
    })})
    


resetBtn.addEventListener('click', () => {
    clearGrid();
})


