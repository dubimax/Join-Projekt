setURL('https://gruppe-527.developerakademie.net/smallest_backend_ever');
/**
 * Includes other HTML Files
 */
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

/**
 * Load saved variables from localstorage
 */
function load() {
    loggedIn = JSON.parse(localStorage.getItem("loggedIn" || false));
    users = JSON.parse(localStorage.getItem("users") || [{}]);
    categories = JSON.parse(localStorage.getItem("categories") || [{}]);
    tasks = JSON.parse(localStorage.getItem("tasks") || [{}]);
    indexOfEmail = JSON.parse(localStorage.getItem("indexOfEmail") || [{}]);

}

/**
 * Saves needed variables in localstorage
 */
function save() {
    localStorage.clear();
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("indexOfEmail", JSON.stringify(indexOfEmail));
}


/**
 * Sets the selected Navigation Link
 * @param {*} coloredLink The Link to set colored
 * @param  {...any} links array with all navigation links
 */
function generateNavigationLinks(coloredLink, ...links) {
    document.getElementById('navigation-left-links').innerHTML = '';
    for (let i = 0; i < links.length; i++) {
        let linkname = links[i];
        if (coloredLink == linkname) {
            document.getElementById('navigation-left-links').innerHTML += generateSelectedNavigationLinkHTML(linkname);
        } else {
            document.getElementById('navigation-left-links').innerHTML += generateUnSelectedNavigationLinkHTML(linkname);
        }
    }
}

/**
 * Sets only the first Letter to lowerCase
 * @param {*} string 
 * @returns returns the String with the first letter as lowerCase
 */
function firstLetterToLowerCase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Adds a Confirmmessage
 */
function addConfirmMessage() {
    document.body.innerHTML += `<div class="confirmMessage" id="confirmMessage">Contact successfully createt</div>`;
}

/**
 * Removes the Confirmmessage
 */
function removeConfirmMessage() {
    document.getElementById('confirmMessage').remove();
}

/**
 * add the Logout Button if not there
 *  or removes the Logout Button if there
 */
function setLogoutButton() {
    if (document.body.lastChild.id == 'optionsMenu') {
        removeLogoutButton();
    } else addLogoutButton();
}

/**
 * Removes the logout button from the page body
 */
function removeLogoutButton() {
    document.getElementById('optionsMenu').remove();
}

/**
 * Removes the legal notice from the page body
 */
function removeLegalNotice() {
    document.getElementById('legalNotice').remove();
}

/**
 * Removes the help from the page body
 */
function removeHelp() {
    document.getElementById('helpContent').remove();
}

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
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.email == userEmail && user.pwd == userPassword) {
            indexOfEmail = users.find(u => u.email == userEmail);
            loggedIn = true;
            save();
            window.location.href = 'summary.html';
        }
    }
    let dataCheck = document.getElementById('dataCheck');
    dataCheck.classList.remove('d-none');
}


function guestLogin() {
    checkUserData('guest@guest.de', 'guest');
    console.log('gast user angemeldet');
}

function logout() {
    localStorage.removeItem(indexOfEmail);
    localStorage.removeItem(loggedIn);
    window.location.href = './login.html';
}


function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('userMail').value;
    let password = document.getElementById('userPassword').value;
    let userColor = randomcolor();
    users.push({ 'name': name, 'email': email, 'pwd': password, 'color': userColor });
    backend.setItem('users', JSON.stringify(users));
    save();
    showFrame('signUpConfirmFrame', 'signUpFrame');
}


/**
 * Add a new Category 
 */
function addCategory() {
    let newCategory = document.getElementById('newCat').value;
    let color = getValueOfChosenColor();
    categories.push({ 'name': newCategory, 'color': color });
    backend.setItem('categories', JSON.stringify(categories));
    cancelAddNew('addNewCat');
}

/**
 * Gets a Categoryname by its index
 * @param {*} i index
 * @returns  Categoryname
 */
function getCategory(i) {
    return categories[i]['name'];
}

/**
 * Gets the color of Category by its index
 * @param {*} i index
 * @returns Categorycolor
 */
function getCategoryColor(i) {
    return categories[i]['color'];
}

/**
 * Gets a username by its index
 * @param {*} i index
 * @returns Username
 */
function getUser(i) {
    return users[i]['name'];
}

/**
 * Aborts the process of Adding something new
 * @param {*} id 
 */
