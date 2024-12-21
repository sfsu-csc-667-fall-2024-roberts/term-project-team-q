window.onload = function() {
    checkLogin();
    displayProfileInfo();
    checkLobbyLogin();
    loadAvailableGames();
}

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

function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'home.html';
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

function displayProfileInfo() {
    const nicknameDisplay = document.getElementById('nicknameDisplay');
    const profileIconDisplay = document.getElementById('profileIconDisplay');

    const nickname = localStorage.getItem('nickname') || 'Nickname';
    const profileIcon = localStorage.getItem('profileIcon') || 'path/to/default/icon.png';

    nicknameDisplay.innerText = nickname;
    profileIconDisplay.src = profileIcon;
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

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileIcon');
    location.reload();
    location.href = 'home.html';
}
