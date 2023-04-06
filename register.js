let users = [];
setURL('http://developerakademie.com/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

function addUser(){
     let name = document.getElementById('name');
     let email = document.getElementById('email');
     let password = document.getElementById('password'); 
     users.push(name.value, email.value, password.value);
     backend.setItem('users', JSON.stringify(users));
     
     window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}