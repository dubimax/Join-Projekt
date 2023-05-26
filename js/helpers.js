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
/**
 * Retrieves the value of an input field by its ID.
 * @param {string} id - The ID of the input field.
 * @returns {string} The value of the input field.
 */
function getValueOf(id) {
    return document.getElementById(id).value;
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

/**
 * Pushes the Tasks to the Backend, clear all Inputs and Save
 */
async function pushToDatabase() {
    save();
    await backend.setItem('users', JSON.stringify(users));
    await backend.setItem('categories', JSON.stringify(categories));
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function removeID(id){
    document.getElementById(id).remove();
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
 * Sets the inner HTML content of an element with the provided text.
 * @param {string} id - The ID of the element.
 * @param {string} text - The text to set as the inner HTML content.
 */
function setInnerHTML(id, text) {
    if (text.length == 0) document.getElementById(id).innerHTML = '';
    else document.getElementById(id).innerHTML = text;
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
 * Adds a confirmation message to the body of the document.
 * @param {string} text - The text of the confirmation message.
 */
function addConfirmMessage(text) {
    document.body.innerHTML += setConfirmMessage(text);
}

/**
 * Retrieves the inner HTML content of an element by its ID.
 * @param {string} id - The ID of the element.
 * @returns {string} The inner HTML content of the element.
 */
function getInnerHTMLOf(id) {
    return document.getElementById(id).innerHTML;
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
 * Checks if an HTML element with the specified id exists.
 * @param {string} id - The id of the HTML element.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task in the tasks array.
 * @returns {boolean} - Returns true if the HTML element exists, false otherwise.
 */
function isHTMLElement(id, status, index) {
    return document.getElementById(id + status + index);
}