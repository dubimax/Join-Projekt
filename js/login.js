/**
 * Initializes the login process by downloading data from the server and populating local variables.
 * This function should be called when logging in.
 * @returns {Promise<void>} A promise that resolves once the login initialization is complete.
 */
async function initLogin() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * Redirects the user to the "forgot password" page.
 */
function showForgotMyPasswordPage() {
    window.location.href = 'forgotpassword.html';
}

/**
 * Redirects the user to the login page.
 */
function goToLogin() {
    window.location.href = './login.html';
}

/**
 * Handles the submission of a password reset request form.
 * @param {Event} event - The submit event object.
 */
async function onSubmitRQPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) getRedirected(); 
}

/**
 * Updates the HTML content and redirects the user to the login page after a successful password reset request.
 */
function getRedirected(){
    document.getElementById('forgotMyPasswordText').innerHTML = 'We have successfully sent the email.<br>You will now be redirected back to login.<br>If not please click <a class="clickHereLink" href="../login.html">here</a>!';
    document.getElementById('forgotPwForm').style.display = "none";
    setTimeout(() => goToLogin(), 3000);
}
