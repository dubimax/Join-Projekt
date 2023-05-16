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
async function onSubmitRQPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) window.location.href = './login.html';
}
