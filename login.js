async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value ); 
    console.log(user);
    if(user){
        console.log('User gefunden'); 
    }
}