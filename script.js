const btnNewGame = document.getElementById('newGame')
const btnRoll = document.getElementById('roll')
const btnHold = document.getElementById('hold')
const Player1GlobalScore = document.getElementById('player1GlobalScore')
const Player2GlobalScore = document.getElementById('player2GlobalScore')
const Player1CurrentScore = document.getElementById('player1CurrentScore')
const Player2CurrentScore = document.getElementById('player2CurrentScore')
const playerOne = document.getElementById('playerOne')
const playerTwo = document.getElementById('playerTwo')
let dice = [1, 2, 3, 4, 5, 6]
const dice_icon = document.getElementById('dice_img')
const message = document.getElementById('flash-message')
let player
let dice_result


const resetStats = () => {
    Player1CurrentScore.innerText = 0
    Player1GlobalScore.innerText = 0
    Player2CurrentScore.innerText = 0
    Player2GlobalScore.innerText = 0
}

const newGame = () => {
    btnRoll.addEventListener('click', rollDice)
    btnHold.addEventListener('click', hold)
    player = 'player1'
    playerTurn()
    resetStats()
    message.innerText = 'Player 1 starts'
    message.style.display = 'block'
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

const changeImage = () => {
    let dice_img = ''
    switch (dice_result) {
        case 1:
            dice_img = 'Images/dice_one.png'
            break
        case 2:
            dice_img = 'Images/dice_two.png'
            break
        case 3:
            dice_img = 'Images/dice_three.png'
            break
        case 4:
            dice_img = 'Images/dice_four.png'
            break
        case 5:
            dice_img = 'Images/dice_five.png'
            break
        case 6:
            dice_img = 'Images/dice_six.png'
            break
    }
    dice_icon.src = dice_img
}

const handleDiceResult = (playerCurrentScore) => {
    if (dice_result === 1) {
        playerCurrentScore.innerText = 0;
        hold();
        return true;
    }
    playerCurrentScore.innerText = Number(playerCurrentScore.innerText) + dice_result;
    return false;
}

const addCurrentScore = () => {
    if (player === 'player1') {
        handleDiceResult(Player1CurrentScore);
    } else {
        handleDiceResult(Player2CurrentScore);
    }
}

const rollDice = () => {
    addClass()
    dice_result = dice[(Math.floor(Math.random() * dice.length))]
    changeImage()
    addCurrentScore()
}

function updateScoresAndSwitchPlayer(globalScore, currentScore, nextPlayer) {
    globalScore.innerText = Number(globalScore.innerText) + Number(currentScore.innerText);
    currentScore.innerText = 0;
    player = nextPlayer;
}

const hold = () => {

    if (player === 'player1') {
        updateScoresAndSwitchPlayer(Player1GlobalScore, Player1CurrentScore, 'player2');
    } else {
        updateScoresAndSwitchPlayer(Player2GlobalScore, Player2CurrentScore, 'player1');
    }

    let winningPlayer;

    if (Number(Player1GlobalScore.innerText) >= 100) {
        winningPlayer = 'Player 1 wins !';
    } else if (Number(Player2GlobalScore.innerText) >= 100) {
        winningPlayer = 'Player 2 wins !';
    }

    if (winningPlayer) {
        btnRoll.removeEventListener('click', rollDice);
        btnHold.removeEventListener('click', hold);
        message.innerText = winningPlayer;
        message.style.display = 'block'
    } else {
        playerTurn();
    }
}

const addClass = () => {
    dice_icon.classList.add('dice_animation')
    setTimeout(removeClass, 300)
}

const removeClass = () => {
    dice_icon.classList.remove('dice_animation')
}

const playerTurn = () => {
    if (player === 'player1') {
        playerTwo.classList.remove('player_turn')
        playerOne.classList.add('player_turn')
    } else {
        playerOne.classList.remove('player_turn')
        playerTwo.classList.add('player_turn')
    }
}

btnNewGame.addEventListener('click', newGame)

