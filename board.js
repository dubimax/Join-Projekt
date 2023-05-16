let currentDraggedElement;

/**
 * Initialize the Board Page
 */
async function initBoard() {
    await includeHTML();
    load();
    generateNavigationLinks('Board', 'Summary', 'Board', 'AddTask', 'Contacts');
    updateBoardHTML();
    generateAddTaskToBoardImg();
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
}

function showAddNewTaskAtBoardStandard() {
    document.getElementById('addTaskAtBoard').classList.remove('d-none');
    generateAddTaskHTML('addTaskAtBoard');
}

/**
 * Show all tasks on the To do Area
 */
function toDoArea() {
    let toDo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element, index, 'toDo');
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
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element, index, 'inProgress');
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
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(element, index, 'awaitingFeedback');
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
        document.getElementById('done').innerHTML += generateTodoHTML(element, index, 'done');
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
function generateTodoHTML(element, index, status) {
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
        <div class="bar">
        </div>
        <div class="taskProgressbar">
            0/${element['subtasks'].length} Done 
        </div>   
       </div>

        <div class="containerUserAndPrio">
            <div class="taskAssignedUser" id="assignedUserLogo${element['status']}${elementIndex}">
            </div>

            <div class="taskPrio">
                <img src="./img/${element['prio'].toLowerCase()}.png">
            </div>
        </div>  
    </div>`;
}
/**
 * Remove display:none from the bigger card to see it
 */
function openCard(index, status) {
    if (document.getElementById('openCard' + status + index)) {
        document.getElementById('openCard' + status + index).classList.remove('d-none');
    }
    document.getElementById('overlay').style.display = "block";
}

function addUserAcronyms(id) {
    for (let i = 0; i < tasks.length; i++) {
        let index = tasks.indexOf(tasks[i])
        for (let j = 0; j < tasks[i]['isAssigned'].length; j++) {
            if (document.getElementById(id + tasks[i]['status'] + index)) {
                document.getElementById(id + tasks[i]['status'] + index).innerHTML += generateAssignedUserHTML(tasks[i]['isAssigned'][j])
            };
        }
    }
}


function generateAssignedUserHTML(username) {
    let color;
    users.find((user) => {
        if (user.name == username) {
            color = user.color;
        }
    });
    return /*html*/`
    <div class="assignedToContainer">
        <div class="colorCircleMedium boardCircle" style="background:${color}">
            ${getFirstLettersOfName(username)} 
        </div>
        <div id="isAssignedUsername" style="display:none;"> 
            ${username}
        </div>
    </div>
    `;
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
            <img src="img/closeBtn.png" class="closeBtnOpen" onclick="closeOpenCard('${status}',${elementIndex})">

        <div id="taskStatusCategory${status}${elementIndex}" style="background:${getColor(element)}" class="taskStatusOpen">
            ${element['category']}
        </div>
        
        <div>
            <label id="openCardTitle${status}${elementIndex}" class="d-none editcard">Title</label>
            <input class="taskTitleOpen" id="editTitle${status}${elementIndex}" readonly value="${element['title']}"/>
        </div>
        <div >
            <label id="openCardDescription${status}${elementIndex}" class="d-none editcard">Description</label>
            <textarea class="taskDescriptionOpen" id="editDescription${status}${elementIndex}" readonly>${element['description']}</textarea>
        </div>  
        <div >
            <label class="taskLabelOpen editcard" >Due date: </label>
            <input  class="taskDueDateOpen" id="editDate${status}${elementIndex}" readonly type="date" value="${element['dueDate']}" class="inputTextStd"/>
        </div>
        <div class="taskPrioOpen" id="taskPrioOpen${status}${elementIndex}">
            <label class="taskLabelOpen">Priority: </label>
            <img src="./img/${element['prio'].toLowerCase()}AllinOne.png">
        </div>
        <div>
            <input class="taskSubtasksOpen" id="editSubtasks${status}${elementIndex}" readonly value="${element['subtasks']}"/>
        </div>  
        <div class="taskAssignedUserOpen" id="taskAssignedUserOpen${status}${elementIndex}"> 
        <span class="taskLabelOpen">Assigned to: </span> 

        <label class="taskLabelOpen" id="assignedUserLogoOpen${status}${elementIndex}"></label>
        </div>
        
        <div class="editDeleteBtnOpen" id="editDeleteBtnOpen${status}${elementIndex}">
            <img class="deleteBtnOpenCard" src="img/deleteBtn.png" onclick="deleteTask('${element["title"]}','${status}',${elementIndex})">
            <img class="editBtnOpenCard" src="img/editBtn.png" onclick="editCard('${status}',${elementIndex},'id_${element['prio'].toLowerCase()}')">
        </div>
        <div class="editDeleteBtnOpen d-none" id="editSaveBtnOpen${status}${elementIndex}" onclick="editThisTask()">
            Save
        </div>
    </div>`
}

