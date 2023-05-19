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
    toDoArea();
    inProgressArea();
    awaitingFeedbackArea();
    doneArea();
    addUserAcronyms('assignedUserLogo');
    taskDetails();
    addUserAcronyms('assignedUserLogoOpen');
    setStyleProgressbar();
   

}

function showAddNewTaskAtBoardStandard() {
    if(document.getElementById('addTaskAtBoard')) document.getElementById('addTaskAtBoard').innerHTML = '';
    document.getElementById('addTaskAtBoard').classList.remove('d-none');
    generateAddTaskHTML('addTaskAtBoard');
    addCloseBtnToAddTaskAtBoard();
    setOnSubmitForm('toDo');
    addEventListenerToDropDown();
}

function hideAddNewTaskAtBoard() {
    document.getElementById('addTaskAtBoard').classList.add('d-none');

}

/**
 * Show all tasks on the To do Area
 */
function toDoArea() {
    let toDo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element, 'toDo');

    }
}

function taskDetails() {

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        document.getElementById('boardContainer').innerHTML += generateOpenCardHTML(element, i, tasks[i]['status']);
    }
}

/**
 * Show all tasks on the In Progress Area
 */
function inProgressArea() {
    let inProgress = tasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element, 'inProgress');

    }
}

/**
 * Show all tasks on the Awaiting Feedback Area
 */
function awaitingFeedbackArea() {
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(element, 'awaitingFeedback');
    }
}

/**
 * Show all tasks on the Done Area
 */
function doneArea() {
    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element, 'done');

    }
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

        if (categories[i]['name'] == element['category']) {
            return categories[i]['color'];
        }
    }
}



/**
 * Generate a card to the To do Area
 * @param {*} element Elements of the card
 * @returns the card with elements
 */
function generateTodoHTML(element, status) {
    let elementIndex = tasks.indexOf(element);
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${elementIndex})" class="card" id="card${status}${elementIndex}" onclick="openCard('${elementIndex}','${status}')">
        <div style="background:${getColor(element)}" class="taskStatus" id="cardTaskStatus">
            ${element['category']}</div>
        <div class="taskTitle" id="cardTaskTitle">
            ${element['title']}
        </div>
        <div class="taskDescription" id="cardTaskDescription${element['status']}${elementIndex}">
            ${element['description']}
        </div>  
        
        <div class="barContainer">
        <div class="bar" id="progressbar${element['status']}${elementIndex}">
        </div>
        <div class="taskProgressbar">
            ${getCheckedSubtasks(elementIndex)}/${element['subtasks'].length} Done 
        </div>   
       </div>

        <div class="containerUserAndPrio">
            <div class="assignedUser" id="assignedUserLogo${element['status']}${elementIndex}">
            </div>

            <div class="taskPrio">
                <img src="../img/${element['prio'].toLowerCase()}.png">
            </div>
        </div>  
    </div>`;

}

function setStyleProgressbar(){
    for(let i = 0; i < tasks.length;i++){
        let progress = getProgressOfSubtasks(i);
        let difference = 100 - progress;

        if(document.getElementById('progressbar' + tasks[i]['status'] + i) && progress != 0){
            document.getElementById('progressbar' + tasks[i]['status'] + i).style = `background:linear-gradient(to right,#29ABE2 ${progress}%,#F4F4F4 ${difference}%);`;
        }
    } 
}

function getProgressOfSubtasks(index){
    let progress = getCheckedSubtasks(index);
    let size = tasks[index]['subtasks'].length;
    return 100/size*progress;
}

function getCheckedSubtasks(elementIndex){
    let count = 0;
    for(let i = 0; i < tasks[elementIndex]['subtasks'].length;i++){
        if(tasks[elementIndex]['subtasks'][i]['checked'] == true){
            count++;
        }
    }
    return count;
}

/**
 * Remove display:none from the bigger card to see it
 */
function openCard(index, status) {
    if (document.getElementById('openCard' + status + index)) {

        document.getElementById('openCard' + status + index).classList.remove('d-none');
    }
    document.getElementById('assignedUserLogoOpen' + status + index).innerHTML = '';
    addUserAcronyms('assignedUserLogoOpen');
    addSubtasksToCardOpen(status, index);
    document.getElementById('overlay').style.display = "block";
}

