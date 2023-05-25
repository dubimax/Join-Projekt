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
    generateAddTaskHTML('addTaskAtBoard', 'Edit');
    addCloseBtnToAddTaskAtBoard();
    addEventListenerToDropDown();
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
    
    setStyleProgressbar();
}

function resetBoardComplete(){
    for(let i = 0; i<document.getElementById('boardContainer').children.length;i++ ){
        if( document.getElementById('boardContainer').children[2]) document.getElementById('boardContainer').children[2].remove();
    }            
}



/**
 * Hides the add new task form at the board view.
 */
function hideAddNewTaskAtBoard() {
    addDisplayNone('addTaskAtBoard');
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
    resetBoardComplete();
    for (let i = 0; i < tasks.length; i++) {
        addTaskDetail(i);
    }
    addUserAcronyms('assignedUserLogoOpen');

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
        if (isSubtaskCheckedBoard(elementIndex, i)) count++;
    }
    return count;
}

/**
 * Checks if a subtask is checked for a given task.
 * @param {number} elementIndex - The index of the task in the tasks array.
 * @param {number} i - The index of the subtask in the subtasks array of the task.
 * @returns {boolean} - True if the subtask is checked, false otherwise.
 */
function isSubtaskCheckedBoard(elementIndex, i) {
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
    setInnerHTML('taskPrioOpen' + status + elementIndex, generateLabelsHTML('label', 'Prio','Board'));
    setInnerHTML('assignedUserOpen' + status + elementIndex,
        generatesOptionsFieldHTML('label', 'Assigned to', 'dropDownMenuField', 'assignedToEdit', './img/dropdownIcon.png', 'contacts to assign'));
    document.getElementById('assignedUserOpen' + status + elementIndex).style = "overflow:hidden;"
    addInviteNewContact();
    generateOptionsHTML(users, 'users', 'Edit');
    addAssignedUsersList(status, elementIndex);
    setActiveCheckbox(task);
    setStyleOfBoardLabel(aID);
    editEditField(status, elementIndex, 'editTitle', 'inputTextStd');
    editEditField(status, elementIndex, 'editDescription', 'inputDescriptionField');
    editEditField(status, elementIndex, 'editDate', 'inputTextStd');
    
    assigned = [];
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
    assigned = [];
    setInnerHTML('assignedUserOpen' + status + index, '');
     hideEditCard(status, index);
    resetStylesForOpenCard(status, index);
    resetAssigned(status, index);
    // resetTaskPrio(status, index);
    addUserAcronyms('assignedUserOpen', index, status);
    // addAssignedUsersList(status, index);
    document.getElementById('editTitle' + status + index).readOnly = true;
    document.getElementById('editDescription' + status + index).readOnly = true;
    document.getElementById('editDate' + status + index).readOnly = true;
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
        setAssignedCircle(task['isAssigned'][i]);
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
    pushToDatabase();
    updateBoardHTML();
}

/**
 * Updates the task data based on the edited values.
 * @param {number} index - The index of the task to edit.
 * @param {string} stati - The status of the task to edit.
 */
function editTaskData(index, stati) {
    tasks[index]['title'] = document.getElementById('editTitle' + stati + index).value;
    document.getElementById('editTitle' + stati + index).innerHTML = tasks[index]['title'];
    tasks[index]['description'] = document.getElementById('editDescription' + stati + index).value;
    document.getElementById('editDescription' + stati + index).innerHTML = tasks[index]['description'];
    tasks[index]['category'] = tasks[index]['category'];
    tasks[index]['isAssigned'] = getAssignedContacts();
    tasks[index]['dueDate'] = document.getElementById('editDate' + stati + index).value;
    let taskPrio = document.getElementById(activeID).innerHTML.split(' ');
    tasks[index]['prio'] = taskPrio[0].toLowerCase();
    tasks[index]['subtasks'] = tasks[index]['subtasks'];
    tasks[index]['id'] = tasks[index]['id'];
    tasks[index]['status'] = tasks[index]['status'];
}

