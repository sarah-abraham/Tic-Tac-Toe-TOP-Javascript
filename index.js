let gridElement = document.querySelectorAll(".grid-ele");
const resetBtn = document.querySelector(".reset-btn");
let resultContainer = document.querySelector(".result-container");
let resultText = document.querySelector(".result-text");
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
            resultText.textContent = "Player 1 wins the game!";
            return true;
        }
        else if(checkWinningCombo(p2score)){
            resultText.textContent = "Player 2 wins the game!";
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
            alert("It's a tie")
            return true;
        }
        return false;
    }
    return {updateCount, checkTie}
}

function clearGrid(){
    location.reload();
}


const p1 = players(1, "Alice", "X");
const p2 = players(2, "Bob", "O");
const winObj = win();
const tieObj = tie();
let last = p2;
const gb = Gameboard();
let playGameResponseFlag;




let i = 1;
gridElement.forEach(element => {element.addEventListener('click', (event) => {
    console.log(i);
    console.log(parseInt(event.target.id));
    if(i%2!=0){
        playGameResponseFlag = playGame(gb, parseInt(event.target.id), p1, winObj, tieObj);
        if(playGameResponseFlag === true){
            element.textContent = p1.symbol;
            i++;
        }
    }
    else{
        playGameResponseFlag = playGame(gb, parseInt(event.target.id), p2, winObj, tieObj);
        if(playGameResponseFlag === true){
            element.textContent = p2.symbol;
            i++;
        }
    }
})})

resetBtn.addEventListener('click', () => {
    clearGrid();
})