function cancelAddNew(id) {
    if (id == 'addNewCat') {
        document.getElementById('id_categoryBox').innerHTML = setBackToOptionsField('label', 'Category', 'dropDownMenuField', 'categoryBox', './img/dropdownIcon.png', 'task category');
        addOptionWithFunction('addNewCat');
        generateOptionsHTML(categories, 'categories');
        save();
        dropDownCat = false;
        addEventListenerToCategories();
    }
    if (id == 'addNewSubTask') {
        document.getElementById('id_addNewSubTask').innerHTML = setBackToSubTaskField('label', 'Subtasks', 'dropDownMenuField', 'addNewSubTask', './img/addIcon.png');
    }
}

/**
 * Open the selected dropdownmenu
 * @param {*} usedItems 
 */
function showDropDownItems(usedItems) {
    if (usedItems == 'categories') {
        showCategoryItems();
    }
    if (usedItems == 'users') {
        showUsersItems();
    }
}

/**
 * Shows all category in Dropdown
 */
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
            document.getElementById('categoryBox').style = `height:unset !important;`;
            document.getElementById('addNewCat').classList.remove('d-none');
            dropDownCat = true;
        } else {
            document.getElementById('addNewCat').classList.add('d-none');
            document.getElementById('categoryBox').style = `height:41px !important;`;
            document.getElementById('assignedTo').style = `height:41px !important;`;
            dropDownCat = false;
        }
    } else {
        if (!dropDownCat) {
            document.getElementById('CategorycategoryBox').classList.remove('d-none');
            document.getElementById('categoryBox').style = `height:unset !important;`;
            document.getElementById('addNewCat').classList.remove('d-none');

            document.getElementById('assignedTo').style = `height:unset !important;`;
            dropDownCat = true;
        } else {
            document.getElementById('addNewCat').classList.add('d-none');
            document.getElementById('CategorycategoryBox').classList.add('d-none');
            document.getElementById('categoryBox').style = `height:41px !important;`;
            dropDownCat = false;
        }
    }
}

/**
 * checks the Status to set for a Task
 * @param {*} id 
 */
function checkStatusToSet(id) {
    generateAddTaskHTML('addTaskAtBoard');
    let getStatus = document.getElementById(id);
    let addForm = getStatus.parentElement.children[0].children[0].attributes.for.value;
    addForm.replace(/\s+/g, '');
    showAddNewTaskAtBoard();
    setOnSubmitForm(addForm);
    console.log('erfolgreich');
}

/**
 * Sets onsubmit to the form element
 * @param {*} addForm formelement
 */
function setOnSubmitForm(addForm) {
    let submitElement = document.getElementById('submitting');
    submitElement.onsubmit = function () {
        createNewTask(addForm);
        return false;
    };
}

/**
 * Shows the useritems in Dropdown menu
 */
function showUsersItems() {
    if (!dropDownAssign) {
        document.getElementById('Assigned toassignedTo').classList.remove('d-none');
        document.getElementById('assignedTo').style = `height:unset !important;`;
        dropDownAssign = true;
    } else {
        if (document.getElementById('Assigned toassignedTo').classList.contains('d-none')) {
            document.getElementById('Assigned toassignedTo').classList.add('d-none');
            document.getElementById('assignedTo').style = `height:41px !important;`;
        } else {
            document.getElementById('Assigned toassignedTo').classList.remove('d-none');
            document.getElementById('assignedTo').style = `height:unset !important;`;
        }
        dropDownAssign = false;
    }
    for (let i = 0; i < users.length; i++) {
        if (document.getElementById(users[i]['name']).classList.contains('d-none')) {
            document.getElementById(users[i]['name']).classList.remove('d-none');
            document.getElementById('assignedTo').style = `height:unset !important;`;
        }
        else {
            document.getElementById(users[i]['name']).classList.add('d-none');
            document.getElementById('assignedTo').style = `height:41px !important;`;
        }
    }
}

/**
 * Creates CheckboxItems for Subtasks
 */
function generateCheckboxItem() {
    document.getElementById('list-subtask').innerHTML += `
    <li><input type="checkbox" id="list-subtask-${getItemFromInput()}" value="${getItemFromInput()}"> ${getItemFromInput()}</li>
    `;
    subtasks.push(getItemFromInput());
}

/**
 * Gets the inputfield Value for Subtasks
 * @returns rrturns the value from the input at subtasks
 */
function getItemFromInput() {
    return document.getElementById('newSubtasks').value;
}

/**
 * generates the option for dropdown
 * @param {*} array items to set
 * @param {*} nameOfArray array for rendering items
 */
function generateOptionsHTML(array, nameOfArray) {
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


