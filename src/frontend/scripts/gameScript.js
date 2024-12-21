document.addEventListener('DOMContentLoaded', function() {
    displayProfileInfo();
    generateBingoBoard();
    startNumberCalling();
});

let calledNumbers = [];
let interval;

function displayProfileInfo() {
    const nicknameDisplay = document.getElementById('nicknameDisplay');
    const profileIconDisplay = document.getElementById('profileIconDisplay');

    const nickname = localStorage.getItem('nickname') || 'Nickname';
    const profileIcon = localStorage.getItem('profileIcon') || 'path/to/default/icon.png';

    nicknameDisplay.innerText = nickname;
    profileIconDisplay.src = profileIcon;
}

function generateBingoBoard() {
    const bingoBoard = document.getElementById('bingoBoard');
    bingoBoard.innerHTML = '';

    const numbers = getRandomNumbers(25, 1, 50);

    numbers.forEach(number => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.innerText = number;
        cell.addEventListener('click', () => {
            cell.classList.toggle('selected');
        });
        bingoBoard.appendChild(cell);
    });
}

function getRandomNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNum);
    }
    return Array.from(numbers);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startNumberCalling() {
    interval = setInterval(callNumber, 3000); 
}

function callNumber() {
    const availableNumbers = Array.from({ length: 50 }, (_, i) => i + 1).filter(num => !calledNumbers.includes(num));
    if (availableNumbers.length === 0) {
        clearInterval(interval);
        alert('All numbers have been called!');
        return;
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const calledNumber = availableNumbers[randomIndex];
    calledNumbers.push(calledNumber);
    document.getElementById('calledNumber').innerText = calledNumber;
    setRandomColor();
}

function setRandomColor() {
    const calledNumberElement = document.getElementById('calledNumber');
    let randomColor;
    do {
        randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (isColorTooLight(randomColor));
    calledNumberElement.style.backgroundColor = randomColor;
}

function isColorTooLight(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200; 
}

function checkBingo() {
    const cells = document.querySelectorAll('.bingo-cell');
    const selectedCells = Array.from(cells).filter(cell => cell.classList.contains('selected'));
    const selectedNumbers = selectedCells.map(cell => parseInt(cell.innerText));

    const board = Array.from(cells).map(cell => ({
        number: parseInt(cell.innerText),
        selected: cell.classList.contains('selected')
    }));

    const isBingo = checkRows(board) || checkColumns(board) || checkDiagonals(board);

    if (isBingo) {
        clearInterval(interval);
        alert('Bingo! You win!');
        localStorage.setItem('winner', localStorage.getItem('nickname') || 'User');
        location.href = 'gameOver.html';
    } else {
        alert('Not Bingo yet. Keep playing!');
    }
}

function checkRows(board) {
    for (let i = 0; i < 5; i++) {
        const row = board.slice(i * 5, i * 5 + 5);
        if (row.every(cell => cell.selected && calledNumbers.includes(cell.number))) {
            return true;
        }
    }
    return false;
}

function checkColumns(board) {
    for (let i = 0; i < 5; i++) {
        const column = [board[i], board[i + 5], board[i + 10], board[i + 15], board[i + 20]];
        if (column.every(cell => cell.selected && calledNumbers.includes(cell.number))) {
            return true;
        }
    }
    return false;
}

function checkDiagonals(board) {
    const diagonal1 = [board[0], board[6], board[12], board[18], board[24]];
    const diagonal2 = [board[4], board[8], board[12], board[16], board[20]];

    return (
        diagonal1.every(cell => cell.selected && calledNumbers.includes(cell.number)) ||
        diagonal2.every(cell => cell.selected && calledNumbers.includes(cell.number))
    );
}

function startNewGame() {
    calledNumbers = [];
    document.getElementById('calledNumber').innerText = '-';
    generateBingoBoard();
    clearInterval(interval);
    startNumberCalling();
}