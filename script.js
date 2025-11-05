let boxes = document.querySelectorAll(".box");
let newGameButton = document.querySelector("#new-game");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
let playerTurn = document.querySelector("#player-turn");
let turn0 = true;
let moveCount = 0;

const winpattern = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turn0 = true;
    moveCount = 0;
    enableBox();
    msgContainer.classList.add("hide");
    playerTurn.innerText = "O";
}

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const checkDraw = () => {
    if (moveCount === 9) {
        msg.innerText = "Game Draw!";
        msgContainer.classList.remove("hide");
        disableBox();
        return true;
    }
    return false;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
            playerTurn.innerText = "X";
        } else {
            box.innerText = "X";
            turn0 = true;
            playerTurn.innerText = "O";
        }
        box.disabled = true;
        moveCount++;
        
        if (!checkwinner()) {
            checkDraw();
        }
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} Wins! 🎉`;
    msgContainer.classList.remove("hide");
    disableBox();
}

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

newGameButton.addEventListener("click",resetGame);
