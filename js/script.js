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
 * Retrieves the first letters of each word in a username and returns them as an acronym.
 * @param {string} username - The username from which to extract the first letters.
 * @returns {string} The acronym formed from the first letters of the username.
 */
function getFirstLettersOfName(username) {
    let str = username;
    let matches = str.match(/\b(\w)/g);
    let acronym = matches.join('');
    return acronym;
}

/**
 * Loads data from the local storage into corresponding variables.
 */
function load() {
    loggedIn = JSON.parse(localStorage.getItem("loggedIn" || false));
    users = JSON.parse(localStorage.getItem("users") || [{}]);
    categories = JSON.parse(localStorage.getItem("categories") || [{}]);
    tasks = JSON.parse(localStorage.getItem("tasks") || [{}]);
    indexOfEmail = JSON.parse(localStorage.getItem("indexOfEmail") || [{}]);
}

/**
 * Saves data to the local storage.
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
 * Performs an action by sending a POST request to a specified URL with the provided form data.
 * @param {FormData} formData - The form data to be sent in the request body.
 * @returns {Promise<Response>} A promise that resolves to the response from the server.
 */
function action(formData) {
    const input = 'https://gruppe-527.developerakademie.net/Join-Projekt/send_mail.php';
    const requestInit = { method: 'post', body: formData };
    return fetch(input, requestInit);
}

/**
 * Sets the inner HTML content of an element with the provided text.
 * @param {string} id - The ID of the element.
 * @param {string} text - The text to set as the inner HTML content.
 */
function setInnerHTML(id, text) {
    if (text.length == 0) document.getElementById(id).innerHTML = '';
    else document.getElementById(id).innerHTML = text;
}

/**
 * Appends the provided text to the inner HTML of an element with the specified ID.
 * @param {string} id - The ID of the element to update its inner HTML.
 * @param {string} text - The text to append to the inner HTML of the element.
 */
function addInnerHTML(id, text) {
    document.getElementById(id).innerHTML += text;
}

/**
 * Generates navigation links by updating the inner HTML of the navigation container with the provided links.
 * @param {string} coloredLink - The CSS class to apply to the colored link.
 * @param {...string} links - The links to be added to the navigation container.
 */
function generateNavigationLinks(coloredLink, ...links) {
    document.getElementById('navigation-left-links').innerHTML = '';
    for (let i = 0; i < links.length; i++) addNavigationLink(coloredLink, i, links);
}

/**
 * Adds a navigation link to the navigation container based on the provided parameters.
 * @param {string} coloredLink - The CSS class representing the colored link.
 * @param {number} i - The index of the link in the links array.
 * @param {string[]} links - The array of links.
 */
function addNavigationLink(coloredLink, i, links) {
    let linkname = links[i];
    if (coloredLink == linkname) addInnerHTML('navigation-left-links', generateSelectedNavigationLinkHTML(linkname));
    else addInnerHTML('navigation-left-links', generateUnSelectedNavigationLinkHTML(linkname));
}

/**
 * Converts the first letter of a string to lowercase.
 * @param {string} string - The input string.
 * @returns {string} The input string with the first letter converted to lowercase.
 */
function firstLetterToLowerCase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Adds a confirmation message to the body of the document.
 * @param {string} text - The text of the confirmation message.
 */
function addConfirmMessage(text) {
    document.body.innerHTML += setConfirmMessage(text);
}

/**
 * Removes the confirmation message from the document.
 */
function removeConfirmMessage() {
    document.getElementById('confirmMessage').remove();
}

/**
 * Sets the logout button based on its current visibility state.
 */
function setLogoutButton() {
    if (isLogoutButtonShown()) removeLogoutButton();
    else addLogoutButton();
}

/**
 * Checks if the logout button is currently shown.
 * @returns {boolean} A boolean indicating whether the logout button is shown.
 */
function isLogoutButtonShown() {
    return document.body.lastChild.id == 'optionsMenu';
}

/**
 * Removes the logout button from the document
 */
function removeLogoutButton() {
    document.getElementById('optionsMenu').remove();
}

/**
 * Removes the legal notice from the document
 */
