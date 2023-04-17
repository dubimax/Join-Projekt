async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


function passwordInputIconChange() {
    let userPasswordInput = document.getElementById('userPassword');
    let passwordIcon = document.getElementById('userPasswordIcon');
    let passwordIconHidden = document.getElementById('userPasswordHidden');
    userPasswordInput.addEventListener('input', function () {
        if (userPasswordInput.value.length > 0) {
            passwordIcon.classList.add('d-none');
            passwordIconHidden.classList.remove('d-none');
        } else {
            passwordIcon.classList.remove('d-none');
            passwordIconHidden.classList.add('d-none');
        }
    })
}

icon.onclick =  function(){
    let icon = document.getElementById('userPasswordIcon');
    let password = document.getElementById('userPassword');

    if (password.type == "password"){
        password.type = "text";
        icon.src = "img/dontShowPassword";
    } else{
        password.type = "password";
        icon.src = "img/showPassword";
    }
}
