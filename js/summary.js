let tasks = [];
let taskInProgress = [];
let taskAwaitingFeedback = [];
let taskToDo = [];
let taskDone = [];
let taskUrgent = [];
let urgentDate = [];

async function initSummary() {
    await includeHTML();
};

function summary() {
    tasksInBoard();
    countTasks();
    countUrgentTasks();
    date();
    greeting();
}


function tasksInBoard() {
    document.getElementById('tasksInBoard').innerHTML = tasks.length;
}


function countTasks() {
    for (let i = 0; i < tasks.length; i++) { 
        const task = tasks[i];
        let status = task.status;
        if (status === 'inProgress') { 
            taskInProgress.push(status);
        } else if (status === 'awaitingFeedback') {
            taskAwaitingFeedback.push(status);
        } else if (status === 'toDo') {
            taskToDo.push(status);
        } else if (status === 'done') {
            taskDone.push(status);
        }
    }
    displayNumbers();
}


function countUrgentTasks() {
    for (let i = 0; i < tasks.length; i++) { 
        const task = tasks[i];
        let prio = task.prio;
        let date = task.date;
        if (prio === 'urgent') { 
            taskUrgent.push(prio);
            urgentDate.push(date);
        }
    }
    displayNumbers();
}


function date() {
    if (urgentDate.length === 0) {
        newDate = 'No Deadline';
        document.getElementById('date').innerHTML = newDate;
    } else {
        const datesArray = urgentDate.map((element) => new Date(element));
        const minDate = new Date(Math.min(...datesArray));
        newDate = minDate.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'});
        document.getElementById('date').innerHTML = newDate;
    }
    }
    

function displayNumbers() {
    document.getElementById('tasksInProgress').innerHTML = taskInProgress.length;
    document.getElementById('awaitingFeedback').innerHTML = taskAwaitingFeedback.length;
    document.getElementById('toDo').innerHTML = taskToDo.length;
    document.getElementById('done').innerHTML = taskDone.length;
    document.getElementById('urgent').innerHTML = taskUrgent.length;
}


function greeting() {
    let greet;
    let myDate = new Date();
    let hrs = myDate.getHours();

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 18)
        greet = 'Good Afternoon';
    else if (hrs >= 18 && hrs <= 24)
        greet = 'Good Evening';

    document.getElementById('greeting').innerHTML = greet;
}

function showUserName() {
    let currentUserGreeting = document.getElementById('currentUser');
    currentUserGreeting.innerHTML = users.name;
}

function openBoardPage() {
    window.location.href = 'board.html';
}