usersAssignedTo = [];
usersAssignedToShown = [];

/**
 * Creates a new task with the provided status tag.
 * Retrieves the necessary values from input fields and other data sources.
 * Adds the new task to the 'tasks' array.
 * Pushes the task data to the database.
 * Clears all input fields.
 * @param {string} statusTag - The status tag of the new task.
 */
function createNewTask(statusTag) {
    setSubtasksCheckedIf();
    tasks.push({
        'title': getValue('inputTitle'), 'description': getValue('inputDescription'),
        'category': selectedCategory, 'isAssigned': getAssignedContacts(), 'dueDate': getValue('inputDate'),
        'prio': getTasksPrio(), 'subtasks': subtasks, 'id': setTaskID(), 'status': statusTag
    });
    pushToDatabase();
    clearAllInputs();
}

/**
 * Retrieves the priority of the active task.
 * Extracts the priority value from the HTML content of the active task element.
 * Returns the priority value.
 * @returns {string} - The priority of the active task.
 */
function getTasksPrio() {
    let taskPrio = getValue(activeID).innerHTML.split(' ');
    taskPrio = taskPrio[0];
    return taskPrio;
}

/**
 * Generates and returns a unique ID for a new task.
 * The ID is calculated based on the current length of the 'tasks' array plus 1.
 * @returns {number} - The unique ID for the new task.
 */
function setTaskID() {
    return tasks.length + 1;
}

/**
 * Retrieves the value of an input element with the specified ID.
 *
 * @param {string} id - The ID of the input element.
 * @returns {string} - The value of the input element.
 */
function getValue(id) {
    return document.getElementById(id).value;
}

/**
 * Sets the 'checked' property of subtasks based on their checked status.
 * Iterates through the subtasks array and checks if each subtask is checked.
 * If a subtask is checked, its 'checked' property is set to true.
 */
function setSubtasksCheckedIf() {
    for (let i = 0; i < subtasks.length; i++) { if (isSubtaskChecked(i)) subtasks[i]['checked'] = true; }
}

/**
 * Checks if a subtask is checked based on its index in the subtasks array.
 * @param {number} i - The index of the subtask in the subtasks array.
 * @returns {boolean} - A boolean value indicating whether the subtask is checked or not.
 */
function isSubtaskChecked(i) {
    return document.getElementById('list-subtask-' + subtasks[i]['item']).checked == true;
}

/**
 * Initializes the add task functionality.
 * Includes HTML files, generates navigation links, generates add task HTML,
 * and sets the onsubmit event for the form.
 * @returns {Promise<void>}
 */