function removeLegalNotice() {
    document.getElementById('legalNotice').remove();
}

/**
 * Removes the help from the document
 */
function removeHelp() {
    document.getElementById('helpContent').remove();
}

/**
 * Initializes the application.
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    await includeHTML();
    await downloadFromServer();
    load();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * Performs the login operation.
 */
function login() {
    let userEmail = document.getElementById('userMailLogIn').value;
    let userPassword = document.getElementById('userPasswordLogIn').value;
    checkUserData(userEmail, userPassword);
}

/**
 * Checks the user data for a given email and password.
 * @param {string} userEmail - The user email to check.
 * @param {string} userPassword - The user password to check.
 */
function checkUserData(userEmail, userPassword) {
    for (let i = 0; i < users.length; i++) {
        checkUserDataForUser(i, userEmail, userPassword);
    }
    removeDisplayNone('dataCheck');
}

/**
 * Checks the user data for a specific user.
 * @param {number} i - The index of the user in the users array.
 * @param {string} userEmail - The user email to check.
 * @param {string} userPassword - The user password to check.
 */
function checkUserDataForUser(i, userEmail, userPassword) {
    const user = users[i];
    if (isUserAndMailCorrect(user, userEmail, userPassword)) setLoggedIn(userEmail);
}

/**
 * Checks if the user email and password combination is correct.
 * @param {object} user - The user object to check.
 * @param {string} userEmail - The user email to compare.
 * @param {string} userPassword - The user password to compare.
 * @returns {boolean} - True if the user email and password combination is correct, false otherwise.
 */
function isUserAndMailCorrect(user, userEmail, userPassword) {
    return user.email == userEmail && user.pwd == userPassword;
}

/**
 * Sets the logged-in status for the user.
 * @param {string} userEmail - The user email to set as logged in.
 */
function setLoggedIn(userEmail) {
    indexOfEmail = users.find(u => u.email == userEmail);
    loggedIn = true;
    save();
    window.location.href = './html/summary.html';
}

/**
 * Performs a guest login by checking the user data.
 */
function guestLogin() {
    checkUserData('guest@guest.de', 'guest');
}

/**
 * Performs the logout action.
 */
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

/**
 * Adds a new user with the provided details.
 */
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
 * Adds a new category with the provided details.
 */
function addCategory() {
    let newCategory = document.getElementById('newCat').value;
    let color = getValueOfChosenColor();
    categories.push({ 'name': newCategory, 'color': color });
    pushToDatabase();
    cancelAddNew('addNewCat');
}

/**
 * Retrieves the name of the category at the specified index.
 * @param {number} i - The index of the category.
 * @returns {string} The name of the category.
 */
function getCategory(i) {
    return categories[i]['name'];
}

/**
 * Retrieves the color of the category at the specified index.
 * @param {number} i - The index of the category.
 * @returns {string} The color of the category.
 */
function getCategoryColor(i) {
    return categories[i]['color'];
}

/**
 * Retrieves the name of the user at the specified index.
 * @param {number} i - The index of the user.
 * @returns {string} The name of the user.
 */
function getUser(i) {
    return users[i]['name'];
}

/**
 * Cancels the action of adding a new item based on the provided ID.
 * @param {string} id - The ID of the element.
 */
function cancelAddNew(id) {
    if (id == 'addNewCat') cancelAddNewCat();
    if (id == 'addNewSubTask') setInnerHTML('id_' + 'addNewSubTask', setBackToSubTaskField('label', 'Subtasks',
        'dropDownMenuField', 'addNewSubTask', './img/addIcon.png'));
    if (id == 'assignedTo') cancelAssignedTo();
}

/**
 * Cancels the assignedTo action by setting all checkboxes to false.
 */
function cancelAssignedTo() {
    let children = document.getElementById('assignedTo').children;
    for (let i = 0; i < children.length; i++) setCheckBoxFalse(i);
}

/**
 * Sets the checkbox at the specified index to false.
 * @param {number} i - The index of the checkbox to set to false.
 */
function setCheckBoxFalse(i) {
    if (i > 1) document.getElementById('assignedTo').children[i].children[0].checked = false;
}