/**
 * Sets the style of the board label based on the given active ID (aID).
 * @param {string} aID - The active ID of the board label.
 */
function setStyleOfBoardLabel(aID) {
    setStyleOf(aID, urgentColor, 'urgent');
    setStyleOf(aID, mediumColor, 'medium');
    setStyleOf(aID, lowColor, 'low');
}

/**
 * Adds the assigned users list to the specified status and element index.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 */
function addAssignedUsersList(status, elementIndex) {
    addInnerHTML('assignedUserOpen' + status + elementIndex, generateAssignedListHTML());
}

/**
 * Enables editing for the specified field in the edit card.
 * @param {string} status - The status of the task.
 * @param {number} elementIndex - The index of the task element.
 * @param {string} id - The ID of the field to be edited.
 * @param {string} addClass - The CSS class to be added to the field.
 */
function editEditField(status, elementIndex, id, addClass) {
    document.getElementById(id + status + elementIndex).removeAttribute('readonly');
    document.getElementById(id + status + elementIndex).classList.add(addClass);
}

/**
 * Closes the open card and hides the overlay.
 * @param {string} status - The status of the task.
 * @param {number} index - The index of the task element.
 */
function closeOpenCard(status, index) {
    addDisplayNone('openCard' + status + index);
    document.getElementById('overlay').style.display = "none";
    save();
    pushToDatabase();
    updateBoardHTML();
}

/**
 * Allows dropping of dragged elements by preventing the default behavior.
 * @param {Event} ev - The dragover event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves the currently dragged element to the specified status.
 * Updates the status of the task, saves the changes, updates the board HTML, and pushes the changes to the database.
 * @param {string} status - The status to move the task to.
 */
function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    save();
    updateBoardHTML();
    pushToDatabase();
}

/**
 * Adds the 'dragAreaHighlight' class to the specified element to highlight it.
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


/**
 * Shows the "Add New Task" section on the board and populates it with necessary HTML.
 * Updates event listeners for the dropdown menu.
 */
function showAddNewTaskAtBoard(status) {
    removeDisplayNone('addTaskAtBoard');
    setOnSubmitForm(status);
}

/**
 * Resets the content of each column on the board to empty.
 * Clears the task cards from the "ToDo", "InProgress", "AwaitingFeedback", and "Done" columns.
 */
function resetBoard() {
    setInnerHTML('toDo', '');
    setInnerHTML('inProgress', '');
    setInnerHTML('awaitingFeedback', '');
    setInnerHTML('done', '');
}

/**
 * Searches for tasks based on the entered search query and updates the display to show only the found tasks.
 */
function searchTasks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    for (let i = 0; i < tasks.length; i++) onlyShowFoundTasks(i,search);
}

/**
 * Updates the display to show only the tasks that match the search query.
 * @param {number} i - The index of the task to check.
 * @param {string} search - The search query to match against task titles and descriptions.
 */
function onlyShowFoundTasks(i,search) {
    let taskTitle = tasks[i]['title'];
    let taskIndex = tasks.indexOf(tasks[i]);
    let tDescription = tasks[i]['description'];
    if ((taskTitle.toLowerCase().includes(search) || tDescription.toLowerCase().includes(search))) {
        if(isContainingClassDnone('card' + tasks[i]['status'] + taskIndex)) removeDisplayNone('card' + tasks[i]['status'] + taskIndex);
    }
    else addDisplayNone('card' + tasks[i]['status'] + taskIndex);
}

/**
 * Deletes a task from the tasks array.
 * @param {string} status - The status of the task to delete.
 * @param {number} ind - The index of the task to delete.
 */
function deleteTask(status, ind) {
    tasks.splice(ind, 1);
    closeOpenCard(status, ind);
    pushToDatabase();
    updateBoardHTML();
}

