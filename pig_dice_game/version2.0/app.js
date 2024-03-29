/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Code Challenege

- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's
turn. (Hint: Always save the previous dice roll in a spearate variable)
- Add an input field to the HTML where players can set the winning score, so that they can change the
predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is
a good oportunity to use google to figure this out)
- Add another dice to the game, so that there are two dices now. The player looses his current score
when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS
code for the first one.)
*/

var scores, roundScores, activePlayer, gamePlaying, previousDice, winningScore;

initi();

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        diceDOM = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice == 1 || dice2 == 1) {
            nextPlayer();
        } else {
            if (dice === 6 && previousDice === 6) {
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else if (dice2 === 6 && previousDice2 === 6) {
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else if (dice === 6 && previousDice2 === 6) {
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else if (dice2 === 6 && previousDice === 6) {
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else {
            // Add score
            roundScore += dice;
            roundScore += dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        }
        // Previous Dice Roll
        previousDice = dice;
        previousDice2 = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-score').addEventListener('click', function() {
    winningScore = prompt('Enter the winning score:');
    document.getElementById('winning-score').textContent = 'Score: ' + winningScore;
    document.querySelector('.btn-score').disabled = true;
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active'); // toggle() can to add if remove is present, vice versa

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initi);

function initi() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; 
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('winning-score').textContent = 'SELECT SCORE';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}