/**
 * Cancels the process of adding a new category.
 * Restores the category selection field to its initial state.
 */
function cancelAddNewCat() {
    setInnerHTML('id_categoryBox', setBackToOptionsField('label', 'Category', 'dropDownMenuField', 'categoryBox', './img/dropdownIcon.png', 'task category'));
    addOptionWithFunction('addNewCat');
    generateOptionsHTML(categories, 'categories');
    save();
    dropDownCat = false;
    addEventListenerToCategories();
}

/**
 * Shows the dropdown items based on the specified type of used items.
 * @param {string} usedItems - The type of used items ('categories' or 'users').
 */
function showDropDownItems(usedItems) {
    if (usedItems == 'categories') showCategoryItems();
    if (usedItems == 'users') showUsersItems();
}

/**
 * Shows the category items in the dropdown.
 */
function showCategoryItems() {
    if (document.getElementById('CategorycategoryBox')) showCategories();
}

/**
 * Shows the categories in the dropdown.
 */
function showCategories() {
    checkDropDown();
    setCategoriesVisisble();
    if (selectedCategory) removeDisplayNone(selectedCategory);
}

/**
 * Sets the visibility of the categories.
 */
function setCategoriesVisisble() {
    for (let i = 0; i < categories.length; i++) {
        if (isContainingClassDnone(categories[i]['name'])) removeDisplayNone(categories[i]['name']);
        else addDisplayNone(categories[i]['name']);
    }
}

/**
 * Checks the state of the drop-down menu and sets it to visible.
 */
function checkDropDown() {
    if (!selectedCategory) setContainerCategeroyVisible();
    else setContainerVisibleAlerternate();
}

/**
 * Toggles the visibility of the container based on the state of the dropDownCat variable.
 */
function setContainerVisibleAlerternate() {
    if (!dropDownCat) showDropDonwsMenu();
    else hideDropDownWithAddNewCat();
}

/**
 * Toggles the visibility of the container category based on the state of the dropDownCat variable.
 */
function setContainerCategeroyVisible() {
    if (!dropDownCat) showDropDonwsMenu();
    else hideDropDownWithOutAddNewCat();
}

/**
 * Hides the drop-down menu without showing the "Add New Category" option.
 */
function hideDropDownWithOutAddNewCat() {
    document.getElementById('addNewCat').classList.add('d-none');
    dropDownCat = false;
}

/**
 * Hides the drop-down menu along with the "Add New Category" option.
 */
function hideDropDownWithAddNewCat() {
    document.getElementById('addNewCat').classList.add('d-none');
    document.getElementById('CategorycategoryBox').classList.add('d-none');
    dropDownCat = false;
}

/**
 * Shows the drop-down menu with the "Add New Category" option.
 */
function showDropDonwsMenu() {
    document.getElementById('CategorycategoryBox').classList.remove('d-none');
    document.getElementById('addNewCat').classList.remove('d-none');
    dropDownCat = true;
}

/**
 * Checks the status to set the appropriate behavior.
 * @param {string} id - The ID of the element to check the status.
 */
function checkStatusToSet(id) {
    let getStatus = document.getElementById(id);
    let addForm = getStatus.parentElement.children[0].children[0].attributes.for.value;
    addForm.replace(/\s+/g, '');
    showAddNewTaskAtBoard();
    setOnSubmitForm(addForm);
}

/**
 * Sets the behavior for submitting the form.
 * @param {string} addForm - The form to set the behavior for.
 */
function setOnSubmitForm(addForm) {
    let submitElement = document.getElementById('submitting');
    submitElement.onsubmit = function () {
        setForm(addForm);
        return false;
    };
}

/**
 * Sets the form behavior when submitted.
 * @param {string} addForm - The form to set the behavior for.
 */
