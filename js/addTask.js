usersAssignedTo = [];
usersAssignedToShown = [];

/**
 * Creates a new Task by given statusTag
 * @param {*} statusTag 
 */
function createNewTask(statusTag) {
    tasks.push({
        'title': getValue('inputTitle'), 'description': getValue('inputDescription'),
        'category': selectedCategory, 'isAssigned': getAssignedContacts(), 'dueDate': getValue('inputDate'),
        'prio': getTasksPrio(), 'subtasks': getSubtasks(), 'id': setTaskID(), 'status': statusTag
    });
    pushToDatabase();
    clearAllInputs();
}

function getTasksPrio() {
    let taskPrio = getValue(activeID).innerHTML.split(' ');
    taskPrio = taskPrio[0];
    return taskPrio;
}

function setTaskID() {
    return tasks.length + 1;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function getSubtasks() {
    for (let i = 0; i < subtasks.length; i++) { if (isSubtaskChecked(i)) subtasks[i]['checked'] = true; }
}

function isSubtaskChecked(i) {
    return document.getElementById('list-subtask-' + subtasks[i]['item']).checked == true;
}

/**
 * initialises AddTask Site
 */
async function initAddTask() {
    await includeHTML();
    generateNavigationLinks('AddTask', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateAddTaskHTML('addTask');
    setOnSubmitForm('toDo');
}

/**
 * Return the Value of the Chosen color
 * @returns 
 */
function getValueOfChosenColor() {
    for (let i = 0; i < colors.length; i++) { if (isActiveColor(i)) return colors[i]; }
}

function isActiveColor(i) {
    return document.getElementById(colors[i].slice(1)).classList.contains('colorCircleisActive');
}

/**
 * Sets color active by its id
 * @param {*} id 
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
 * Resets all inputFields
 */
function clearAllInputs() {
    clearFields('inputTitle', 'inputDescription', 'inputDate', 'newSubtasks');
    clearListSubtask();
    cancelAddNew('addNewCat');
    cancelAddNew('assignedTo');
    cancelAddNew('addNewSubTask');
    clearListAssigned();
}

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

function changeStyleIfExistent() {
    if (isElementExistent(ids[i])) document.getElementById(ids[i]).value = '';
    changeStyleOfLabel(ids[i]);
}

function isElementExistent(id) {
    return document.getElementById(id);
}

function resetAllLabelContainer() {
    document.getElementById('id_urgent').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_medium').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_low').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('urgentImgID').src = '../img/urgentIcon.png';
    document.getElementById('mediumImgID').src = '../img/mediumIcon.png';
    document.getElementById('lowImgID').src = '../img/lowIcon.png';
}



function setStyle(id, color, name) {
    document.getElementById(id).style = color;
    document.getElementById(name + 'ImgID').src = `../img/${name}WhiteIcon.png`;
    activeID = id;
    activeImg = name + 'ImgID';
    return;
}

function setStyleOfUrgent(id) {
    if (id == 'id_urgent') setStyle(id, urgentColor, 'urgent');
}

function setStyleOfMedium(id) {
    if (id == 'id_medium') setStyle(id, mediumColor, 'medium');
}

function setStyleOfLow(id) {
    if (id == 'id_low') setStyle(id, lowColor, 'low');
}

function setStyles(id) {
    setStyleOfUrgent(id);
    setStyleOfMedium(id);
    setStyleOfLow(id);
}

/**
 * Change the Style of LabelField
 * @param {*} id 
 * @returns 
 */
function changeStyleOfLabel(id) {
    resetAllLabelContainer();
    if (activeID.length == 0) setStyles(id);
    else refreshStyleOfSelectedLabel(id);
}

/**
 * resets style when label already is selected
 * @param {*} id 
 */
function refreshStyleOfSelectedLabel(id) {
    if (activeID == id) document.getElementById(id).style = 'background-color: #FFFFFF; color: #000000;';
    else changeStyleOfLabels(id)
}

function changeStyleOfLabels(id) {
    activeID = '';
    activeImg = '';
    changeStyleOfLabel(id);
}

/**
 * changes to an Inputfield
 * @param {*} id 
 */
function changeToInputField(id) {
    if (id == 'addNewCat') changeToAddNewCat();
    if (id == 'addNewSubTask') changeToAddNewSubtask();
}

function changeToAddNewCat() {
    document.getElementById('id_categoryBox').innerHTML =
        generatesChangedInputFieldHTML('label', 'input', 'Category', 'inputTextStd', 'text',
            'newCat', 'addNewCat', 'addCategory()', 'newCategoriesField');
    addColorChoser();
    dropDown = false;
}

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

function removeEventlistenerFromSelectUsers() {
    let selUser;
    for (let j = 0; j < users.length; j++) {
        selUser = document.getElementById(users[j]['name']);
        selUser.removeEventListener('click', function () { });
    }
}

function removeEventlistenerFromSelectCategories() {
    let selCat;
    for (let i = 0; i < categories.length; i++) {
        selCat = document.getElementById(categories[i]['name']);
        selCat.removeEventListener('click', function () { });
    }
}

/**
 * adds event listener to DropDown Categories
 */
function addEventListenerToCategories() {
    let catBox = document.getElementById('categoryBox');
    catBox.addEventListener('click', function () { showDropDownItems('categories')});
    addEvenListenerToSelectCategories();
}

/**
 * Add an Eventlistener to select categories in dropdown
 */
function addEvenListenerToSelectCategories() {
    for (let i = 0; i < categories.length; i++) addEvenListenerToSelectCategory(i);
}

function addEvenListenerToSelectCategory(i) {
    let selCat = document.getElementById(categories[i]['name']);
    selCat.addEventListener('click', function (e) {
        setEventListenerToSelectCategory(e)});
}

function setEventListenerToSelectCategory(e) {
    let txt = e.currentTarget.attributes[1].textContent;
    setOption(txt, 'category');
    e.stopPropagation();
}

/**
 * Add eventlisteners
 */
function addEventListenerToDropDown() {
    addEventListenerToCategories();
    addEventListenerToSelectUserBox();
}

function addEventListenerToSelectUserBox() {
    let userBox = document.getElementById('assignedTo');
    userBox.addEventListener('click', function () { showDropDownItems('users')});
    addEventListenerToSelectUsers();
}

function removeEventlistenerFromSelectUserBox() {
    let userBox = document.getElementById('assignedTo');
    userBox.removeEventListener('click', function () { });
    for (let i = 0; i < users.length; i++) removeListenerFromSelectUserBox(i);
}

function removeListenerFromSelectUserBox(i) {
    let selUser = document.getElementById(users[i]['name']);
    selUser.removeEventListener('click', function () { });
}

function addEventListenerToSelectUsers() {
    for (let j = 0; j < users.length; j++) addEventListenerToSelectUser(j);
}

function addEventListenerToSelectUser(j) {
    let selUser = document.getElementById(users[j]['name']);
    selUser.addEventListener('click', function (e) {
         setChecked(j, e)});
}

function setChecked(j, e) {
    e.stopPropagation();
    if (!isUserAssigned(j)) setCheckedToSelectUser(j);
    else if (isUserAssigned(j)) setUnCheckedToSelectUser(j);
}

function setUnCheckedToSelectUser(j) {
    document.getElementById('colorCircleMedium' + users[j]['name']).remove();
    document.getElementById(users[j]['name']).children[0].checked = false;
    let index = usersAssignedTo.indexOf(users[j]['name']);
    usersAssignedTo.splice(index, 1);
}

function setCheckedToSelectUser(j) {
    usersAssignedTo.push(users[j]['name']);
    document.getElementById(users[j]['name']).children[0].checked = true;
    setAssignedCircle(users[j]);
}

function isUserAssigned(j) {
    return usersAssignedTo.includes(users[j]['name']);
}

function setAssignedCircle(username) {
    document.getElementById('list-assigned-user').innerHTML += `
        <div class="colorCircleMedium" id="colorCircleMedium${username.name}" style="background:${username.color}">${getFirstLettersOfName(username.name)}</div>
     `;
}

/**
 * Return the Assigned Contacts array
 * @returns 
 */
function getAssignedContacts() {
    for (let i = 0; i < users.length; i++) { if (checkIfCOntactIsAssigned(i)) addAssignedUser(i) }
    return assigned;
}

function addAssignedUser(i) {
    assigned.push(document.getElementById(users[i]['name']).children[0].value);
}

function checkIfCOntactIsAssigned(i) {
    return document.getElementById(users[i]['name']).children[0].checked;
}

/**
 * Sets the selected option of dropdown Categories
 * @param {*} id 
 * @param {*} id2 
 */
function setOption(id, id2) {
    if (id2 == 'category') {
        document.getElementById('CategorycategoryBox').classList.add('d-none');
        document.getElementById('addNewCat').classList.add('d-none');
        dropDownCat = false;
        resetOptions();
        setCategoryOptions(id);
        selectedCategory = id;
    }
}

/**
 * Sets the options for categoryItems
 * @param {*} id 
 */
function setCategoryOptions(id) {
    let sID = document.getElementById(id);
    if (isContainingClass(sID)) resetCategoryOptions(sID);
    else changeCategoryOptions(sID);
}

function changeCategoryOptions(sID) {
    sID.classList.add('d-none');
    sID.classList.remove('dropDownStart');
    sID.classList.add('cl_categories');
}

function isContainingClass(sID) {
    return sID.classList.contains('d-none');
}

function resetCategoryOptions(sID) {
    sID.classList.remove('d-none');
    sID.classList.add('dropDownStart');
    sID.classList.remove('cl_categories');
}

/**
 * Reset categoryOptions
 */
function resetOptions() {
    for (let i = 0; i < categories.length; i++) {
        document.getElementById(categories[i]['name']).classList.add('d-none');
        document.getElementById(categories[i]['name']).classList.remove('dropDownStart');
        document.getElementById(categories[i]['name']).classList.add('cl_categories');
    }
}