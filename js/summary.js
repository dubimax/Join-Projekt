
/**
 * Initialize the Summary Page
 */
async function initSummary() {
    await includeHTML();
    generateSummary();
    generateNavigationLinks('Summary', 'Summary', 'Board', 'AddTask', 'Contacts');
};

/**
 * Generate functions for the Summary Page
 */
function generateSummary() {
    load();
    if (loggedIn) {
        tasksInBoardBox();
        tasksNumbersInBox();
        greeting();
        showUserName();
    } else {
        window.location.href = 'login.html';
    }
}

/**
 * Open the Board the Page if clicked on some boxes
 */
async function openBoardPage() {
    showLink('board.html');
}

/**
 * Greet the User
 */
function greeting() {
    let greet;
    let myDate = new Date();
    let hrs = myDate.getHours();

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 18)
        greet = 'Good Afternoon,';
    else if (hrs >= 18 && hrs <= 24)
        greet = 'Good Evening,';

    document.getElementById('greeting').innerHTML = greet;
}

function showUserName() {
    let currentUserGreeting = document.getElementById('currentUser');
    currentUserGreeting.innerHTML = users.name;
}

/**
 * Show the numbers of how many tasks are in the board
 */
function tasksInBoardBox() {
    document.getElementById('tasksInBoardBox').innerHTML = tasks.length;
}

/**
 * show the numbers of tasks in boxes  
 */
function tasksNumbersInBox() {
    numberOfInPorgressBox();
    numberOfAwaitingFeedbackBox();
    numberOfToDoBox();
    numberOfDoneBox();
    numberOfUrgentTasksBox();
    checkNextDueDate();
}

/**
 * show the number of the in Progess Box
 */
function numberOfInPorgressBox() {
    let iPBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'inProgress') {
            iPBox.push(tasks[i]);
        }
    }
    document.getElementById('tasksInProgressBox').innerHTML = iPBox.length;
}

/**
 * show the number of the Awaiting Feedback Box
 */
function numberOfAwaitingFeedbackBox() {
    let aFBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'awaitingFeedback') {
            aFBox.push(tasks[i]);
        }
    }
    document.getElementById('awaitingFeedbackBox').innerHTML = aFBox.length;
}

/**
 * show the number of the To do Box
 */
function numberOfToDoBox() {
    let tDBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'toDo') {
            tDBox.push(tasks[i]);
        }
    }
    document.getElementById('toDo').innerHTML = tDBox.length;
}

/**
 * show the number of the Done Box
 */
function numberOfDoneBox() {
    let dBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'done') {
            dBox.push(tasks[i]);
        }
    }
    document.getElementById('done').innerHTML = dBox.length;
}

/**
 * show the number of the Urgent Tasks on the Box
 */
function numberOfUrgentTasksBox() {
    let uBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['prio'] == 'Urgent') {
            uBox.push(tasks[i]);
        }
    }
    document.getElementById('urgent').innerHTML = uBox.length;
}

/**
 * Checked the next due date
 */
function checkNextDueDate() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    let upcomingDeadline = document.getElementById('date');


    if (tasks.length > 0 && tasks[0] != '') {
        let dueDate = new Date(tasks['dueDate']);
        let month = months[dueDate.getMonth()];
        let nextDueDate = month + ' ' + dueDate.getDate() + ', ' + dueDate.getFullYear();
        upcomingDeadline.innerHTML = nextDueDate;
    } else {
        upcomingDeadline.innerHTML = `No upcoming deadline`;
    }
}




