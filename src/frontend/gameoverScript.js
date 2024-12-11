document.addEventListener('DOMContentLoaded', function() {
    displayProfileInfo();
    startCountdown();
    loadIcons();
});

function displayProfileInfo() {
    const nicknameDisplay = document.getElementById('nicknameDisplay');
    const profileIconDisplay = document.getElementById('profileIconDisplay');

    const nickname = localStorage.getItem('nickname') || 'Nickname';
    const profileIcon = localStorage.getItem('profileIcon') || 'path/to/default/icon.png';

    nicknameDisplay.innerText = nickname;
    profileIconDisplay.src = profileIcon;
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
        img.onclick = () => selectIcon(img, icon);
        iconSelection.appendChild(img);
    });

    const currentIcon = localStorage.getItem('profileIcon');
    if (currentIcon) {
        const selectedIcon = Array.from(iconSelection.children).find(img => img.src.includes(currentIcon));
        if (selectedIcon) {
            selectedIcon.classList.add('selected');
        }
    }
}

function selectIcon(img, icon) {
    const icons = document.querySelectorAll('.icon-option');
    icons.forEach(icon => icon.classList.remove('selected'));
    img.classList.add('selected');

    localStorage.setItem('profileIcon', `Icons/${icon}`);
    document.getElementById('profileIconDisplay').src = `Icons/${icon}`;
}

function saveProfileSettings() {
    const newNickname = document.getElementById('newNickname').value;
    if (newNickname) {
        localStorage.setItem('nickname', newNickname);
    }
    alert('Profile settings saved!');
    location.reload();
}