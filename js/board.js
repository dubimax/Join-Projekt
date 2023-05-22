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

function showAddNewTaskAtBoardStandard() {
    if (document.getElementById('addTaskAtBoard')) setInnerHTML('addTaskAtBoard', '');
    removeDisplayNone('addTaskAtBoard');
    generateAddTaskHTML('addTaskAtBoard');
    addCloseBtnToAddTaskAtBoard();
    setOnSubmitForm('toDo');
    addEventListenerToDropDown();
}

function hideAddNewTaskAtBoard() {
    addDisplayNone('addTaskAtBoard');
    removeEventListenerFromDropDown();
}

function addArea(id) {
    let area = tasks.filter(t => t['status'] == id);
    setInnerHTML(id, '');
    for (let index = 0; index < area.length; index++) {
        addInnerHTML(id, generateTodoHTML(area[index], id));
    }
}

function taskDetails() {
    for (let i = 0; i < tasks.length; i++) addTaskDetail(i);
}

function addTaskDetail(i) {
    const element = tasks[i];
    addInnerHTML('boardContainer', generateOpenCardHTML(element, element['status']));
    setRowCount(element['status'], i);
}

/**
 * Starting with dragging a card
 * @param {*} id is the of current dragging card
 */
function startDragging(id) {
    currentDraggedElement = id;
}

function getColor(element) {
    for (let i = 0; i < categories.length; i++) {
        if (isElement(i, element)) return categories[i]['color'];
    }
}

function isElement(i, element) {
    return categories[i]['name'] == element['category'];
}

function setStyleProgressbar() {
    for (let i = 0; i < tasks.length; i++) {
        let progress = getProgressOfSubtasks(i);
        let difference = 100 - progress;
        if (isTaskAndProgressNotZero(i, progress)) setStyleOfProgressbar(generateProgresstStyleHTML(progress, difference), i);
    }
}

function setStyleOfProgressbar(text, i) {
    document.getElementById('progressbar' + tasks[i]['status'] + i).style = text;
}

function isTaskAndProgressNotZero(i, progress) {
    return document.getElementById('progressbar' + tasks[i]['status'] + i) && progress != 0;
}

function getProgressOfSubtasks(index) {
    let progress = getCheckedSubtasks(index);
    let size = tasks[index]['subtasks'].length;
    return 100 / size * progress;
}

function getCheckedSubtasks(elementIndex) {
    let count = 0;
    for (let i = 0; i < tasks[elementIndex]['subtasks'].length; i++) {
        if (isSubtaskChecked(elementIndex, i)) count++;
    }
    return count;
}

function isSubtaskChecked(elementIndex, i) {
    return tasks[elementIndex]['subtasks'][i]['checked'] == true;
}

/**
 * Remove display:none from the bigger card to see it
 */
function openCard(index, status) {
    if (isHTMLElement('openCard', status, index)) removeDisplayNone('openCard' + status + index);
    setInnerHTML('assignedUserLogoOpen' + status + index, '');
    addUserAcronyms('assignedUserLogoOpen');
    addSubtasksToCardOpen(status, index);
    document.getElementById('overlay').style.display = "block";
}

function isHTMLElement(id, status, index) {
    return document.getElementById(id + status + index);
}
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

