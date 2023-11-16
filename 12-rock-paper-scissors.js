const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

upDateScoreElement();


/*
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}
*/
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
	if (!isAutoPlaying) {
		intervalId = setInterval(() => {
			const playerMove = pickComputerMove();
			playGame(playerMove);
  }, 1000);
	isAutoPlaying = true;
	} else {
		clearInterval(intervalId);
		isAutoPlaying = false;
	}
}

document.querySelector(".js-rock-button")
 .addEventListener('click', () => {
    playGame('rock')
 });

 document.querySelector(".js-paper-button")
  .addEventListener("click", () => {
   playGame('paper');
 });

 document.querySelector(".js-scissors-button")
  .addEventListener('click', () => {
    playGame('scissors')
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } 
  })

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lose.';
        } else if (computerMove === 'paper') {
            result = 'You Win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.'
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You Lose.'
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'Paper') {
            result = 'You Lose.';
        } else if (computerMove === 'Scissors') {
            result = 'You Win.'
        }
    }

    if (result === 'You Win.') {
        score.wins += 1;
    } else if (result === 'You Lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    upDateScoreElement();

    document.querySelector('.js-result').
        innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
    <img src="image/${playerMove}-imoji.JPG" class="move-icon">
    <img src="image/${computerMove}-imoji.PNG" class="move-icon">
    computer`;


    localStorage.setItem('score', JSON.stringify(score));
}

function upDateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function pickComputerMove() {
    const randomMove = Math.random();

    let computerMove = '';

    if (randomMove >= 0 && randomMove < 1 / 3) {
        computerMove = 'rock';
    } else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
        computerMove = 'paper';
    } else if (randomMove >= 2 / 3 && randomMove < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}