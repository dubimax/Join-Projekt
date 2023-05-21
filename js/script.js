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
        if (resp.ok) element.innerHTML = await resp.text();
        else element.innerHTML = 'Page not found';
    }
}

/**
 * Gets the First letters of given username
 * @param {*} username 
 * @returns Acronyms of username (Surname Name)
 */
function getFirstLettersOfName(username) {
    let str = username;
    let matches = str.match(/\b(\w)/g);
    let acronym = matches.join('');
    return acronym;
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



function action(formData) {
    const input = 'https://gruppe-527.developerakademie.net/Join-Projekt/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };
    return fetch(input, requestInit);
}

/**
 * Sets the inner HTML content of an element with the provided text.
 * @param {string} id - The ID of the element.
 * @param {string} text - The text to set as the inner HTML content.
 */
function setInnerHTML(id, text) {
    document.getElementById(id).innerHTML = text;
}

function addInnerHTML(id, text) {
    document.getElementById(id).innerHTML += text;
}

/**
 * Sets the selected Navigation Link
 * @param {*} coloredLink The Link to set colored
 * @param  {...any} links array with all navigation links
 */
function generateNavigationLinks(coloredLink, ...links) {
    document.getElementById('navigation-left-links').innerHTML = '';
    for (let i = 0; i < links.length; i++) addNavigationLink(coloredLink, i);
}

function addNavigationLink(coloredLink, i) {
    let linkname = links[i];
    if (coloredLink == linkname) addInnerHTML('navigation-left-links', generateSelectedNavigationLinkHTML(linkname));
    else addInnerHTML('navigation-left-links', generateUnSelectedNavigationLinkHTML(linkname));
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
function addConfirmMessage(text) {
    document.body.innerHTML += setConfirmMessage(text);
}

function setConfirmMessage(text) {
    return `<div class="confirmMessage" id="confirmMessage">${text} successfully createt</div>`;
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
    if (isLogoutButtonShown()) removeLogoutButton();
    else addLogoutButton();
}

function isLogoutButtonShown() {
    return document.body.lastChild.id == 'optionsMenu';
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
    checkUserData(userEmail, userPassword);
}

function checkUserData(userEmail, userPassword) {
    for (let i = 0; i < users.length; i++) {
        checkUserDataForUser(i, userEmail, userPassword);
    }
    removeDisplayNone('dataCheck');
}

function checkUserDataForUser(i, userEmail, userPassword) {
    const user = users[i];
    if (isUserAndMailCorrect(user, userEmail, userPassword)) setLoggedIn(userEmail);
}

function isUserAndMailCorrect(user, userEmail, userPassword) {
    return user.email == userEmail && user.pwd == userPassword;
}

function setLoggedIn(userEmail) {
    indexOfEmail = users.find(u => u.email == userEmail);
    loggedIn = true;
    save();
    window.location.href = './html/summary.html';
}

function guestLogin() {
    checkUserData('guest@guest.de', 'guest');
}

function logout() {
    localStorage.removeItem(indexOfEmail);
    localStorage.removeItem(loggedIn);
    window.location.href = '../login.html';
}

/**
 * Pushes the Tasks to the Backend, clear all Inputs and Save
 */
async function pushToDatabase() {
    save();
    await backend.setItem('users', JSON.stringify(users));
    await backend.setItem('categories', JSON.stringify(categories));
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('userMail').value;
    let password = document.getElementById('userPassword').value;
    let userColor = randomcolor();
    users.push({ 'name': name, 'email': email, 'pwd': password, 'color': userColor });
    pushToDatabase();
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
    pushToDatabase();
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
    if (id == 'addNewCat') cancelAddNewCat();
    if (id == 'addNewSubTask') setInnerHTML(id + 'addNewSubTask', setBackToSubTaskField('label', 'Subtasks',
        'dropDownMenuField', 'addNewSubTask', './img/addIcon.png'));
    if (id == 'assignedTo') cancelAssignedTo();
}

function cancelAssignedTo() {
    let children = document.getElementById('assignedTo').children;
    for (let i = 0; i < children.length; i++) setCheckBoxFalse(i);
}

function setCheckBoxFalse(i) {
    if (i > 1) document.getElementById('assignedTo').children[i].children[0].checked = false;
}

function cancelAddNewCat() {
    setInnerHTML('id_categoryBox', setBackToOptionsField('label', 'Category', 'dropDownMenuField', 'categoryBox', './img/dropdownIcon.png', 'task category'));
    addOptionWithFunction('addNewCat');
    generateOptionsHTML(categories, 'categories');
    save();
    dropDownCat = false;
    addEventListenerToCategories();
}

/**
 * Open the selected dropdownmenu
 * @param {*} usedItems 
 */
function showDropDownItems(usedItems) {
    if (usedItems == 'categories') showCategoryItems();
    if (usedItems == 'users') showUsersItems();
}

/**
 * Shows all category in Dropdown
 */
function showCategoryItems() {
    if (document.getElementById('CategorycategoryBox')) showCategories();
}

function showCategories() {
    checkDropDown();
    setCategoriesVisisble();
    if (selectedCategory) removeDisplayNone(selectedCategory);
}

function setCategoriesVisisble() {
    for (let i = 0; i < categories.length; i++) {
        if (isContainingClassDnone(categories[i]['name'])) removeDisplayNone(categories[i]['name']);
        else addDisplayNone(categories[i]['name']);
    }
}

function checkDropDown() {
    if (!selectedCategory) setDropDownVisible();
    else setDropDownVisible();
}

function setDropDownCatVisible() {
    if (!dropDownCat) showDropDown();
    else hideDropdownCat();
}

function setDropDownVisible() {
    if (!dropDownCat) showDropDown();
    else hideDropdowns();
}

function hideDropdownCat() {
    addDisplayNone('addNewCat');
    dropDownCat = false;
}

function hideDropdowns() {
    addDisplayNone('CategorycategoryBox');
    hideDropdownCat();
}

function showDropDown() {
    removeDisplayNone('CategorycategoryBox');
    removeDisplayNone('addNewCat');
    dropDownCat = true;
}

/**
 * checks the Status to set for a Task
 * @param {*} id 
 */
function checkStatusToSet(id) {
    let getStatus = document.getElementById(id);
    let addForm = getStatus.parentElement.children[0].children[0].attributes.for.value;
    addForm.replace(/\s+/g, '');
    showAddNewTaskAtBoard();
    setOnSubmitForm(addForm);
}

/**
 * Sets onsubmit to the form element
 * @param {*} addForm formelement
 */
function setOnSubmitForm(addForm) {
    let submitElement = document.getElementById('submitting');
    submitElement.onsubmit = function () {
        setForm(addForm);
    };
}

function setForm(addForm) {
    createNewTask(addForm);
    addConfirmMessage('Task');
    if (isElementExistent('addTask')) removeMessage('addTask');
    else if (isElementExistent('addTaskAtContacts')) removeMessage('addTaskAtContacts');
    else if (isElementExistent('addTaskAtBoard')) removeMessage('addTaskAtBoard');
}

/**
 * Checks if an element with the specified ID exists in the DOM.
 *
 * @param {string} id - The ID of the element to check.
 * @returns {boolean} - `true` if the element exists, `false` otherwise.
 */
function isElementExistent(id) {
    return document.getElementById(id);
}

function removeMessage(id) {
    addDisplayNone(id);
    setTimeout(removeConfirmMessage(), 1000);
    return false;
}

/**
 * Shows the useritems in Dropdown menu
 */
function showUsersItems() {
    if (!dropDownAssign) {
        document.getElementById('Assigned toassignedTo').classList.remove('d-none');
        document.getElementById('assignedTo').style = `height:unset;`;
        document.getElementById('invite').classList.remove('d-none');
        dropDownAssign = true;
    } else {

        if (document.getElementById('Assigned toassignedTo').classList.contains('d-none')) {
            document.getElementById('Assigned toassignedTo').classList.add('d-none');
            document.getElementById('invite').classList.remove('d-none');

        } else {
            document.getElementById('Assigned toassignedTo').classList.remove('d-none');
            document.getElementById('invite').classList.add('d-none');
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
        }
    }
}

/**
 * Creates CheckboxItems for Subtasks
 */
function generateCheckboxItem() {
    let isChecked;
    document.getElementById('list-subtask').innerHTML += `
    <li><input type="checkbox" id="list-subtask-${getItemFromInput()}" value="${getItemFromInput()}"> ${getItemFromInput()}</li>
    `;
    if (document.getElementById('list-subtask-' + getItemFromInput()).checked == true) {
        isChecked = true;
    } else {
        isChecked = false;
    }
    subtasks.push({ 'item': getItemFromInput(), 'checked': isChecked });
    document.getElementById('newSubtasks').value = '';
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

/**
 * Checks if an element contains the 'd-none' class.
 * @param {string} id - The ID of the element.
 * @returns {boolean} True if the element contains the 'd-none' class, false otherwise.
 */
function isContainingClassDnone(id) {
    return document.getElementById(id).classList.contains('d-none');
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

/**
 * Adds the 'd-none' class to an element to hide it by setting its display property to 'none'.
 * @param {string} id - The ID of the element.
 */
function addDisplayNone(id) {
    document.getElementById(id).classList.add('d-none');
}

/**
 * Removes the 'd-none' class from an element to show it by restoring its display property.
 * @param {string} id - The ID of the element.
 */
function removeDisplayNone(id) {
    document.getElementById(id).classList.remove('d-none');
}