async function initAddTask() {
    await includeHTML();
    generateNavigationLinks('AddTask', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateAddTaskHTML('addTask');
    setOnSubmitForm('toDo');
}

/**
 * Retrieves the value of the chosen color.
 * Iterates through the colors array and checks if each color is active.
 * If an active color is found, its value is returned.
 * @returns {*} - The value of the chosen color.
 */
function getValueOfChosenColor() {
    for (let i = 0; i < colors.length; i++) { if (isActiveColor(i)) return colors[i]; }
}

/**
 * Checks if a color at the specified index in the colors array is active.
 * @param {number} i - The index of the color in the colors array.
 * @returns {boolean} - A boolean value indicating whether the color is active or not.
 */
function isActiveColor(i) {
    return document.getElementById(colors[i].slice(1)).classList.contains('colorCircleisActive');
}

/**
 * Sets the specified color as active by adding the 'colorCircleisActive' class to its corresponding element.
 * Removes the 'colorCircleisActive' class from all other color elements.
 * @param {string} id - The ID of the color element to set as active.
 */
function setActiveColor(id) {
    document.getElementById('8AA4FF').classList.remove('colorCircleisActive');
    document.getElementById('FF0000').classList.remove('colorCircleisActive');
    document.getElementById('2AD300').classList.remove('colorCircleisActive');
    document.getElementById('FF8A00').classList.remove('colorCircleisActive');
    document.getElementById('E200BE').classList.remove('colorCircleisActive');
    document.getElementById('0038FF').classList.remove('colorCircleisActive');
    document.getElementById(id).classList.add('colorCircleisActive');
}

/**
 * Clears all input fields and resets relevant UI elements.
 */
function clearAllInputs() {
    clearFields('inputTitle', 'inputDescription', 'inputDate', 'newSubtasks');
    clearListSubtask();
    cancelAddNew('addNewCat');
    cancelAddNew('assignedTo');
    cancelAddNew('addNewSubTask');
    clearListAssigned();
}

/**
 * Clears AssignedUserList
 */
function clearListAssigned() {
    document.getElementById('list-assigned-user').innerHTML = '';
    assignedTo = [];
}

/**
 * Resets added Subtasks
 */
function clearListSubtask() {
    document.getElementById('list-subtask').innerHTML = '';
    subtasks = [];
}

/**
 * resets value of given elements and set back the Style of LabelsFields
 * @param  {...any} ids elemnts to reset
 */
function clearFields(...ids) {
    for (let i = 0; i < ids.length; i++) changeStyleIfExistent();
}

/**
 * Changes style of Label an reset Style if Element exists
 */
function changeStyleIfExistent() {
    if (isElementExistent(ids[i])) document.getElementById(ids[i]).value = '';
    changeStyleOfLabel(ids[i]);
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
 * Resets all label containers to their default values.
 */
function resetAllLabelContainer() {
    document.getElementById('id_urgent').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_medium').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_low').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('urgentImgID').src = '../img/urgentIcon.png';
    document.getElementById('mediumImgID').src = '../img/mediumIcon.png';
    document.getElementById('lowImgID').src = '../img/lowIcon.png';
}


/**
 * Sets the style properties and image source for the specified element ID and name.
 * @param {string} id - The ID of the element to set the style properties.
 * @param {string} color - The style property value to set for the element.
 * @param {string} name - The name used to construct the image source.
 * @returns {void}
 */
function setStyle(id, color, name) {
    document.getElementById(id).style = color;
    document.getElementById(name + 'ImgID').src = `../img/${name}WhiteIcon.png`;
    activeID = id;
    activeImg = name + 'ImgID';
    return;
}

/**
 * Sets the style properties and image source for the specified element ID with the 'urgent' designation.
 * If the provided ID matches 'id_urgent', it calls the setStyle() function to set the style properties.
 * @param {string} id - The ID of the element to set the style properties.
 */
function setStyleOfUrgent(id) {
    if (id == 'id_urgent') setStyle(id, urgentColor, 'urgent');
}

/**
 * Sets the style properties and image source for the specified element ID with the 'medium' designation.
 * If the provided ID matches 'id_medium', it calls the setStyle() function to set the style properties.
 * @param {string} id - The ID of the element to set the style properties.
 */
function setStyleOfMedium(id) {
    if (id == 'id_medium') setStyle(id, mediumColor, 'medium');
}

/**
 * Sets the style properties and image source for the specified element ID with the 'low' designation.
 * If the provided ID matches 'id_low', it calls the setStyle() function to set the style properties.
 * @param {string} id - The ID of the element to set the style properties.
 */
function setStyleOfLow(id) {
    if (id == 'id_low') setStyle(id, lowColor, 'low');
}

/**
 * Sets the style properties for the specified element ID by calling the corresponding style functions.
 * @param {string} id - The ID of the element to set the style properties.
 */
function setStyles(id) {
    setStyleOfUrgent(id);
    setStyleOfMedium(id);
    setStyleOfLow(id);
}

/**
 * Changes the style of the label based on the specified element ID.
 * Resets all label containers, then either sets the styles for the specified ID or refreshes the style of the selected label.
 * @param {string} id - The ID of the label element to change the style.
 */
function changeStyleOfLabel(id) {
    resetAllLabelContainer();
    if (activeID.length == 0) setStyles(id);
    else refreshStyleOfSelectedLabel(id);
}

/**
 * Refreshes the style of the selected label based on the specified element ID.
 * If the provided ID matches the active ID, it sets the style properties to the default values.
 * Otherwise, it calls the changeStyleOfLabels() function to update the style of the labels.
 * @param {string} id - The ID of the label element to refresh the style.
 */
function refreshStyleOfSelectedLabel(id) {
    if (activeID == id) document.getElementById(id).style = 'background-color: #FFFFFF; color: #000000;';
    else changeStyleOfLabels(id)
}

/**
 * Changes the style of the labels based on the specified element ID.
 * Resets the active ID and active image, then calls the changeStyleOfLabel() function for the provided ID.
 * @param {string} id - The ID of the label element to change the style.
 */
function changeStyleOfLabels(id) {
    activeID = '';
    activeImg = '';
    changeStyleOfLabel(id);
}

/**
 * Changes the specified element ID to an input field based on the provided ID.
 * If the ID matches 'addNewCat', it calls the changeToAddNewCat() function.
 * If the ID matches 'addNewSubTask', it calls the changeToAddNewSubtask() function.
 * @param {string} id - The ID of the element to change to an input field.
 */
function changeToInputField(id) {
    if (id == 'addNewCat') changeToAddNewCat();
    if (id == 'addNewSubTask') changeToAddNewSubtask();
}

/**
 * Changes the category box to add a new category.
 * Modifies the HTML content of the 'id_categoryBox' element by generating a changed input field.
 * Adds a color chooser and sets the dropDown flag to false.
 */
function changeToAddNewCat() {
    document.getElementById('id_categoryBox').innerHTML =
        generatesChangedInputFieldHTML('label', 'input', 'Category', 'inputTextStd', 'text',
            'newCat', 'addNewCat', 'addCategory()', 'newCategoriesField');
    addColorChoser();
    dropDown = false;
}

/**
 * Changes the 'id_addNewSubTask' element to add a new subtask.
 * Modifies the HTML content of the 'id_addNewSubTask' element by generating a changed input field.
 */
function changeToAddNewSubtask() {
    document.getElementById('id_addNewSubTask').innerHTML =
        generatesChangedInputFieldHTML('label', 'input', 'Subtasks', 'inputTextStd', 'text',
            'newSubtasks', 'addNewSubTask', 'generateCheckboxItem()', 'newSubtasksField');
}

/**
 * removes event listener from DropDownMenus
 */
function removeEventListenerFromDropDown() {
    document.getElementById('categoryBox').removeEventListener('click', function () { });
    document.getElementById('assignedTo').removeEventListener('click', function () { });
    removeEventlistenerFromSelectCategories();
    removeEventlistenerFromSelectUsers();
}

/**
 * Removes the event listeners from the select users.
 * Iterates through the 'users' array and removes the 'click' event listener from each corresponding element.
 */
function removeEventlistenerFromSelectUsers() {
    let selUser;
    for (let j = 0; j < users.length; j++) {
        selUser = document.getElementById(users[j]['name']);
        selUser.removeEventListener('click', function () { });
    }
}

/**
 * Removes the event listeners from the select categories.
 * Iterates through the 'categories' array and removes the 'click' event listener from each corresponding element.
 */

function removeEventlistenerFromSelectCategories() {
    let selCat;
    for (let i = 0; i < categories.length; i++) {
        selCat = document.getElementById(categories[i]['name']);
        selCat.removeEventListener('click', function () { });
    }
}

/**
 * Adds event listeners to the categories.
 * Adds a 'click' event listener to the 'categoryBox' element to show the drop-down items for categories.
 * Calls the 'addEvenListenerToSelectCategories()' function to add event listeners to select categories.
 */
function addEventListenerToCategories() {
    let catBox = document.getElementById('categoryBox');
    catBox.addEventListener('click', function () { showDropDownItems('categories') });
    addEvenListenerToSelectCategories();
}

/**
 * Add an Eventlistener to select categories in dropdown
 */
function addEvenListenerToSelectCategories() {
    for (let i = 0; i < categories.length; i++) addEvenListenerToSelectCategory(i);
}

/**
 * Adds an event listener to select a specific category based on the provided index.
 * Gets the element by ID from the 'categories' array using the provided index.
 * Adds a 'click' event listener to the element to call the 'setEventListenerToSelectCategory()' function.
 * @param {number} i - The index of the category to add the event listener.
 */
function addEvenListenerToSelectCategory(i) {
    let selCat = document.getElementById(categories[i]['name']);
    selCat.addEventListener('click', function (e) {
        setEventListenerToSelectCategory(e)
    });
}


/**
 * Sets the event listener to select a category.
 * Extracts the text content from the current target of the event.
 * Calls the 'setOption()' function with the extracted text and 'category' as parameters.
 * Stops the event from propagating further.
 * @param {Event} e - The event object.
 */
function setEventListenerToSelectCategory(e) {
    let txt = e.currentTarget.attributes[1].textContent;
    setOption(txt, 'category');
    e.stopPropagation();
}

/**
 * Adds event listeners to the drop-down menu.
 * Calls the 'addEventListenerToCategories()' function to add event listeners to categories.
 * Calls the 'addEventListenerToSelectUserBox()' function to add event listeners to the select user box.
 */
function addEventListenerToDropDown() {
    addEventListenerToCategories();
    addEventListenerToSelectUserBox();
}

/**
 * Adds event listeners to the select user box.
 * Gets the 'assignedTo' element by its ID.
 * Adds a 'click' event listener to the element to show the drop-down items for users using the `showDropDownItems()` function.
 * Calls the `addEventListenerToSelectUsers()` function to add event listeners to select users.
 */
function addEventListenerToSelectUserBox() {
    let userBox = document.getElementById('assignedTo');
    userBox.addEventListener('click', function () { showDropDownItems('users') });
    addEventListenerToSelectUsers();
}

/**
 * Removes the event listeners from the select user box and its corresponding options.
 * Gets the 'assignedTo' element by its ID and removes the 'click' event listener from it.
 * Iterates through the 'users' array and calls the 'removeListenerFromSelectUserBox()' function to remove event listeners from each corresponding option.
 */
function removeEventlistenerFromSelectUserBox() {
    let userBox = document.getElementById('assignedTo');
    userBox.removeEventListener('click', function () { });
    for (let i = 0; i < users.length; i++) removeListenerFromSelectUserBox(i);
}

/**
 * Removes the event listener from the select user option based on the provided index.
 * Gets the element by ID from the 'users' array using the provided index.
 * Removes the 'click' event listener from the element.
 * @param {number} i - The index of the user option to remove the event listener.
 */
function removeListenerFromSelectUserBox(i) {
    let selUser = document.getElementById(users[i]['name']);
    selUser.removeEventListener('click', function () { });
}

/**
 * Adds event listeners to the select user options.
 * Iterates through the 'users' array and calls the 'addEventListenerToSelectUser()' function for each user.
 */
function addEventListenerToSelectUsers() {
    for (let j = 0; j < users.length; j++) addEventListenerToSelectUser(j);
}

/**
 * Adds an event listener to select a specific user based on the provided index.
 * Gets the element by ID from the 'users' array using the provided index.
 * Adds a 'click' event listener to the element to call the 'setChecked()' function.
 * @param {number} j - The index of the user to add the event listener.
 */
function addEventListenerToSelectUser(j) {
    let selUser = document.getElementById(users[j]['name']);
    selUser.addEventListener('click', function (e) {
        setChecked(j, e)
    });
}

/**
 * Sets the checked state of a specific user based on the provided index.
 * Stops the event from propagating further using `e.stopPropagation()`.
 * Checks if the user is not assigned by calling the 'isUserAssigned()' function with the provided index.
 * If the user is not assigned, calls the 'setCheckedToSelectUser()' function with the provided index.
 * If the user is assigned, calls the 'setUnCheckedToSelectUser()' function with the provided index.
 * @param {number} j - The index of the user to set the checked state.
 * @param {Event} e - The event object.
 */
function setChecked(j, e) {
    e.stopPropagation();
    if (!isUserAssigned(j)) setCheckedToSelectUser(j);
    else if (isUserAssigned(j)) setUnCheckedToSelectUser(j);
}

/**
 * Sets the unchecked state of a specific user based on the provided index.
 * Removes the color circle element associated with the user.
 * Sets the 'checked' property of the user's checkbox to false.
 * Removes the user from the 'usersAssignedTo' array.
 * @param {number} j - The index of the user to set the unchecked state.
 */
function setUnCheckedToSelectUser(j) {
    document.getElementById('colorCircleMedium' + users[j]['name']).remove();
    document.getElementById(users[j]['name']).children[0].checked = false;
    let index = usersAssignedTo.indexOf(users[j]['name']);
    usersAssignedTo.splice(index, 1);
}

/**
 * Sets the checked state of a specific user based on the provided index.
 * Adds the user's name to the 'usersAssignedTo' array.
 * Sets the 'checked' property of the user's checkbox to true.
 * Calls the 'setAssignedCircle()' function with the provided user object to set the assigned circle.
 * @param {number} j - The index of the user to set the checked state.
 */
function setCheckedToSelectUser(j) {
    usersAssignedTo.push(users[j]['name']);
    document.getElementById(users[j]['name']).children[0].checked = true;
    setAssignedCircle(users[j]);
}

/**
 * Checks if a specific user is assigned based on the provided index.
 * Checks if the user's name exists in the 'usersAssignedTo' array.
 * @param {number} j - The index of the user to check.
 * @returns {boolean} - Returns true if the user is assigned, false otherwise.
 */
function isUserAssigned(j) {
    return usersAssignedTo.includes(users[j]['name']);
}

/**
 * Sets the assigned circle for a user.
 * Appends the HTML for the assigned circle to the 'list-assigned-user' element.
 * @param {string} username - The username for which to set the assigned circle.
 */
function setAssignedCircle(username) {
    document.getElementById('list-assigned-user').innerHTML += setAssignedCircleHTML(username);
}

/**
 * Retrieves the assigned contacts.
 * Iterates through the 'users' array and checks if each contact is assigned by calling the 'checkIfContactIsAssigned()' function with the provided index.
 * If a contact is assigned, calls the 'addAssignedUser()' function with the provided index.
 * Returns the 'assigned' array.
 * @returns {Array} - The array of assigned contacts.
 */
function getAssignedContacts() {
    for (let i = 0; i < users.length; i++) { if (checkIfCOntactIsAssigned(i)) addAssignedUser(i) }
    return assigned;
}

/**
 * Adds an assigned user to the 'assigned' array.
 * Retrieves the value of the first child element of the element with the ID matching the user's name from the 'users' array.
 * Pushes the retrieved value to the 'assigned' array.
 * @param {number} i - The index of the user to add as assigned.
 */
function addAssignedUser(i) {
    assigned.push(document.getElementById(users[i]['name']).children[0].value);
}

/**
 * Checks if a contact is assigned based on the provided index.
 * Retrieves the 'checked' property of the first child element of the element with the ID matching the user's name from the 'users' array.
 * @param {number} i - The index of the contact to check.
 * @returns {boolean} - Returns true if the contact is assigned (checked), false otherwise.
 */
function checkIfCOntactIsAssigned(i) {
    return document.getElementById(users[i]['name']).children[0].checked;
}

/**
 * Sets the selected option of the dropdown for categories.
 * Checks if the provided `id2` parameter is equal to 'category'.
 * Calls the `setOptionNow()` function with the provided `id` parameter if the condition is true.
 * @param {string} id - The ID of the option to set as selected.
 * @param {string} id2 - The ID parameter for comparison.
 */
function setOption(id, id2) {
    if (id2 == 'category') setOptionNow(id);
}

/**
 * Sets the selected option for the category dropdown.
 * Adds the 'd-none' class to hide the 'CategorycategoryBox' and 'addNewCat' elements.
 * Sets the 'dropDownCat' variable to false.
 * Calls the 'resetOptions()' function to reset the options.
 * Calls the 'setCategoryOptions()' function with the provided 'id' parameter to set the category options.
 * Updates the 'selectedCategory' variable with the provided 'id' parameter.
 * @param {string} id - The ID of the option to set as selected.
 */
function setOptionNow(id) {
    document.getElementById('CategorycategoryBox').classList.add('d-none');
    document.getElementById('addNewCat').classList.add('d-none');
    dropDownCat = false;
    resetOptions();
    setCategoryOptions(id);
    selectedCategory = id;
}

/**
 * Sets the category options based on the provided ID.
 * If the element with the given ID contains a specific class, the category options are reset using the 'resetCategoryOptions()' function.
 * Otherwise, the category options are changed using the 'changeCategoryOptions()' function.
 * @param {string} id - The ID of the element to retrieve and process the category options.
 */
function setCategoryOptions(id) {
    let sID = document.getElementById(id);
    if (isContainingClass(sID)) resetCategoryOptions(sID);
    else changeCategoryOptions(sID);
}

/**
 * Changes the category options for the provided element.
 * Adds the 'd-none' and 'cl_categories' classes to hide and style the element.
 * Removes the 'dropDownStart' class from the element.
 * @param {HTMLElement} sID - The element to change the category options for.
 */
function changeCategoryOptions(sID) {
    sID.classList.add('d-none');
    sID.classList.remove('dropDownStart');
    sID.classList.add('cl_categories');
}

/**
 * Checks if the provided element contains a specific class.
 * @param {HTMLElement} sID - The element to check for the presence of the class.
 * @returns {boolean} - True if the element contains the class, false otherwise.
 */
function isContainingClass(sID) {
    return sID.classList.contains('d-none');
}

/**
 * Resets the category options for the provided element.
 * Removes the 'd-none' class to display the element.
 * Adds the 'dropDownStart' class to restore the default styling of the element.
 * Removes the 'cl_categories' class from the element.
 * @param {HTMLElement} sID - The element to reset the category options for.
 */
function resetCategoryOptions(sID) {
    sID.classList.remove('d-none');
    sID.classList.add('dropDownStart');
    sID.classList.remove('cl_categories');
}

/**
 * Resets the options for all categories.
 * Adds the 'd-none' and 'cl_categories' classes to hide and style the category elements.
 * Removes the 'dropDownStart' class from the category elements.
 */
function resetOptions() {
    for (let i = 0; i < categories.length; i++) {
        document.getElementById(categories[i]['name']).classList.add('d-none');
        document.getElementById(categories[i]['name']).classList.remove('dropDownStart');
        document.getElementById(categories[i]['name']).classList.add('cl_categories');
    }
}