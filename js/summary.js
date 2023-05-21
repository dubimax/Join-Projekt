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
    if (loggedIn) activeSummary();
    else window.location.href = '../login.html';
}

function activeSummary() {
    tasksInBoardBox();
    tasksNumbersInBox();
    greeting();
    showUserName();
    greetingMobile();
}

/**
 * Open the Board the Page if clicked on some boxes
 */
function openBoardPage() {
    showLink('board.html');
}

/**
 * Greet the User
 */
function greeting() {
    let myDate = new Date();
    let hrs = myDate.getHours();
    if (hrs < 12) greetAllContainer('Good Morning,');
    else if (hrs >= 12 && hrs <= 18) greetAllContainer('Good Afternoon,');
    else if (hrs >= 18 && hrs <= 24) greetAllContainer('Good Evening,');
}

function greetAllContainer(greet) {
    addInnerHTML('greeting', greet(greet));
    addInnerHTML('greetingMobile', greet(greet));
}

function greet(greeting) {
    return greeting;
}

function showUserName() {
    if (isGuest()) setUserName('');
    else setUserName(indexOfEmail.name);
}

function isGuest() {
    indexOfEmail.name == 'Guest Guest';
}

function setUserName(text) {
    setInnerHTML('currentUser', text);
    setInnerHTML('currentUserMobile', text)
}

function greetingMobile() {
    if (window.innerWidth <= 1300 && document.referrer.includes("login.html")) {
        showGreetingResponsive();
        setTimeout(hideGreetingsResponsive(), 2500);
    }
}

function hideGreetingsResponsive() {
    addDisplayNone('summaryWelcomeTextMobile');
    removeDisplayNone('mainContainer');
    removeDisplayNone('nav');
}

function showGreetingResponsive() {
    removeDisplayNone('summaryWelcomeTextMobile');
    addDisplayNone('mainContainer');
    addDisplayNone('nav');
    showUserName();
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
        if (tasks[i]['status'] == 'inProgress') iPBox.push(tasks[i]);
    }
    setInnerHTML('tasksInProgressBox', iPBox.length);
}

/**
 * show the number of the Awaiting Feedback Box
 */
function numberOfAwaitingFeedbackBox() {
    let aFBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'awaitingFeedback') aFBox.push(tasks[i]);
    }
    setInnerHTML('awaitingFeedbackBox', aFBox.length);
}

/**
 * show the number of the To do Box
 */
function numberOfToDoBox() {
    let tDBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'toDo') tDBox.push(tasks[i]);
    }
    setInnerHTML('toDo', tDBox.length);
}

/**
 * show the number of the Done Box
 */
function numberOfDoneBox() {
    let dBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'done') dBox.push(tasks[i]);
    }
    setInnerHTML('done', dBox.length);
}

/**
 * show the number of the Urgent Tasks on the Box
 */
function numberOfUrgentTasksBox() {
    let uBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['prio'] == 'Urgent') uBox.push(tasks[i]);
    }
    setInnerHTML('urgent', uBox.length);
}

/**
 * Checked the next due date
 */
function checkNextDueDate() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks.length > 0 && tasks[0] != '') setDate(i,months);
        else setInnerHTML('upcomingDeadline',`No upcoming deadline`);
    }
}

function setDate(i,months) {
    let dueDate = new Date(tasks[i]['dueDate']);
    let month = months[dueDate.getMonth()];
    let nextDueDate = month + ' ' + dueDate.getDate() + ', ' + dueDate.getFullYear();
    setInnerHTML('date', nextDueDate);
}