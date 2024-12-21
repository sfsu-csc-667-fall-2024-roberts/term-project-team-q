document.addEventListener('DOMContentLoaded', function() {
    displayProfileInfo();
    startCountdown();
    loadIcons();
    displayWinner();
});

function displayProfileInfo() {
    const nicknameDisplay = document.getElementById('nicknameDisplay');
    const profileIconDisplay = document.getElementById('profileIconDisplay');

    const nickname = localStorage.getItem('nickname') || 'Nickname';
    const profileIcon = localStorage.getItem('profileIcon') || 'path/to/default/icon.png';

    nicknameDisplay.innerText = nickname;
    profileIconDisplay.src = profileIcon;
}

function displayWinner() {
    const winnerDisplay = document.getElementById('winner');
    const winner = localStorage.getItem('winner') || 'No winner';
    winnerDisplay.innerText = winner;
}


function startCountdown() {
    let countdown = 30; 
    const startNewGameButton = document.getElementById('startNewGameButton');
    startNewGameButton.innerHTML = `Starting New Game in <span id="countdown">${countdown}</span> seconds`;

    const interval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').innerText = countdown;

        if (countdown <= 0) {
            clearInterval(interval);
            location.href = 'game.html';
        }
    }, 1000);

    startNewGameButton.addEventListener('click', () => {
        clearInterval(interval);
    });
}