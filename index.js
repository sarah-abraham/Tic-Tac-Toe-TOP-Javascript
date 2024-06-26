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

function players(name, symbol){
    return {name, symbol};
}

function playGame(gb, p1, p2){
    const p1_choice = p1["symbol"];
    const p2_choice = p2["symbol"];
    const winObj = win();
    const tieObj = tie();
    let move1, move2;
    while(!winObj.checkWinner() && !tieObj.checkTie()){
        flag=false;
        while(!flag){
            move1=parseInt(prompt("Player 1: Enter the number on the board on which you want to place your symbol"));
            flag=gb.setGameboard(move1-1, p1_choice);
        }
        winObj.updateP1Score(move1);
        tieObj.updateCount();
        gb.viewGameboard();
        if(winObj.checkWinner() ||  tieObj.checkTie()){ break;}
        
        flag=false;
        while(!flag){
            move2=parseInt(prompt("Player 2: Enter the number on the board on which you want to place your symbol"));
            flag=gb.setGameboard(move2-1, p2_choice);
        }
        winObj.updateP2Score(move2);
        tieObj.updateCount();
        gb.viewGameboard();
        if(winObj.checkWinner() ||  tieObj.checkTie()){ break;}
    }
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
            alert("Player 1 wins!");
            return true;
        }
        else if(checkWinningCombo(p2score)){
            alert("Player 2 wins!");
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


// const p1 = players("Alice", "X");
// const p2 = players("Bob", "O");
// const gb = Gameboard();
// console.log(p1);
// console.log(p2);
// gb.viewGameboard();
// playGame(gb, p1, p2);


let gridElement = document.querySelectorAll(".grid-ele");
gridElement.forEach(element => {element.addEventListener('click', () => {
    element.textContent = "X";
    console.log("AHA");
})})