/*
GAME FUNCTION
    - Player must guess a number between a min and max.
    - Player gets a certain amount of guesses.
    - Notify players of guesses remaining.
    - Notify player of the right answer if there is a lost.
    - Let player choose to play again. 
*/

let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random()*(max-min+1)+min);
    guessesleft = 3;

    console.log(winningNum);


// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-value'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
} )

// Listen for guess 
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    
    // Valdidate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    else if (guess === winningNum) {
       gameOver(true, `${winningNum} is correct, YOU WIN!!!`);
    } else {
        // Wrong Number
        guessesleft -= 1;

        if(guessesleft === 0){
            gameOver(false, `YOU LOST. The correct number is ${winningNum}`)

        } else{
            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Set winning message
            setMessage(`Incorect!!! You have ${guessesleft} guesses left`, 'red');
        }
        
    }
});

// Set message function in case of an error 
function setMessage(errorMsg, color){
    message.style.color = color;
    message.textContent = errorMsg;
}

// Game Over
function gameOver(won, msg){
    let color;

    won === true? color = 'green': color = 'red';

    // Disable input
    guessInput.disabled = true;
       
    // Change border color
    guessInput.style.borderColor = color;

    // Set winning message
    setMessage(msg, color);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}