function addUserAcronyms(id) {
    for (let i = 0; i < tasks.length; i++) {
        let index = tasks.indexOf(tasks[i]);
        let status = tasks[i]['status'];

        for (let j = 0; j < tasks[i]['isAssigned'].length; j++) {
            if (id == 'assignedUserLogoOpen') {
                document.getElementById(id + tasks[i]['status'] + index).innerHTML += generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainerOpen');
                setAssignedNames(tasks[i]['status'], index, tasks[i]['isAssigned'][j], 'assignedToContainerOpen');
            } else if (id == 'assignedUserLogo') {
                document.getElementById(id + tasks[i]['status'] + index).innerHTML += generateAssignedUserHTML(tasks[i]['isAssigned'][j], index, status, 'assignedToContainer');

            }
        }
    }
}


function generateAssignedUserHTML(username, index, status, id) {
    let color;
    users.find((user) => {
        if (user.name == username) {
            color = user.color;
        }
    });
    let category = tasks[index]['category'];
    return /*html*/`
    <div class="assignedToContainer" id="${category}${id}${username}${status}${index}">
        <div class="colorCircleMedium boardCircle" style="background:${color}">
            ${getFirstLettersOfName(username)} 
        </div>
    </div>
    `;
}

function setAssignedNames(status, index, username, id) {
    let category = tasks[index]['category'];

    document.getElementById(category + id + username + status + index).innerHTML += `<div>${username}</div>`;

}

/**
 * Generate a bigger card if you clicket a small card on the areas
 * @param {*} element elemts of the card 
 * @returns the bigger card with more information
 */
function generateOpenCardHTML(element, index, status) {
    let elementIndex = tasks.indexOf(element);
    return /*html*/`
    <div class="openCard d-none" id="openCard${status}${elementIndex}">
            <img src="../img/closeBtn.png" class="closeBtnOpen" onclick="closeOpenCard('${status}',${elementIndex})">

        <div id="taskStatusCategory${status}${elementIndex}" style="background:${getColor(element)}" class="taskStatusOpen">
            ${element['category']}
        </div>
        
        <div>
            <label id="openCardTitle${status}${elementIndex}" class="d-none editcard">Title</label>
            <input class="taskTitleOpen" id="editTitle${status}${elementIndex}" readonly value="${element['title']}"/>
        </div>
        <div>
            <label id="openCardDescription${status}${elementIndex}" class="d-none editcard">Description</label>
            <textarea class="taskDescriptionOpen" id="editDescription${status}${elementIndex}" readonly>${element['description']}</textarea>
        </div>  
        <div id="dateContainer${status}${elementIndex}" style="display:flex;">
            <label class="taskLabelOpen editcard" >Due date: </label>
            <input  class="taskDueDateOpen" id="editDate${status}${elementIndex}" readonly type="date" value="${element['dueDate']}" class="inputTextStd"/>
        </div>
        <div class="taskPrioOpen" id="taskPrioOpen${status}${elementIndex}">
            <label class="taskLabelOpen">Priority: </label>
            <img src="../img/${element['prio'].toLowerCase()}AllinOne.png">
        </div>
        <div id="editSubtasksContainer${status}${elementIndex}">
        </div>  
        <div class="taskAssignedUserOpen" id="assignedUserOpen${status}${elementIndex}"> 
        <span class="taskLabelOpen">Assigned to: </span> 

        <label class="taskLabelOpen" id="assignedUserLogoOpen${status}${elementIndex}"></label>
        </div>
        
        <div class="editDeleteBtnOpen" id="editDeleteBtnOpen${status}${elementIndex}">
            <img class="deleteBtnOpenCard" src="../img/deleteBtn.png" onclick="deleteTask('${element["title"]}','${status}',${elementIndex})">
            <img class="editBtnOpenCard" src="../img/editBtn.png" onclick="editCard('${status}',${elementIndex},'id_${element['prio'].toLowerCase()}')">
        </div>
        <div class="editSaveBtnOpenContainer"> <button class="editSaveBtnOpen d-none" id="editSaveBtnOpen${status}${elementIndex}" onclick="editThisTask(${elementIndex},'${status}')">
                Ok<img src="../img/okWhite.png">
            </button>
        </div>
    </div>`
}