function addNamesToCard(id, i, index, status, j) {
    addInnerHTML(id + tasks[i]['status'] + index, generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainer'));
}

function addNamesToOpenCard(id, i, index, status, j) {
    addInnerHTML(id + tasks[i]['status'] + index, generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainerOpen'));
    setAssignedNames(tasks[i]['status'], index, tasks[i]['isAssigned'][j], 'assignedToContainerOpen');
}


function findColor(username) {
    let color;
    users.find((user) => { if (user.name == username) color = user.color; });
    return color;
}

function setAssignedNames(status, index, username, id) {
    let category = tasks[index]['category'];
    addInnerHTML(category + id + username + status + index, generateUserNameDivHTML(username));
}

function setRowCount(status, elementIndex) {
    let textAreaField = document.getElementById('editTitle' + status + elementIndex);
    if (textAreaField.cols >= "20") textAreaField.rows = "2";
    else textAreaField.rows = "1";
}

function addSubtasksToCardOpen(status, index) {
    setInnerHTML('editSubtasksContainer' + status + index, '');
    for (let i = 0; i < tasks[index]['subtasks'].length; i++) addInnerHTML('editSubtasksContainer' + status + index, addCheckBoxAtBoardHTML(index, i, status));
    for (let j = 0; j < tasks[index]['subtasks'].length; j++) {
        if (tasks[index]['subtasks'][j]['checked'] == true) setCheckBoxCheckedOpenCard(index, j, status, true);
        else setCheckBoxCheckedOpenCard(index, j, status, false);
    }
}

function setCheckBoxCheckedOpenCard(index, j, status, prop) {
    document.getElementById('editSubtasks' + tasks[index]['subtasks'][j]['item'] + status + index).checked = prop;
}

function setSubtaskChecked(status, index, i) {
    if (isSubtaskAtBoardChecked(index, i, status)) tasks[index]['subtasks'][i]['checked'] = true;
    else tasks[index]['subtasks'][i]['checked'] = false;
    pushToDatabase();
}

function isSubtaskAtBoardChecked(index, i, status) {
    return document.getElementById('editSubtasks' + tasks[index]['subtasks'][i]['item'] + status + index).checked == true;
}

function editCard(status, elementIndex, aID) {
    let task = tasks[elementIndex];
    showEditCard(status, elementIndex);
    setStyleForEditCard(status, elementIndex);
    setDataForEditCard(status, elementIndex, task, aID);
}

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

function setStyleForEditCard(status, elementIndex) {
    document.getElementById('editTitle' + status + elementIndex).classList.remove('taskTitleOpen');
    document.getElementById('editDescription' + status + elementIndex).classList.remove('taskDescriptionOpen');
    document.getElementById('editDate' + status + elementIndex).classList.remove('taskDueDateOpen');
    document.getElementById('dateContainer' + status + elementIndex).style = "display:block;";
}

function showEditCard(status, elementIndex) {
    addDisplayNone('taskStatusCategory' + status + elementIndex);
    addDisplayNone('editDeleteBtnOpen' + status + elementIndex);
    removeDisplayNone('editSaveBtnOpen' + status + elementIndex);
    addDisplayNone('editSubtasksContainer' + status + elementIndex);
    removeDisplayNone('openCardTitle' + status + elementIndex);
    removeDisplayNone('openCardDescription' + status + elementIndex);
}

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

function resetStylesForOpenCard(status, index) {
    document.getElementById('editDate' + status + index).classList.remove('inputTextStd');
    document.getElementById('editDescription' + status + index).classList.remove('inputDescriptionField');
    document.getElementById('editTitle' + status + index).classList.remove('inputTextStd');
    document.getElementById('editTitle' + status + index).classList.add('taskTitleOpen');
    document.getElementById('editDescription' + status + index).classList.add('taskDescriptionOpen');
    document.getElementById('editDate' + status + index).classList.add('taskDueDateOpen');
    document.getElementById('dateContainer' + status + index).style = "display:flex;";
}

function hideEditCard(status, index) {
    removeDisplayNone('editDeleteBtnOpen' + status + index);
    addDisplayNone('editSaveBtnOpen' + status + index);
    removeDisplayNone('editSubtasksContainer' + status + index);
    addDisplayNone('openCardTitle' + status + index);
    addDisplayNone('openCardDescription' + status + index);
    removeDisplayNone('taskStatusCategory' + status + index);
}

function resetTaskPrio(status, index) {
    let element = tasks[index];
    setInnerHTML('taskPrioOpen' + status + index, resetTaskPrioHTML(element));
}

function resetAssigned(status, index) {
    setInnerHTML('assignedUserOpen' + status + index, resetAssignedHTML(status, index));
}

function setActiveCheckbox(task) {
    for (let i = 0; i < task['isAssigned'].length; i++) {
        document.getElementById(task['isAssigned'][i]).children[0].checked = true;
    }
}

function editThisTask(index, stati) {
    editTaskData(index, stati);
    addDisplayNone('openCard' + stati + index);
    addDisplayNone('overlay');
    resetEditCard(index, stati);
    save();
    updateBoardHTML();
    pushToDatabase();
}

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

