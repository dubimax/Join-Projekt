let email = "";


function backToLogin() {
    window.location.href = 'login.html';
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

async function onSubmit() {
    let newPassword = document.getElementById('userPasswordNew').value;
    let confirmPassword = document.getElementById('userPasswordConfirm').value;

    for (let i = 0; i < users.length; i++) {

        if (newPassword == confirmPassword) {
            console.log('Email identified and password matched');
            const changedPassword = confirmPassword;
            console.log('The new password is,', changedPassword);
            if (users[i].email == email) {
                users[i].pwd = changedPassword;
                pushToDatabase()
                save();
            }
        }
    }
}