function addSubtasksToCardOpen(status, index) {
    document.getElementById('editSubtasksContainer' + status + index).innerHTML = '';
    for (let i = 0; i < tasks[index]['subtasks'].length; i++) {
        document.getElementById('editSubtasksContainer' + status + index).innerHTML += `
      <div> ${tasks[index]['subtasks'][i]['item']} <input type="checkbox"class="taskSubtasksOpen" onchange="setSubtaskChecked('${status}', ${index}, ${i})" id="editSubtasks${tasks[index]['subtasks'][i]['item']}${status}${index}" value="${tasks[index]['subtasks'][i]['item']}"/></div>
    `;}
    for (let j = 0; j < tasks[index]['subtasks'].length; j++) {
        if (tasks[index]['subtasks'][j]['checked'] == true) {
            document.getElementById('editSubtasks' + tasks[index]['subtasks'][j]['item'] + status + index).checked = true;
        } else {
            document.getElementById('editSubtasks' + tasks[index]['subtasks'][j]['item'] + status + index).checked = false;
        }
    }
}

function setSubtaskChecked(status, index, i){
    if(document.getElementById('editSubtasks' + tasks[index]['subtasks'][i]['item'] + status + index).checked == true){
        tasks[index]['subtasks'][i]['checked'] = true;
    }else {
        tasks[index]['subtasks'][i]['checked'] = false;
    }
    pushToDatabase();
}

function editCard(status, elementIndex, aID) {
    let task = tasks[elementIndex];
    document.getElementById('taskPrioOpen' + status + elementIndex).innerHTML = generateLabelsHTML('label', 'Prio');
    document.getElementById('taskStatusCategory' + status + elementIndex).classList.add('d-none');
    document.getElementById('editDeleteBtnOpen' + status + elementIndex).classList.add('d-none');
    document.getElementById('editSaveBtnOpen' + status + elementIndex).classList.remove('d-none');
    document.getElementById('editSubtasksContainer' + status + elementIndex).classList.add('d-none');

    document.getElementById('openCardTitle' + status + elementIndex).classList.remove('d-none');
    document.getElementById('editTitle' + status + elementIndex).classList.remove('taskTitleOpen');
    document.getElementById('openCardDescription' + status + elementIndex).classList.remove('d-none');
    document.getElementById('editDescription' + status + elementIndex).classList.remove('taskDescriptionOpen');
    document.getElementById('editDate' + status + elementIndex).classList.remove('taskDueDateOpen');
    document.getElementById('dateContainer' + status + elementIndex).style = "display:block;";
    document.getElementById('assignedUserOpen' + status + elementIndex).innerHTML = generatesOptionsFieldHTML('label', 'Assigned to', 'dropDownMenuField', 'assignedTo', './img/dropdownIcon.png', 'contacts to assign');
    document.getElementById('assignedUserOpen' + status + elementIndex).style = "overflow:hidden;"
    addInviteNewContact();
    generateOptionsHTML(users, 'users');
    addAssignedUsersList(status, elementIndex);
    setActiveCheckbox(task);
    setStyleOfBoardLabel(aID);
    generateEditTitle(status, elementIndex);
    generateEditDescription(status, elementIndex);
    generateEditDate(status, elementIndex);
    addEventListenerToSelectUserBox();
}

function resetEditCard(index, status) {
    document.getElementById('editTitle' + status + index).readOnly = true;
    document.getElementById('editDescription' + status + index).readOnly = true;
    document.getElementById('editDate' + status + index).readOnly = true;
    document.getElementById('assignedUserOpen' + status + index).innerHTML = '';
    document.getElementById('editDeleteBtnOpen' + status + index).classList.remove('d-none');
    document.getElementById('editSaveBtnOpen' + status + index).classList.add('d-none');
    document.getElementById('editSubtasksContainer' + status + index).classList.remove('d-none');
    document.getElementById('editDate' + status + index).classList.remove('inputTextStd');
    document.getElementById('editDescription' + status + index).classList.remove('inputDescriptionField');
    document.getElementById('editTitle' + status + index).classList.remove('inputTextStd');
    document.getElementById('editTitle' + status + index).classList.add('taskTitleOpen');
    document.getElementById('openCardTitle' + status + index).classList.add('d-none');
    document.getElementById('openCardDescription' + status + index).classList.add('d-none');
    document.getElementById('editDescription' + status + index).classList.add('taskDescriptionOpen');
    document.getElementById('editDate' + status + index).classList.add('taskDueDateOpen');
    document.getElementById('dateContainer' + status + index).style = "display:flex;";
    document.getElementById('taskStatusCategory' + status + index).classList.remove('d-none');


    resetAssigned(status, index);
    resetTaskPrio(status, index);
    addUserAcronyms('assignedUserOpen', index, status);

    addAssignedUsersList(status, index);
}

