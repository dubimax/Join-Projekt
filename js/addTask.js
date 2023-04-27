/**
 * Creates a new Task by given statusTag
 * @param {*} statusTag 
 */
function createNewTask(statusTag) {
    let taskTitle = document.getElementById('inputTitle').value;
    let taskDesc = document.getElementById('inputDescription').value;
    let taskCategory = selectedCategory;
    let assignedTo = getAssignedContacts();
    let taskDueDate = document.getElementById('inputDate').value;
    let taskPrio = document.getElementById(activeID).innerHTML.split(' ');
    taskPrio = taskPrio[0];
    let taskSubtasks = subtasks;
    let id = tasks.length + 1;
    let status = statusTag;
    tasks.push({ 'title': taskTitle, 'description': taskDesc, 'category': taskCategory, 'isAssigned': assignedTo, 'dueDate': taskDueDate, 'prio': taskPrio, 'subtasks': taskSubtasks, 'id': id, 'status': status });
    backend.setItem('tasks', JSON.stringify(tasks));
    subtasks = [];
    clearAllInputs();
    save();
}

/**
 * initialises AddTask Site
 */
async function initAddTask() {
    await includeHTML();
    generateNavigationLinks('AddTask', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateAddTaskHTML('addTask');
}

/**
 * Return the Value of the Chosen color
 * @returns 
 */
function getValueOfChosenColor() {
    for (let i = 0; i < colors.length; i++) {
        let isActive = document.getElementById(colors[i].slice(1)).classList.contains('colorCircleisActive');
        if (isActive) {
            return colors[i];
        }
    }
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
    cancelAddNew('addNewSubTask');
}

/**
 * Resets added Subtasks
 */
function clearListSubtask() {
    document.getElementById('list-subtask').innerHTML = '';
}

/**
 * resets value of given elements and set back the Style of LabelsFields
 * @param  {...any} ids elemnts to reset
 */
function clearFields(...ids) {
    for (let i = 0; i < ids.length; i++) {
        if (document.getElementById(ids[i])) {
            document.getElementById(ids[i]).value = '';
        }
        changeStyleOfLabel(ids[i]);

    }
}

/**
 * Change the Style of LabelField
 * @param {*} id 
 * @returns 
 */
function changeStyleOfLabel(id) {
    document.getElementById('id_urgent').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_medium').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_low').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('urgentImgID').src = 'img/urgentIcon.png';
    document.getElementById('mediumImgID').src = 'img/mediumIcon.png';
    document.getElementById('lowImgID').src = 'img/lowIcon.png';
    if (activeID.length == 0) {
        if (id == 'id_urgent') {
            document.getElementById(id).style = urgentColor;
            document.getElementById('urgentImgID').src = 'img/urgentWhiteIcon.png';
            activeID = id;
            activeImg = 'urgentImgID';
            return;
        }
        if (id == 'id_medium') {
            document.getElementById(id).style = mediumColor;
            document.getElementById('mediumImgID').src = 'img/mediumWhiteIcon.png';
            activeID = id;
            activeImg = 'mediumImgID';
            return;
        }
        if (id == 'id_low') {
            document.getElementById(id).style = lowColor;
            document.getElementById('lowImgID').src = 'img/lowWhiteIcon.png';
            activeID = id;
            activeImg = 'lowImgID';
            return;
        }
    } else {
        if (activeID == id) {
            document.getElementById(id).style = 'background-color: #FFFFFF; color: #000000;';
        } else {
            activeID = '';
            activeImg = '';
            changeStyleOfLabel(id);
        }
    }
}

/**
 * changes to an Inputfield
 * @param {*} id 
 */
function changeToInputField(id) {
    if (id == 'addNewCat') {
        document.getElementById('id_categoryBox').innerHTML = generatesChangedInputFieldHTML('label', 'input', 'Category', 'inputTextStd', 'text', 'newCat', 'addNewCat', 'addCategory()');
        addColorChoser();
        dropDown = false;
    }
    if (id == 'addNewSubTask') {
        document.getElementById('id_addNewSubTask').innerHTML = generatesChangedInputFieldHTML('label', 'input', 'Subtasks', 'inputTextStd', 'text', 'newSubtasks', 'addNewSubTask', 'generateCheckboxItem()');
    }
}

/**
 * removes event listener from DropDownMenus
 */
function removeEventListenerFromDropDown() {
    document.getElementById('categoryBox').removeEventListener('click', function () { });

    document.getElementById('assignedTo').removeEventListener('click', function () { });
    let selUser;
    for (let i = 0; i < categories.length; i++) {
        selCat = document.getElementById(categories[i]['name']);
        selCat.removeEventListener('click', function () { });
    }
    for (let j = 0; j < users.length; j++) {
        selUser = document.getElementById(users[j]['name']);
        selUser.removeEventListener('click', function () { });
    }
}

/**
 * adds event listener to DropDown Categories
 */
function addEventListenerToCategories() {
    let catBox = document.getElementById('categoryBox');
    let selCat;
    catBox.addEventListener('click', function () {
        showDropDownItems('categories');
    });
    for (let i = 0; i < categories.length; i++) {
        selCat = document.getElementById(categories[i]['name']);
        selCat.addEventListener('click', function (e) {
            let txt = e.currentTarget.attributes[1].textContent;
            setOption(txt, 'category');
            e.stopPropagation();
        });
    }
}

/**
 * Add eventlisteners
 */
function addEventListenerToDropDown() {
    addEventListenerToCategories();

    let userBox = document.getElementById('assignedTo');
    let selUser;
    userBox.addEventListener('click', function () {
        showDropDownItems('users');
    });


    for (let j = 0; j < users.length; j++) {
        selUser = document.getElementById(users[j]['name']);
        selUser.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
}

/**
 * Return the Assigned Contacts array
 * @returns 
 */
function getAssignedContacts() {
    for (let i = 0; i < users.length; i++) {
        if (document.getElementById(users[i]['name']).children[0].checked) {
            assigned.push(document.getElementById(users[i]['name']).children[0].value);
        }
    }
    return assigned;
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

        for (let i = 0; i < categories.length; i++) {
            document.getElementById(categories[i]['name']).classList.add('d-none');
            document.getElementById(categories[i]['name']).classList.remove('dropDownStart');
            document.getElementById(categories[i]['name']).classList.add('cl_categories');
        }
        if (document.getElementById(id).classList.contains('d-none')) {
            document.getElementById(id).classList.remove('d-none');
            document.getElementById(id).classList.add('dropDownStart');
            document.getElementById(id).classList.remove('cl_categories');
        } else {
            document.getElementById(id).classList.add('d-none');
            document.getElementById(id).classList.remove('dropDownStart');
            document.getElementById(id).classList.add('cl_categories');
        }
        selectedCategory = id;
    }
}



