function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        document.getElementById('nicknameInput').style.display = 'block';
        document.getElementById('guestNickname').style.display = 'none';
    } else {
        const randomNum = Math.floor(Math.random() * 1000);
        document.getElementById('guestNickname').innerText = 'Guest' + randomNum;
        document.getElementById('nicknameInput').style.display = 'none';
    }
}

window.onload = checkLogin;