function setForm(addForm) {
    createNewTask(addForm);
    addConfirmMessage('Task');
    if (isElementExistent('addTask')) removeMessage();
    else if (isElementExistent('addTaskAtContacts')) closeAtContacts();
    else if (isElementExistent('addTaskAtBoard').children.length != 0) closeTaskAtBoard();
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

function closeAtContacts() {
    hideAddNewTaskAtContacts();
    removeMessage();
}

function closeTaskAtBoard() {
    setInnerHTML('addTaskAtBoard', '');
    addDisplayNone('addTaskAtBoard')
    removeMessage();
}

function removeMessage() {
    setTimeout(() => removeConfirmMessage(), 1000);
}

/**
 * Shows the useritems in Dropdown menu
 */
function showUsersItems() {
    if (!dropDownAssign) setUserItems();
    else hideUserItems();
    setStyleOfSelectedUsers();
}

/**
 * Sets the style of the selected users in the dropdown.
 */
function setStyleOfSelectedUsers() {
    for (let i = 0; i < users.length; i++) {
        if (isContainingClassDnone(users[i]['name'])) setUserItemsandShow(i)
        else addDisplayNone(users[i]['name']);
    }
}

/**
 * Hides the user items in the dropdown.
 */
function hideUserItems() {
    if (isContainingClassDnone('Assigned toassignedTo')) showUsersDropdown();
    else hideUsersDropDown();
    dropDownAssign = false;
}

/**
 * Sets the user items and shows the dropdown.
 * @param {number} i - The index of the user.
 */
function setUserItemsandShow(i) {
    removeDisplayNone(users[i]['name']);
    document.getElementById('assignedTo').style = `height:unset !important;`;
}

/**
 * Hides the users dropdown.
 */

function hideUsersDropDown() {
    removeDisplayNone('Assigned toassignedTo');
    addDisplayNone('invite');
}

/**
 * Shows the users dropdown.
 */
function showUsersDropdown() {
    addDisplayNone('Assigned toassignedTo');
    removeDisplayNone('invite');
}

/**
 * Sets the user items and shows the user dropdown.
 */
function setUserItems() {
    removeDisplayNone('Assigned toassignedTo');
    document.getElementById('assignedTo').style = `height:unset;`;
    removeDisplayNone('invite');
    dropDownAssign = true;
}

/**
 * Generates a checkbox item, adds it to the list of subtasks, and clears the input field.
 */
function generateCheckboxItem() {
    let isChecked;
    addInnerHTML('list-subtask', setCheckBox());
    if (isItemChecked()) isChecked = true;
    else isChecked = false;
    subtasks.push({ 'item': getValueOf('newSubtasks'), 'checked': isChecked });
    document.getElementById('newSubtasks').value = '';
}

/**
 * Checks if the checkbox item is checked.
 * @returns {boolean} True if the checkbox item is checked, false otherwise.
 */
function isItemChecked() {
    return document.getElementById('list-subtask-' + getValueOf('newSubtasks')).checked == true;
}

/**
 * Retrieves the value of an input field by its ID.
 * @param {string} id - The ID of the input field.
 * @returns {string} The value of the input field.
 */
function getValueOf(id) {
    return document.getElementById(id).value;
}

/**
 * Generates HTML options for an array of items.
 * @param {Array} array - The array of items.
 * @param {string} nameOfArray - The name of the array.
 */
function generateOptionsHTML(array, nameOfArray) {
    for (let i = 0; i < array.length; i++) {
        if (nameOfArray == 'users') addInnerHTML('assignedTo', generateTheOptionHTML(nameOfArray, getUser(i)));
        if (nameOfArray == 'categories') addInnerHTML('categoryBox', generateCategoryOptionHTML(nameOfArray, i));
    }
}

/**
 * Adds a content title to an element by setting its innerHTML.
 * @param {string} title - The title to be added.
 * @param {string} id - The ID of the element.
 */
function addContentTitle(title, id) {
    document.getElementById(id).innerHTML += `
    <h2>${title}</h2>
    `;
}

/**
 * Redirects to the specified link after saving the data.
 * @param {string} id - The URL or path of the link to be navigated to.
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

/**
 * Shows the specified frames and hides the rest.
 * @param {...string} ids - IDs of the frames to be shown.
 */
function showFrame(...ids) {
    let element1 = ids[0];
    let element2 = ids[1];
    for (let i = 0; i < ids.length; i++) addDisplayNone(ids[i]);
    removeDisplayNone(element1);
    if (element2.length > 0) removeDisplayNone(element2);
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