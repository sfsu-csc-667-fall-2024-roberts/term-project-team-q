window.onload = function() {
    checkLobbyLogin();
    loadAvailableGames();
};

function checkLobbyLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const loggedInContent = document.getElementById('loggedInContent');
    const guestContent = document.getElementById('guestContent');
    const nicknameDisplay = document.getElementById('nicknameDisplay');
    const profileIconDisplay = document.getElementById('profileIconDisplay');

    if (loggedInContent && guestContent) {
        if (isLoggedIn) {
            loggedInContent.style.display = 'block';
            guestContent.style.display = 'none';
            const nickname = localStorage.getItem('nickname') || 'User';
            if (nicknameDisplay) {
                nicknameDisplay.innerText = nickname;
            }
            if (profileIconDisplay) {
                const profileIcon = localStorage.getItem('profileIcon') || 'path/to/default/icon.png';
                profileIconDisplay.src = profileIcon;
            }
        } else {
            loggedInContent.style.display = 'none';
            guestContent.style.display = 'block';
        }
    }
}


function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileIcon');
    location.href = 'home.html';
}



function checkLobbyLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const loggedInContent = document.getElementById('loggedInContent');
    const guestContent = document.getElementById('guestContent');
    const nicknameDisplay = document.getElementById('nicknameDisplay');
    const profileIconDisplay = document.getElementById('profileIconDisplay');

    if (loggedInContent && guestContent) {
        if (isLoggedIn) {
            loggedInContent.style.display = 'block';
            guestContent.style.display = 'none';
            const nickname = localStorage.getItem('nickname') || 'User';
            if (nicknameDisplay) {
                nicknameDisplay.innerText = nickname;
            }
            if (profileIconDisplay) {
                const profileIcon = localStorage.getItem('profileIcon') || 'path/to/default/icon.png';
                profileIconDisplay.src = profileIcon;
            }
        } else {
            loggedInContent.style.display = 'none';
            guestContent.style.display = 'block';
        }
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileIcon');
    location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', function() {
    loadAvailableGames();
});

let games = JSON.parse(localStorage.getItem('games')) || [
    {
        name: 'Game 1',
        creator: 'User1',
        players: ['f1-car.png', 'salmon.png', 'bullseye.png']
    },
    {
        name: 'Game 2',
        creator: 'User2',
        players: ['bear-face.png', 'chess-bishop.png']
    },
    {
        name: 'Game 3',
        creator: 'User3',
        players: ['chess-king.png', 'chess-knight.png', 'chess-pawn.png', 'chess-queen.png', 'chess-rook.png']
    }
];

document.getElementById('createGameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const gameName = document.getElementById('gameName').value;
    const numPlayers = document.getElementById('numPlayers').value;

    games.push({
        name: gameName,
        creator: 'CurrentUser', 
        players: Array.from({ length: numPlayers }, (_, i) => `player${i + 1}.png`) 
    });

    localStorage.setItem('games', JSON.stringify(games));

    location.href = 'lobby.html';
});

function loadAvailableGames() {
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = '';

    games.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');

        const gameCreator = document.createElement('p');
        gameCreator.innerText = `${game.creator}'s game`;
        gameItem.appendChild(gameCreator);

        const gameName = document.createElement('h2');
        gameName.innerText = game.name;
        gameItem.appendChild(gameName);

        const playerIcons = document.createElement('div');
        playerIcons.classList.add('player-icons');
        game.players.forEach(player => {
            const img = document.createElement('img');
            img.src = `Icons/${player}`;
            img.alt = 'Player Icon';
            playerIcons.appendChild(img);
        });
        gameItem.appendChild(playerIcons);

        gameItem.addEventListener('click', () => {
            location.href = 'game.html';
        });

        gameList.appendChild(gameItem);
    });
}

function startGame(){
    location.href = 'game.html';
}