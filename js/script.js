async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
function load() {
    loggedIn = JSON.parse(localStorage.getItem("loggedIn" || false));
    users = JSON.parse(localStorage.getItem("users") || [{}]);
    categories = JSON.parse(localStorage.getItem("categories") || [{}]);
    tasks = JSON.parse(localStorage.getItem("tasks") || [{}]);
}

function save() {
    localStorage.clear();
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

setURL('https://gruppe-527.developerakademie.net/smallest_backend_ever');

async function init() {
    await includeHTML();
    await downloadFromServer();
    load();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

function login() {
    let userEmail = document.getElementById('userMailLogIn').value;
    let userPassword = document.getElementById('userPasswordLogIn').value;
    checkUserData(userEmail, userPassword)
}

function checkUserData(userEmail, userPassword) {
    let indexOfEmail = users.findIndex(u => u.email == userEmail);
    let indexOfPassword = users.findIndex(u => u.pwd == userPassword);
    if (indexOfEmail == -1 || indexOfPassword == -1) {
        let dataCheck = document.getElementById('dataCheck');
        dataCheck.classList.remove('d-none');
    } else {
        loggedIn = true;
        save();
        window.location.href = 'summary.html';
    }
}

function guestLogin() {
    checkUserData('guest@guest.de', 'guest');
    console.log('gast user angemeldet');
}

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('userMail').value;
    let password = document.getElementById('userPassword').value;
    users.push({ 'name': name, 'email': email, 'pwd': password });
    backend.setItem('users', JSON.stringify(users));
    showFrame('signUpConfirmFrame', 'signUpFrame');
}

function addCategory() {
    let newCategory = document.getElementById('newCat').value;
    let color = getValueOfChosenColor();
    categories.push({ 'name': newCategory, 'color': color });
    backend.setItem('categories', JSON.stringify(categories));
    cancelAddNew('addNewCat');
    generateOptionsHTML('categoryBox', categories, 'categories');
}

function getCategory(i) {
    return categories[i]['name'];
}
function getCategoryColor(i) {
    return categories[i]['color'];
}

function getUser(i) {
    return users[i]['name'];
}

function cancelAddNew(id) {
    if (id == 'addNewCat') {
        document.getElementById('id_categoryBox').innerHTML = setBackToOptionsField('label', 'Category', 'dropDownMenuField', 'categoryBox', 'task category');
        addOptionWithFunction('addNewCat');
        generateOptionsHTML('categoryBox', categories, 'categories');
        addEventListenerToDropDown();
    }
    if (id == 'addNewSubTask') {
        document.getElementById('id_addNewSubTask').innerHTML = setBackToSubTaskField('label', 'Subtasks', 'dropDownMenuField', 'addNewSubTask', './img/addIcon.png');
    }
}

function showDropDownItems(usedItems) {
    if (usedItems == 'categories') {
        showCategoryItems();
    }
    if (usedItems == 'users') {
        showUsersItems();
    }
}

function showCategoryItems() {
    if (document.getElementById('CategorycategoryBox')) {
        checkDropDown();
        for (let i = 0; i < categories.length; i++) {
            if (document.getElementById(categories[i]['name']).classList.contains('d-none')) {
                document.getElementById(categories[i]['name']).classList.remove('d-none');
            } else {
                document.getElementById(categories[i]['name']).classList.add('d-none');
            }
        } if (selectedCategory) {
            document.getElementById(selectedCategory).classList.remove('d-none');
        }
    }
}

function checkDropDown() {
    if (!selectedCategory) {
        if (!dropDownCat) {
            document.getElementById('CategorycategoryBox').classList.remove('d-none');
            document.getElementById('addNewCat').classList.remove('d-none');
            dropDownCat = true;
        } else {
            document.getElementById('addNewCat').classList.add('d-none');
            dropDownCat = false;
        }
    } else {
        if (!dropDownCat) {
            document.getElementById('CategorycategoryBox').classList.remove('d-none');
            document.getElementById('addNewCat').classList.remove('d-none');
            dropDownCat = true;
        } else {
            if (document.getElementById('addNewCat').classList.contains('d-none') && document.getElementById('addNewCat').classList.contains('d-none')) {
                document.getElementById('addNewCat').classList.remove('d-none');
                document.getElementById('CategorycategoryBox').classList.remove('d-none');
            } else {
                document.getElementById('addNewCat').classList.add('d-none');
                document.getElementById('CategorycategoryBox').classList.add('d-none');
            }
            dropDownCat = false;
        }
    }
}

function showUsersItems() {
    if (!dropDownAssign) {
        document.getElementById('Assigned toassignedTo').classList.remove('d-none');
        dropDownAssign = true;
    } else {
        if (document.getElementById('Assigned toassignedTo').classList.contains('d-none')) {
            document.getElementById('Assigned toassignedTo').classList.add('d-none');
        } else {
            document.getElementById('Assigned toassignedTo').classList.remove('d-none');
        }
        dropDownAssign = false;
    }
    for (let i = 0; i < users.length; i++) {
        if (document.getElementById(users[i]['name']).classList.contains('d-none')) {
            document.getElementById(users[i]['name']).classList.remove('d-none');
        }
        else {
            document.getElementById(users[i]['name']).classList.add('d-none');
        }
    }
}

function generateCheckboxItem() {
    document.getElementById('list-subtask').innerHTML += `
    <li><input type="checkbox" id="list-subtask-${getItemFromInput()}" value="${getItemFromInput()}"> ${getItemFromInput()}</li>
    `;
    subtasks.push(getItemFromInput());
}

function getItemFromInput() {
    return document.getElementById('newSubtasks').value;
}

function generateOptionsHTML(id, array, nameOfArray) {
    for (let i = 0; i < array.length; i++) {
        if (nameOfArray == 'users') {
            document.getElementById('assignedTo').innerHTML += `
            <div  class="cl_${nameOfArray} d-none" id="${getUser(i)}" value="${getUser(i)}">
                ${getUser(i)} 
                <input type="checkbox" value="${getUser(i)}">
            </div>
        `;
        }
        if (nameOfArray == 'categories') {
            document.getElementById('categoryBox').innerHTML += `
            <div class="cl_${nameOfArray} d-none" id="${getCategory(i)}" value="${getCategory(i)}" >
                ${getCategory(i)}
                <div class="colorCircle" style="background:${getCategoryColor(i)}">
            </div>
        `;
        }
    }
}

/**
 * Adds a Title to the shown Content
 * @param {*} title Insert the title which should be shown
 * @param {*} id Insert the ID you want to Create the Headline
 */
function addContentTitle(title, id) {
    document.getElementById(id).innerHTML += `
    <h2>${title}</h2>
    `;
}

/**
 * Adds the class "d-none" (display: none) to all nav Links
 * than removes "d-none" from the param id 
 * @param {*} id Insert the ID you want to get shown
 */
async function showLink(id) {
    await save();
    location.href = id;
}


function showFrame(...ids) {
    let element1 = ids[0];
    let element2 = ids[1];

    for (let i = 0; i < ids.length; i++) {

        document.getElementById(ids[i]).classList.add('d-none');
    }
    document.getElementById(element1).classList.remove('d-none');
    if (element2.length > 0) {
        document.getElementById(element2).classList.remove('d-none');
    }
}


