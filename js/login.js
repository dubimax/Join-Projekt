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