function resetTaskPrio(status, index) {
    let element = tasks[index];
    document.getElementById('taskPrioOpen' + status + index).innerHTML = `
        <label class="taskLabelOpen">Priority: </label>
        <img src="../img/${element['prio'].toLowerCase()}AllinOne.png">
    `;
}

function resetAssigned(status, index) {
    document.getElementById('assignedUserOpen' + status + index).innerHTML = `
    <span class="taskLabelOpen">Assigned to: </span> 

        <label class="taskLabelOpen" id="assignedUserLogoOpen${status}${index}"></label>
    `;
}

function setActiveCheckbox(task) {
    for (let i = 0; i < task['isAssigned'].length; i++) {
        document.getElementById(task['isAssigned'][i]).children[0].checked = true;
    }
}

function editThisTask(index, stati) {
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

    document.getElementById('openCard' + stati + index).classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');


    resetEditCard(index, stati);

    save();
    updateBoardHTML();
    pushToDatabase();

}

function setStyleOfBoardLabel(aID) {
    if (aID == 'id_urgent') setStyleOfUrgent(aID);
    if (aID == 'id_medium') setStyleOfMedium(aID);
    if (aID == 'id_low') setStyleOfLow(aID);
}

function addAssignedUsersList(status, elementIndex) {
    document.getElementById('assignedUserOpen' + status + elementIndex).innerHTML += `
    <div class="p-relative d-flex align-c">
        <list class="d-flex" id="list-assigned-user">
        </list>
    </div>
    `;
}

function generateEditTitle(status, elementIndex) {
    document.getElementById('editTitle' + status + elementIndex).removeAttribute('readonly');
    document.getElementById('editTitle' + status + elementIndex).classList.add('inputTextStd');

}

function generateEditDescription(status, elementIndex) {
    document.getElementById('editDescription' + status + elementIndex).removeAttribute('readonly');
    document.getElementById('editDescription' + status + elementIndex).classList.add('inputDescriptionField');


}

function generateEditDate(status, elementIndex) {
    document.getElementById('editDate' + status + elementIndex).removeAttribute('readonly');
    document.getElementById('editDate' + status + elementIndex).classList.add('inputTextStd');
}


/**
 * Add display:none to close the bigger card
 */
function closeOpenCard(status, index) {
    document.getElementById('openCard' + status + index).classList.add('d-none');
    document.getElementById('overlay').style.display = "none";
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
    if(document.getElementById('addTaskAtBoard')) document.getElementById('addTaskAtBoard').innerHTML = '';
    document.getElementById('addTaskAtBoard').classList.remove('d-none');
    generateAddTaskHTML('addTaskAtBoard');
    addCloseBtnToAddTaskAtBoard();
    removeEventListenerFromDropDown();
    addEventListenerToDropDown();
}

/**
 * reset the board and deletes all tasks from the html code
 */
function resetBoard() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}

/**
 * Search the tasks and filter by title or description
 */
function searchTasks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);
    for (let i = 0; i < tasks.length; i++) {
        let taskTitle = tasks[i]['title'];
        let taskIndex = tasks.indexOf(tasks[i]);
        let tDescription = tasks[i]['description'];
        if (taskTitle.toLowerCase().includes(search) || tDescription.toLowerCase().includes(search)) {
            console.log('gefunden');
            if (document.getElementById('card' + tasks[i]['status'] + taskIndex).classList.contains('d-none')) {
                document.getElementById('card' + tasks[i]['status'] + taskIndex).classList.remove('d-none');
            }
        }
        else {
            document.getElementById('card' + tasks[i]['status'] + taskIndex).classList.add('d-none');

        }
    }
}

function deleteTask(task, status, ind) {
    let index = -1;
    
            
    tasks.splice(ind, 1);
      
    closeOpenCard(status, ind);
    pushToDatabase();
    updateBoardHTML();

}

