/**
 * Initializing the Login Page
 */
async function initLogin() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

function showForgotMyPasswordPage() {
    window.location.href = 'forgotpassword.html';
}

function goToLogin() {
    window.location.href = './login.html';
}
async function onSubmitRQPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) 
    document.getElementById('forgotMyPasswordText').innerHTML = 'We have successfully sent the email.<br>You will now be redirected back to login.<br>If not please click <a class="clickHereLink" href="../login.html">here</a>!';
    document.getElementById('forgotPwForm').style.display = "none";
    setTimeout(goToLogin, 3000);
}

