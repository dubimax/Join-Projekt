/**
 * Initializes the Summary page.
 * It includes HTML files, generates the summary content, and sets up navigation links.
 */
async function initSummary() {
    await includeHTML();
    generateSummary();
    generateNavigationLinks('Summary', 'Summary', 'Board', 'AddTask', 'Contacts');
};


/**
 * Generates the summary content based on the user's login status.
 */
function generateSummary() {
    load();
    if (loggedIn) activeSummary();
    else window.location.href = '../login.html';
}

/**
 * Activates the summary by displaying tasks, numbers, greeting, and user information.
 */
function activeSummary() {
    tasksInBoardBox();
    tasksNumbersInBox();
    greeting();
    showUserName();
    greetingMobile();
}

/**
 * Opens the board page by redirecting to 'board.html'.
 */
function openBoardPage() {
    showLink('board.html');
}

/**
 * Displays a greeting message based on the current time.
 */
function greeting() {
    let myDate = new Date();
    let hrs = myDate.getHours();
    if (hrs < 12) greetAllContainer('Good Morning,');
    else if (hrs >= 12 && hrs <= 18) greetAllContainer('Good Afternoon,');
    else if (hrs >= 18 && hrs <= 24) greetAllContainer('Good Evening,');
}

/**
 * Adds the greeting message to the 'greeting' and 'greetingMobile' containers.
 * @param {string} greet - The greeting message to display.
 */
function greetAllContainer(greets) {
    setInnerHTML('greeting', greet(greets));
    setInnerHTML('greetingMobile', greet(greets));
}

/**
 * Returns the provided greeting.
 * @param {string} greeting - The greeting message.
 * @returns {string} The provided greeting.
 */
function greet(greeting) {
    return greeting;
}

/**  
 * Displays the user's name.
*/
function showUserName() {
    if(indexOfEmail.name == 'Guest Guest') addDisplayNone('currentUser');
    else setUserName(indexOfEmail.name);
}

/**
 * Checks if the user is a guest.
 * @returns {boolean} True if the user is a guest, false otherwise.
 */
function isGuest() {
    indexOfEmail.name == 'Guest Guest';
}

/**
 * Sets the user name in the designated elements.
 * @param {string} text - The user name to set.
 */
function setUserName(text) {
    setInnerHTML('currentUser', text);
    setInnerHTML('currentUserMobile', text)
}

/**
 * Sets the user name in the designated elements.
 * @param {string} text - The user name to set.
 */
function greetingMobile() {
    if (window.innerWidth <= 1300 && document.referrer.includes("login.html")) {
        showGreetingResponsive();
        setTimeout(() => hideGreetingsResponsive(), 2500);
    }
}

/**
 * Hides the responsive greetings and shows the main container and navigation.
 */
function hideGreetingsResponsive() {
    addDisplayNone('summaryWelcomeTextMobile');
    removeDisplayNone('mainContainer');
}

/**
 * Shows the responsive greeting and hides the main container and navigation.
 * Also updates the displayed username.
 */
function showGreetingResponsive() {
    removeDisplayNone('summaryWelcomeTextMobile');
    if(indexOfEmail.name == 'Guest Guest') addDisplayNone('currentUserMobile');
    addDisplayNone('mainContainer');
    showUserName();
}

/**
 * Updates the number of tasks displayed in the board box.
 */
function tasksInBoardBox() {
    document.getElementById('tasksInBoardBox').innerHTML = tasks.length;
}

/**
 * Updates the numbers of tasks displayed in various boxes.
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
 * Updates the number of tasks in the "In Progress" box.
 */
function numberOfInPorgressBox() {
    let iPBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'inProgress') iPBox.push(tasks[i]);
    }
    setInnerHTML('tasksInProgressBox', iPBox.length);
}

/**
 * Updates the number of tasks in the "Awaiting Feedback" box.
 */
function numberOfAwaitingFeedbackBox() {
    let aFBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'awaitingFeedback') aFBox.push(tasks[i]);
    }
    setInnerHTML('awaitingFeedbackBox', aFBox.length);
}

/**
 * Updates the number of tasks in the "To Do" box.
 */
function numberOfToDoBox() {
    let tDBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'toDo') tDBox.push(tasks[i]);
    }
    setInnerHTML('toDo', tDBox.length);
}

/**
 * Updates the number of tasks in the "done" box.
 */
function numberOfDoneBox() {
    let dBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'done') dBox.push(tasks[i]);
    }
    setInnerHTML('done', dBox.length);
}

/**
 * Updates the number of tasks with prio Urgent.
 */
function numberOfUrgentTasksBox() {
    let uBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['prio'] == 'Urgent') uBox.push(tasks[i]);
    }
    setInnerHTML('urgent', uBox.length);
}

/**
 * Checks the next due date of tasks and updates the upcoming deadline section.
 */
function checkNextDueDate() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks.length > 0 && tasks[0] != '') setDate(i,months);
        else setInnerHTML('upcomingDeadline',`No upcoming deadline`);
    }
}

/**
 * Sets the next due date of a task based on its index.
 * @param {number} i - The index of the task.
 * @param {string[]} months - An array of month names.
 */
function setDate(i,months) {
    let dueDate = new Date(tasks[i]['dueDate']);
    let month = months[dueDate.getMonth()];
    let nextDueDate = month + ' ' + dueDate.getDate() + ', ' + dueDate.getFullYear();
    setInnerHTML('date', nextDueDate);
}