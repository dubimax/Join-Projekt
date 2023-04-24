
let currentDraggedElement;

async function updateHTML() {
    await includeHTML();
    load();

    toDoArea();
    inProgressArea();
    awaitingFeedbackArea();
    doneArea();
    generateAddTaskToBoardImg();
    generateAddTaskHTML('addTaskAtBoard');
    setOnSubmitForm();
    generateContactHead();
}

function toDoArea() {
    let toDo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = tasks[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }
}

function inProgressArea() {
    let inProgress = tasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }
}

function awaitingFeedbackArea() {
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';

    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        document.getElementById('awaitingFeedback').innerHTML += generateTodoHTML(element);
    }
}

function doneArea() {
    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    let color;
    for (let i = 0; i < categories.length; i++) {

        if (categories[i]['name'] == element['category']) {
            color = categories[i]['color'];
        }
    }
    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" class="card">
        <div style="background:${color}" class="taskStatus">
            ${element['category']}</div>
        <div class="taskTitle">
            ${element['title']}
        </div>
        <div class="taskDescription">
            ${element['description']}
        </div>  
        
        <div class="barContainer">
        <div class="bar">
        </div>
        <div class="taskProgressbar">
            1/${element['subtasks'].length} Done         <!-- Muss geändert werden -->
        </div>   
       </div>

        <div class="containerUserAndPrio">
            <div class="taskAssignedUser">
                ${element['isAssigned']} 
            </div>
            
            <div class="taskPrio">
                <img src="./img/${element['prio'].toLowerCase()}.png">
            </div>
        </div>  
    </div>`
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    updateHTML();
    save();
}

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



