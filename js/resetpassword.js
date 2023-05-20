let email = "";


function backToLogin() {
    window.location.href = '../login.html';
}
async function onPageLoad() {
    email = getEmailUrlParameter();
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];

}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function onSubmit() {
    let newPassword = document.getElementById('userPasswordNew').value;
    let confirmPassword = document.getElementById('userPasswordConfirm').value;

    for (let i = 0; i < users.length; i++) {

        if (newPassword == confirmPassword) {
            console.log('Email identified and password matched');
            const changedPassword = confirmPassword;
            console.log('The new password is,', changedPassword);
            if (users[i].email == email) {
                users[i].pwd = changedPassword;
                pushToDatabase();
                showResetPwText();
                setTimeout(backToLogin(), 3000);
            }
        }
    }
}

function showResetPwText() {
    document.getElementById('forgotMyPasswordText').innerHTML = 'Password changed!<br>You will now be redirected back to login.<br>If not, please click <a class="clickHereLink" href="../login.html">here</a>!';
    document.getElementById('formResetPassword').style.display = "none";
}