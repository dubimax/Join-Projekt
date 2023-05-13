let currentDraggedElement;

/**
 * Initialize the Board Page
 */
async function initBoard() {
    await includeHTML();
    generateNavigationLinks('Board', 'Summary', 'Board', 'AddTask', 'Contacts');
    updateBoardHTML();
    generateAddTaskToBoardImg();
    getFirstLettersOfNameCard();
}

/**
 * Uptade the Board Page
 */
function updateBoardHTML() {
    load();
    toDoArea();
    inProgressArea();
    awaitingFeedbackArea();
    doneArea();
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
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
        document.getElementById('toDo').innerHTML += generateOpenCardHTML(element);
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
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
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
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(element);
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
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}

/**
 * Starting with dragging a card
 * @param {*} id is the of current dragging card
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Generate a card to the To do Area
 * @param {*} element Elements of the card
 * @returns the card with elements
 */
function generateTodoHTML(element) {
    let elementIndex = tasks.indexOf(element);
    let color;
    for (let i = 0; i < categories.length; i++) {

        if (categories[i]['name'] == element['category']) {
            color = categories[i]['color'];
        }
    }
    return `
    <div draggable="true" ondragstart="startDragging(${elementIndex})" class="card" id="card" onclick="openCard()">
        <div style="background:${color}" class="taskStatus" id="cardTaskStatus">
            ${element['category']}</div>
        <div class="taskTitle" id="cardTaskTitle">
            ${element['title']}
        </div>
        <div class="taskDescription" id="cardTaskDescription">
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
            <div class="taskAssignedUser" id="assignedUserLogo">
                ${element['isAssigned']} 
            </div>

            <div class="taskPrio">
                <img src="./img/${element['prio'].toLowerCase()}.png">
            </div>
        </div>  
    </div>`
}

/**
 * Generate a bigger card if you clicket a small card on the areas
 * @param {*} element elemts of the card 
 * @returns the bigger card with more information
 */
function generateOpenCardHTML(element) {
    let color;
    for (let i = 0; i < categories.length; i++) {

        if (categories[i]['name'] == element['category']) {
            color = categories[i]['color'];
        }
    }
    return `
    <div class="openCard d-none" id="openCard">
            <img src="img/closeBtn.png" class="closeBtnOpen" onclick="closeOpenCard()">

        <div style="background:${color}" class="taskStatusOpen">
            ${element['category']}</div>
        <div class="taskTitleOpen" >
            ${element['title']}
        </div>
        <div class="taskDescriptionOpen">
            ${element['description']}
        </div>  
        <div class="taskDueDateOpen">
            <label class="taskLabelOpen">Due date: </label>
            ${element['dueDate']}
        </div>
        <div class="taskPrioOpen">
            <label class="taskLabelOpen">Priority: </label>
            <img src="./img/${element['prio'].toLowerCase()}.png">
        </div>
        <div class="taskSubtasksOpen">
            ${element['subtasks'].length}
        </div>   
        <div class="taskAssignedUserOpen">
        <label class="taskLabelOpen">Assignet to: </label>
            ${element['isAssigned']} 
        </div>
        <div class="editDeleteBtnOpen">
            <img class="deleteBtnOpenCard" src="img/deleteBtn.png" onclick="deleteTasks()">
            <img class="editBtnOpenCard" src="img/editBtn.png">
        </div>
    </div>`
}

/**
 * Remove display:none from the bigger card to see it
 */
function openCard() {
    document.getElementById('openCard').classList.remove('d-none');
    document.getElementById('overlay').style.display = "block";
}
/**
 * Add display:none to close the bigger card
 */
function closeOpenCard() {
    document.getElementById('openCard').classList.add('d-none');
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
    getFirstLettersOfNameCard();
    backend.setItem('tasks', JSON.stringify(tasks));
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
    backend.setItem('tasks', JSON.stringify(tasks));
    subtasks = [];
    clearAllInputs();
    save();
}

/**
 * Gets the First letters of given username
 * @param {*} username 
 * @returns Acronyms of username (Surname Name)
 */
function getFirstLettersOfNameCard() {
    let str = document.getElementById('assignedUserLogo').innerText;
    let matches = str.match(/\b(\w)/g);
    let acronym = matches.join('');
    return document.getElementById('assignedUserLogo').innerHTML = acronym;
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
            getFirstLettersOfNameCard();
        } else {
            console.log('nichts gefunden');
            resetBoard();
        }
    }
} 

function deleteTasks() {
    for (let i = 0; i < tasks.length; i++) {
        let deleteTheTask = tasks[i];
  
        deleteTheTask.splice(i, 1);
    }

}

