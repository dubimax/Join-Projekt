let currentDraggedElement;

/**
 * Initialize the Board Page
 */
async function initBoard() {
    await includeHTML();
    load();
    generateNavigationLinks('Board', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateAddTaskToBoardImg();
    updateBoardHTML();
}

/**
 * Uptade the Board Page
 */
function updateBoardHTML() {
    addArea('toDo');
    addArea('inProgress');
    addArea('awaitingFeedback');
    addArea('done');
    addUserAcronyms('assignedUserLogo');
    taskDetails();
    addUserAcronyms('assignedUserLogoOpen');
    setStyleProgressbar();
}

/**
 * Displays the add new task form at the board view with the standard configuration.
 */
function showAddNewTaskAtBoardStandard() {
    if (document.getElementById('addTaskAtBoard')) setInnerHTML('addTaskAtBoard', '');
    removeDisplayNone('addTaskAtBoard');
    generateAddTaskHTML('addTaskAtBoard');
    addCloseBtnToAddTaskAtBoard();
    setOnSubmitForm('toDo');
    addEventListenerToDropDown();
}

/**
 * Hides the add new task form at the board view.
 */
function hideAddNewTaskAtBoard() {
    addDisplayNone('addTaskAtBoard');
    removeEventListenerFromDropDown();
}

/**
 * Adds task areas to the specified container based on the given status ID.
 * @param {string} id - The ID of the container to which the task areas will be added.
 */
function addArea(id) {
    let area = tasks.filter(t => t['status'] == id);
    setInnerHTML(id, '');
    for (let index = 0; index < area.length; index++) addInnerHTML(id, generateTodoHTML(area[index], id));
}

/**
 * Adds task details for all tasks.
 */
function taskDetails() {
    for (let i = 0; i < tasks.length; i++) addTaskDetail(i);
}

/**
 * Adds task details for a specific task to the board container.
 * @param {number} i - The index of the task in the tasks array.
 */
function addTaskDetail(i) {
    const element = tasks[i];
    addInnerHTML('boardContainer', generateOpenCardHTML(element, element['status']));
    setRowCount(element['status'], i);
}

/**
 * Sets the currently dragged element ID.
 * @param {string} id - The ID of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Retrieves the color associated with a specific element.
 * @param {string} element - The element to retrieve the color for.
 * @returns {string} The color associated with the element.
 */
function getColor(element) {
    for (let i = 0; i < categories.length; i++) {
        if (isElement(i, element)) return categories[i]['color'];
    }
}

/**
 * Checks if the element's category matches the category at the specified index in the categories array.
 * @param {number} i - The index of the category in the categories array.
 * @param {Object} element - The element to compare the category with.
 * @returns {boolean} True if the element's category matches the category at the specified index, false otherwise.
 */
function isElement(i, element) {
    return categories[i]['name'] == element['category'];
}

/**
 * Sets the style of the progress bar for each task.
 */
function setStyleProgressbar() {
    for (let i = 0; i < tasks.length; i++) {
        let progress = getProgressOfSubtasks(i);
        let difference = 100 - progress;
        if (isTaskAndProgressNotZero(i, progress)) setStyleOfProgressbar(generateProgresstStyleHTML(progress, difference), i);
    }
}

/**
 * Sets the style of the progress bar for a specific task.
 * @param {string} text - The CSS style text to apply to the progress bar.
 * @param {number} i - The index of the task in the tasks array.
 */
function setStyleOfProgressbar(text, i) {
    document.getElementById('progressbar' + tasks[i]['status'] + i).style = text;
}

/**
 * Checks if the task element and progress are not zero.
 * @param {number} i - The index of the task in the tasks array.
 * @param {number} progress - The progress of the task.
 * @returns {boolean} - Returns true if the task element exists and the progress is not zero, otherwise false.
 */
function isTaskAndProgressNotZero(i, progress) {
    return document.getElementById('progressbar' + tasks[i]['status'] + i) && progress != 0;
}

/**
 * Calculates the progress of subtasks for a given task.
 * @param {number} index - The index of the task in the tasks array.
 * @returns {number} - The progress of the task based on the completed subtasks.
 */
function getProgressOfSubtasks(index) {
    let progress = getCheckedSubtasks(index);
    let size = tasks[index]['subtasks'].length;
    return 100 / size * progress;
}

/**
 * Counts the number of checked subtasks for a given task.
 * @param {number} elementIndex - The index of the task in the tasks array.
 * @returns {number} - The number of checked subtasks.
 */
function getCheckedSubtasks(elementIndex) {
    let count = 0;
    for (let i = 0; i < tasks[elementIndex]['subtasks'].length; i++) {
        if (isSubtaskChecked(elementIndex, i)) count++;
    }
    return count;
}

/**
 * Checks if a subtask is checked for a given task.
 * @param {number} elementIndex - The index of the task in the tasks array.
 * @param {number} i - The index of the subtask in the subtasks array of the task.
 * @returns {boolean} - True if the subtask is checked, false otherwise.
 */
function isSubtaskChecked(elementIndex, i) {
    return tasks[elementIndex]['subtasks'][i]['checked'] == true;
}

/**
 * Opens a card with detailed information for a task.
 * @param {number} index - The index of the task in the tasks array.
 * @param {string} status - The status of the task.
 */
function openCard(index, status) {
    if (isHTMLElement('openCard', status, index)) removeDisplayNone('openCard' + status + index);
    setInnerHTML('assignedUserLogoOpen' + status + index, '');
    addUserAcronyms('assignedUserLogoOpen');
    addSubtasksToCardOpen(status, index);
    document.getElementById('overlay').style.display = "block";
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
/**
* Adds user acronyms to the specified HTML element.
* @param {string} id - The id of the HTML element.
*/
function addUserAcronyms(id) {
    for (let i = 0; i < tasks.length; i++) {
        let index = tasks.indexOf(tasks[i]);
        let status = tasks[i]['status'];
        for (let j = 0; j < tasks[i]['isAssigned'].length; j++) {
            if (id == 'assignedUserLogoOpen') addNamesToOpenCard(id, i, index, status, j);
            else if (id == 'assignedUserLogo') addNamesToCard(id, i, index, status, j);
        }
    }
}

/**
 * Adds user names to the card with the specified id.
 * @param {string} id - The id of the card element.
 * @param {number} i - The index of the task.
 * @param {number} index - The index of the task within the tasks array.
 * @param {number} status - The status of the task.
 * @param {number} j - The index of the assigned user within the isAssigned array.
 */
function addNamesToCard(id, i, index, status, j) {
    addInnerHTML(id + tasks[i]['status'] + index, generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainer'));
}

/**
 * Adds user names to the open card with the specified id.
 * @param {string} id - The id of the open card element.
 * @param {number} i - The index of the task.
 * @param {number} index - The index of the task within the tasks array.
 * @param {number} status - The status of the task.
 * @param {number} j - The index of the assigned user within the isAssigned array.
 */
function addNamesToOpenCard(id, i, index, status, j) {
    addInnerHTML(id + tasks[i]['status'] + index, generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainerOpen'));
    setAssignedNames(tasks[i]['status'], index, tasks[i]['isAssigned'][j], 'assignedToContainerOpen');
}

/**
 * Finds the color associated with the specified username.
 * @param {string} username - The username for which to find the color.
 * @returns {string|undefined} - The color associated with the username, or undefined if not found.
 */
function findColor(username) {
    let color;
    users.find((user) => { if (user.name == username) color = user.color; });
    return color;
}

/**
 * Sets the assigned names for a task in the specified container.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task.
 * @param {string} username - The username to set.
 * @param {string} id - The ID of the container where the assigned name will be added.
 */
function setAssignedNames(status, index, username, id) {
    let category = tasks[index]['category'];
    addInnerHTML(category + id + username + status + index, generateUserNameDivHTML(username));
}

/**
 * Sets the row count for the text area field based on its content length.
 * @param {string} status - The status of the element.
 * @param {number} elementIndex - The index of the element.
 */
function setRowCount(status, elementIndex) {
    let textAreaField = document.getElementById('editTitle' + status + elementIndex);
    if (textAreaField.cols >= "20") textAreaField.rows = "2";
    else textAreaField.rows = "1";
}

/**
 * Adds subtasks to the open card.
 * @param {string} status - The status of the element.
 * @param {number} index - The index of the element.
 */
function addSubtasksToCardOpen(status, index) {
    setInnerHTML('editSubtasksContainer' + status + index, '');
    for (let i = 0; i < tasks[index]['subtasks'].length; i++) addInnerHTML('editSubtasksContainer' + status + index, addCheckBoxAtBoardHTML(index, i, status));
    for (let j = 0; j < tasks[index]['subtasks'].length; j++) {
        if (tasks[index]['subtasks'][j]['checked'] == true) setCheckBoxCheckedOpenCard(index, j, status, true);
        else setCheckBoxCheckedOpenCard(index, j, status, false);
    }
}

/**
 * Sets the checked property of the checkbox in the open card.
 * @param {number} index - The index of the element.
 * @param {number} j - The index of the subtask.
 * @param {string} status - The status of the element.
 * @param {boolean} prop - The value of the checked property.
 */
function setCheckBoxCheckedOpenCard(index, j, status, prop) {
    document.getElementById('editSubtasks' + tasks[index]['subtasks'][j]['item'] + status + index).checked = prop;
}

/**
 * Sets the checked property of a subtask in the board.
 * @param {string} status - The status of the element.
 * @param {number} index - The index of the element.
 * @param {number} i - The index of the subtask.
 */
function setSubtaskChecked(status, index, i) {
    if (isSubtaskAtBoardChecked(index, i, status)) tasks[index]['subtasks'][i]['checked'] = true;
    else tasks[index]['subtasks'][i]['checked'] = false;
    pushToDatabase();
}

/**
 * Checks if a subtask in the board is checked.
 * @param {number} index - The index of the element.
 * @param {number} i - The index of the subtask.
 * @param {string} status - The status of the element.
 * @returns {boolean} - True if the subtask is checked, false otherwise.
 */
function isSubtaskAtBoardChecked(index, i, status) {
    return document.getElementById('editSubtasks' + tasks[index]['subtasks'][i]['item'] + status + index).checked == true;
}

/**
 * Opens the edit card view for a specific task.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 * @param {string} aID - The ID of the assigned user.
 */
function editCard(status, elementIndex, aID) {
    let task = tasks[elementIndex];
    showEditCard(status, elementIndex);
    setStyleForEditCard(status, elementIndex);
    setDataForEditCard(status, elementIndex, task, aID);
}

/**
 * Sets the data for the edit card view.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 * @param {Object} task - The task object.
 * @param {string} aID - The ID of the assigned user.
 */
function setDataForEditCard(status, elementIndex, task,aID) {
    setInnerHTML('taskPrioOpen' + status + elementIndex, generateLabelsHTML('label', 'Prio'));
    setInnerHTML('assignedUserOpen' + status + elementIndex,
        generatesOptionsFieldHTML('label', 'Assigned to', 'dropDownMenuField', 'assignedTo', './img/dropdownIcon.png', 'contacts to assign'));
    document.getElementById('assignedUserOpen' + status + elementIndex).style = "overflow:hidden;"
    addInviteNewContact();
    generateOptionsHTML(users, 'users');
    addAssignedUsersList(status, elementIndex);
    setActiveCheckbox(task);
    setStyleOfBoardLabel(aID);
    editEditField(status, elementIndex, 'editTitle', 'inputTextStd');
    editEditField(status, elementIndex, 'editDescription', 'inputDescriptionField');
    editEditField(status, elementIndex, 'editDate', 'inputTextStd');
    addEventListenerToSelectUserBox();
}

/**
 * Sets the style for the edit card view.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 */
function setStyleForEditCard(status, elementIndex) {
    document.getElementById('editTitle' + status + elementIndex).classList.remove('taskTitleOpen');
    document.getElementById('editDescription' + status + elementIndex).classList.remove('taskDescriptionOpen');
    document.getElementById('editDate' + status + elementIndex).classList.remove('taskDueDateOpen');
    document.getElementById('dateContainer' + status + elementIndex).style = "display:block;";
}

/**
 * Shows the edit card view by modifying the display of various elements.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 */
function showEditCard(status, elementIndex) {
    addDisplayNone('taskStatusCategory' + status + elementIndex);
    addDisplayNone('editDeleteBtnOpen' + status + elementIndex);
    removeDisplayNone('editSaveBtnOpen' + status + elementIndex);
    addDisplayNone('editSubtasksContainer' + status + elementIndex);
    removeDisplayNone('openCardTitle' + status + elementIndex);
    removeDisplayNone('openCardDescription' + status + elementIndex);
}

/**
 * Resets the edit card view by restoring default states and styles.
 * @param {number} index - The index of the task element.
 * @param {string} status - The status of the task.
 */
function resetEditCard(index, status) {
    document.getElementById('editTitle' + status + index).readOnly = true;
    document.getElementById('editDescription' + status + index).readOnly = true;
    document.getElementById('editDate' + status + index).readOnly = true;
    setInnerHTML('assignedUserOpen' + status + index, '');
    hideEditCard(status, index);
    resetStylesForOpenCard(status, index);
    resetAssigned(status, index);
    resetTaskPrio(status, index);
    addUserAcronyms('assignedUserOpen', index, status);
    addAssignedUsersList(status, index);
}

/**
 * Resets the styles for the open card view to their default states.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task element.
 */
function resetStylesForOpenCard(status, index) {
    document.getElementById('editDate' + status + index).classList.remove('inputTextStd');
    document.getElementById('editDescription' + status + index).classList.remove('inputDescriptionField');
    document.getElementById('editTitle' + status + index).classList.remove('inputTextStd');
    document.getElementById('editTitle' + status + index).classList.add('taskTitleOpen');
    document.getElementById('editDescription' + status + index).classList.add('taskDescriptionOpen');
    document.getElementById('editDate' + status + index).classList.add('taskDueDateOpen');
    document.getElementById('dateContainer' + status + index).style = "display:flex;";
}

/**
 * Hides the edit card view and shows the default open card view.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task element.
 */
function hideEditCard(status, index) {
    removeDisplayNone('editDeleteBtnOpen' + status + index);
    addDisplayNone('editSaveBtnOpen' + status + index);
    removeDisplayNone('editSubtasksContainer' + status + index);
    addDisplayNone('openCardTitle' + status + index);
    addDisplayNone('openCardDescription' + status + index);
    removeDisplayNone('taskStatusCategory' + status + index);
}

/**
 * Resets the task priority to its initial value.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task element.
 */
function resetTaskPrio(status, index) {
    let element = tasks[index];
    setInnerHTML('taskPrioOpen' + status + index, resetTaskPrioHTML(element));
}

/**
 * Resets the assigned users to their initial values.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task element.
 */
function resetAssigned(status, index) {
    setInnerHTML('assignedUserOpen' + status + index, resetAssignedHTML(status, index));
}

/**
 * Sets the checkboxes of assigned users to active.
 * @param {Object} task - The task object containing assigned user information.
 */
function setActiveCheckbox(task) {
    for (let i = 0; i < task['isAssigned'].length; i++) {
        document.getElementById(task['isAssigned'][i]).children[0].checked = true;
    }
}

/**
 * Edits the task data and updates the board.
 * @param {number} index - The index of the task to edit.
 * @param {string} stati - The status of the task to edit.
 */
function editThisTask(index, stati) {
    editTaskData(index, stati);
    addDisplayNone('openCard' + stati + index);
    addDisplayNone('overlay');
    resetEditCard(index, stati);
    save();
    updateBoardHTML();
    pushToDatabase();
}

/**
 * Updates the task data based on the edited values.
 * @param {number} index - The index of the task to edit.
 * @param {string} stati - The status of the task to edit.
 */
function editTaskData(index, stati) {
    tasks[index]['title'] = document.getElementById('editTitle' + stati + index).value;
    tasks[index]['description'] = document.getElementById('editDescription' + stati + index).value;
    tasks[index]['category'] = tasks[index]['category'];
    assigned = [];
    tasks[index]['isAssigned'] = getAssignedContacts();
    tasks[index]['dueDate'] = document.getElementById('editDate' + stati + index).value;
    let taskPrio = document.getElementById(activeID).innerHTML.split(' ');
    tasks[index]['prio'] = taskPrio[0];
    tasks[index]['subtasks'] = tasks[index]['subtasks'];
    tasks[index]['id'] = tasks[index]['id'];
    tasks[index]['status'] = tasks[index]['status'];
}

function setStyleOfBoardLabel(aID) {
    if (aID == 'id_urgent') setStyleOfUrgent(aID);
    if (aID == 'id_medium') setStyleOfMedium(aID);
    if (aID == 'id_low') setStyleOfLow(aID);
}

function addAssignedUsersList(status, elementIndex) {
    addInnerHTML('assignedUserOpen' + status + elementIndex, generateAssignedListHTML());
}

function editEditField(status, elementIndex, id, addClass) {
    document.getElementById(id + status + elementIndex).removeAttribute('readonly');
    document.getElementById(id + status + elementIndex).classList.add(addClass);
}

/**
 * Add display:none to close the bigger card
 */
function closeOpenCard(status, index) {
    addDisplayNone('openCard' + status + index);
    document.getElementById('overlay').style.display = "none";
    resetEditCard(index, status);
}

/**
 * Allow the drop from card
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Move the card from current area to antother area
 * @param {*} status is To do, in Progress, Awaiting Feedback or Done (Area)
 */
function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    save();
    updateBoardHTML();
    pushToDatabase();
}

/**
 * Generate the highlight if dragged the card
 * @param {*} id of the card
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

// generate add task funktionen
function createNewTaskAtBoard(statusTag) {
    let taskTitle = document.getElementById('inputTitle').value;
    let taskDesc = document.getElementById('inputDescription').value;
    let taskCategory = selectedCategory;
    let assignedTo = getAssignedContacts();
    let taskDueDate = document.getElementById('inputDate').value;
    let taskPrio = document.getElementById(activeID).innerHTML.split(' ');
    taskPrio = taskPrio[0];
    getSubtasks();
    let taskSubtasks = subtasks;
    let id = tasks.length + 1;
    let status = statusTag;
    tasks.push({ 'title': taskTitle, 'description': taskDesc, 'category': taskCategory, 'isAssigned': assignedTo, 'dueDate': taskDueDate, 'prio': taskPrio, 'subtasks': taskSubtasks, 'id': id, 'status': status });
    pushToDatabase();
    subtasks = [];
    clearAllInputs();
}

function showAddNewTaskAtBoard() {
    if (document.getElementById('addTaskAtBoard')) setInnerHTML('addTaskAtBoard', '');
    removeDisplayNone('addTaskAtBoard');
    generateAddTaskHTML('addTaskAtBoard');
    addCloseBtnToAddTaskAtBoard();
    removeEventListenerFromDropDown();
    addEventListenerToDropDown();
}

/**
 * reset the board and deletes all tasks from the html code
 */
function resetBoard() {
    setInnerHTML('toDo', '');
    setInnerHTML('inProgress', '');
    setInnerHTML('awaitingFeedback', '');
    setInnerHTML('done', '');
}

/**
 * Search the tasks and filter by title or description
 */
function searchTasks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    for (let i = 0; i < tasks.length; i++) onlyShowFoundTasks(i,search);
}

function onlyShowFoundTasks(i,search) {
    let taskTitle = tasks[i]['title'];
    let taskIndex = tasks.indexOf(tasks[i]);
    let tDescription = tasks[i]['description'];
    if ((taskTitle.toLowerCase().includes(search) || tDescription.toLowerCase().includes(search)) &&
        isContainingClassDnone('card' + tasks[i]['status'] + taskIndex)) removeDisplayNone('card' + tasks[i]['status'] + taskIndex);
    else addDisplayNone('card' + tasks[i]['status'] + taskIndex);
}

function deleteTask(status, ind) {
    tasks.splice(ind, 1);
    removeEventlistenerFromSelectUserBox();
    closeOpenCard(status, ind);
    pushToDatabase();
    updateBoardHTML();
}

