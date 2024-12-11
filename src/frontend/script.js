function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const nicknameInput = document.getElementById('nicknameInput');
    const guestNickname = document.getElementById('guestNickname');

    if (nicknameInput && guestNickname) {
        if (isLoggedIn) {
            nicknameInput.style.display = 'block';
            guestNickname.style.display = 'none';
            const savedNickname = localStorage.getItem('nickname');
            if (savedNickname) {
                document.getElementById('nickname').value = savedNickname;
            }
        } else {
            const randomNum = Math.floor(Math.random() * 1000);
            guestNickname.innerText = 'Guest' + randomNum;
            nicknameInput.style.display = 'none';
        }
    }
}

function saveNickname() {
    const nickname = document.getElementById('nickname').value;
    localStorage.setItem('nickname', nickname);
    alert('Nickname saved!');
}

function saveNicknameAndPlay() {
    saveNickname();
    location.href = 'lobby.html';
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

function winPatterns() {
    alert('Displaying win patterns...');
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileIcon');
    location.href = 'home.html';
}

function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
        chatPopup.style.display = 'block';
    } else {
        chatPopup.style.display = 'none';
    }
}

function toggleProfileSettings() {
    const profilePopup = document.getElementById('profilePopup');
    if (profilePopup.style.display === 'none' || profilePopup.style.display === '') {
        profilePopup.style.display = 'block';
        loadIcons();
    } else {
        profilePopup.style.display = 'none';
    }
}

function loadIcons() {
    const iconSelection = document.getElementById('iconSelection');
    iconSelection.innerHTML = '';

    const icons = ['f1-car.png', 'salmon.png', 'bullseye.png', 'atom.png', 'bear-face.png', 
                    'hearts.png', 'chess-bishop.png', 'chess-king.png', 'chess-knight.png', 
                    'chess-pawn.png', 'chess-queen.png', 'chess-rook.png']; 
    icons.forEach(icon => {
        const img = document.createElement('img');
        img.src = `Icons/${icon}`;
        img.alt = icon;
        img.classList.add('icon-option');
        img.onclick = () => selectIcon(icon);
        iconSelection.appendChild(img);
    });
}

function selectIcon(icon) {
    localStorage.setItem('profileIcon', `./Icons/${icon}`);
    document.getElementById('profileIconDisplay').src = `./Icons/${icon}`;
}

function saveProfileSettings() {
    const newNickname = document.getElementById('newNickname').value;
    if (newNickname) {
        localStorage.setItem('nickname', newNickname);
    }
    alert('Profile settings saved!');
    location.reload();
}

window.onload = function() {
    checkLobbyLogin();
};

document.addEventListener('DOMContentLoaded', function() {
    loadAvailableGames();
});

function loadAvailableGames() {
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = '';

    // Dummy data for available games
    const games = [
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

        gameList.appendChild(gameItem);
    });
}