function editCard(status, elementIndex, aID) {
    document.getElementById('taskPrioOpen' + status + elementIndex).innerHTML = generateLabelsHTML('label', 'Prio');
    document.getElementById('editSubtasks' + status + elementIndex).removeAttribute('readonly');
    document.getElementById('taskStatusCategory' + status + elementIndex).classList.add('d-none');
    document.getElementById('editDeleteBtnOpen' + status + elementIndex).classList.add('d-none');
    document.getElementById('editSaveBtnOpen' + status + elementIndex).classList.remove('d-none');

    document.getElementById('openCardTitle' + status + elementIndex).classList.remove('d-none');
    document.getElementById('editTitle' + status + elementIndex).classList.remove('taskTitleOpen');
    document.getElementById('openCardDescription' + status + elementIndex).classList.remove('d-none');
    document.getElementById('editDescription' + status + elementIndex).classList.remove('taskDescriptionOpen');
    document.getElementById('editDate' + status + elementIndex).classList.remove('taskDueDateOpen');
    document.getElementById('taskAssignedUserOpen' + status + elementIndex).innerHTML = generatesOptionsFieldHTML('label', 'Assigned to', 'dropDownMenuField', 'assignedTo', './img/dropdownIcon.png', 'contacts to assign');
    addInviteNewContact();
    generateOptionsHTML(users, 'users');
    addAssignedUsersList(status, elementIndex);
    addEventListenerToSelectUserBox();
    setStyleOfBoardLabel(aID);
    document.getElementById('isAssignedUsername').style.display = "block";
    generateEditTitle(status, elementIndex);
    generateEditDescription(status, elementIndex);
    generateEditDate(status, elementIndex);

}

function setStyleOfBoardLabel(aID) {
    if (aID == 'id_urgent') setStyleOfUrgent(aID);
    if(aID == 'id_medium') setStyleOfMedium(aID);
    if(aID == 'id_low') setStyleOfLow(aID);
}

function addAssignedUsersList(status, elementIndex) {
    document.getElementById('taskAssignedUserOpen' + status + elementIndex).innerHTML += `
    <div class="p-relative d-flex align-c">
        <list class="d-flex" id="list-assigned-user">
        </list>
    </div>
    `;
}

function generateEditTitle(status, elementIndex) {
    document.getElementById('editTitle' + status + elementIndex).removeAttribute('readonly');
    document.getElementById('editTitle' + status + elementIndex).style.cssText = `
    cursor:pointer; 
    width: 422px;
    box-sizing: border-box;
    padding: 13px 21px;
    border: 1px solid #D1D1D1;
    border-radius: 10px;
    font-size:21px;
    font-weight: 400;
    `;
}

function generateEditDescription(status, elementIndex) {
    document.getElementById('editDescription' + status + elementIndex).removeAttribute('readonly');
    document.getElementById('editDescription' + status + elementIndex).style.cssText = `
    font-weight: 400;
    font-size: 21px;
    line-height: 120%;
    cursor:pointer; 
    box-sizing: border-box;
    padding: 18px 21px;
    isolation: isolate;
    width: 422px;
    height: 119px;
    border: 1px solid #D1D1D1;
    border-radius: 10px;
    font-size:21px;
    font-weight: 400;
    `;
}

function generateEditDate(status, elementIndex) {
    document.getElementById('editDate' + status + elementIndex).removeAttribute('readonly');
    document.getElementById('editDate' + status + elementIndex).style.cssText = `
    margin-left: 0;
    font-weight: 400;
    font-size: 21px;
    line-height: 120%;
    box-sizing: border-box;
    align-items: center;
    padding: 18px 21px;
    isolation: isolate;
    width: 422px;
    border: 1px solid #D1D1D1;
    border-radius: 10px;
    `;
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
    let taskSubtasks = subtasks;
    let id = tasks.length + 1;
    let status = statusTag;
    tasks.push({ 'title': taskTitle, 'description': taskDesc, 'category': taskCategory, 'isAssigned': assignedTo, 'dueDate': taskDueDate, 'prio': taskPrio, 'subtasks': taskSubtasks, 'id': id, 'status': status });
    pushToDatabase();
    subtasks = [];
    clearAllInputs();
}

function showAddNewTaskAtBoard() {
    document.getElementById('addTaskAtBoard').classList.remove('d-none');
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
        let tDescription = tasks[i]['description'];
        if (taskTitle.toLowerCase().includes(search) || tDescription.toLowerCase().includes(search)) {
            console.log('gefunden');
            updateBoardHTML();

        } else {
            console.log('nichts gefunden');
            resetBoard();
        }
    }
}

function deleteTask(task, status, ind) {
    let index = -1;
    tasks.forEach((t) => {
        if (t.title == task) {
            index = tasks.indexOf(t);
            tasks.splice(index, 1);
        }
    });
    closeOpenCard(status, ind);
    pushToDatabase();
    updateBoardHTML();

}

