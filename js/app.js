var firstNumber;
var secondNumber;
var correctGuesses = 0;

function getRandomNumber() {
    return Math.floor(Math.random() * 13) + 1;
}

function displayFirstNumber() {
    firstNumber = getRandomNumber();
    document.getElementById('firstImage').src = 'images/cards/' + firstNumber + '.svg';
    document.getElementById('secondImage').style.display = 'none'; 
}

function displaySecondNumber() {
    do {
        secondNumber = getRandomNumber();
    } while (secondNumber === firstNumber);

    document.getElementById('secondImage').src = 'images/cards/' + secondNumber + '.svg';
    document.getElementById('secondImage').style.display = 'inline';
}

function hideResult() {
    document.getElementById('result').textContent = '';
}

function guess(guess) {
    var buttons = document.querySelectorAll('#guessButtons button');
    
    // Deshabilitar todos los botones
    buttons.forEach(function(button) {
        button.disabled = true;
    });

    displaySecondNumber();
    if (guess === 'lower') {
        if (secondNumber < firstNumber) {
            document.getElementById('result').textContent = '¡Correcto! El número era más bajo.';
            correctGuesses++;
        } else {
            document.getElementById('result').textContent = '¡Incorrecto! El número era más alto.';
            correctGuesses = 0; // Reiniciar contador
        }
    } else if (guess === 'higher') {
        if (secondNumber > firstNumber) {
            document.getElementById('result').textContent = '¡Correcto! El número era más alto.';
            correctGuesses++;
        } else {
            document.getElementById('result').textContent = '¡Incorrecto! El número era más bajo.';
            correctGuesses = 0; // Reiniciar contador
        }
    }

    setTimeout(function() {
        buttons.forEach(function(button) {
            button.disabled = false;
        });
    }, 1500);

    setTimeout(hideResult, 1000);
    setTimeout(displayFirstNumber, 1000);

    // Mostrar el contador
    document.getElementById('correctCount').textContent = correctGuesses;
}

document.getElementById('guessButtons').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    guess(event.target.dataset.guess);
  }
});

displayFirstNumber();
