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
        tasksInProgressBox();
        setNumberIPBox();
        tasksInAwaitingFeedbackBox();
        setNumberAFBox();
        tasksInToDoBox();
        setNumberTDBox();
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
 * show the number in Prgress tasks on the board page 
 */
function tasksInProgressBox() {
    let iPBox = [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'inProgress') {
            iPBox.push(tasks[i]);
        }
    }
    return iPBox.length;
}

function setNumberIPBox() {
    document.getElementById('tasksInProgressBox').innerHTML = tasksInProgressBox();
}


function tasksInAwaitingFeedbackBox() {
    let aFBox = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'awaitingFeedback') {
            aFBox.push(tasks[i]);
        }
    }
    return aFBox.length;
}

function setNumberAFBox() {
    document.getElementById('awaitingFeedbackBox').innerHTML = tasksInAwaitingFeedbackBox();
}

// function tasksInToDoBox() {
//     let tDBox = [];
//     for (let i = 0; i < tasks.length; i++) {
//         if (tasks[i]['status'] == 'toDo') {
//             tDBox.push(tasks[i]);
//         }
//     }
//     return setNumberTDBox();
// }

// function setNumberTDBox() {
//     document.getElementById('toDo').innerHTML = tasksInToDoBox();
// }













// function displayNumbers() {
//     document.getElementById('tasksInProgressBox').innerHTML = tasks.status.length;
//     document.getElementById('awaitingFeedbackBox').innerHTML = tasks.status.length;
//     document.getElementById('toDo').innerHTML = tasks.status.length;
//     document.getElementById('done').innerHTML = tasks.status.length;
//     document.getElementById('urgent').innerHTML = tasks.status.length;
// }




// function countTasks() {
//     for (let i = 0; i < tasks.length; i++) { 
//         const task = tasks[i];
//         let status = task.status;
//         if (status === 'inProgress') { 
//             tasks.status.push(status);
//         } else if (status === 'awaitingFeedback') {
//             tasks.status.push(status);
//         } else if (status === 'toDo') {
//             tasks.status.push(status);
//         } else if (status === 'done') {
//             tasks.status.push(status);
//         }
//     }
//     displayNumbers();
// }


// function countUrgentTasks() {
//     for (let i = 0; i < tasks.length; i++) { 
//         const task = tasks[i];
//         let prio = task.prio;
//         let date = task.date;
//         if (prio === 'urgent') { 
//             taskUrgent.push(prio);
//             urgentDate.push(date);
//         }
//     }
//     displayNumbers();
// }


// function date() {
//     if (urgentDate.length === 0) {
//         newDate = 'No Deadline';
//         document.getElementById('date').innerHTML = newDate;
//     } else {
//         const datesArray = urgentDate.map((element) => new Date(element));
//         const minDate = new Date(Math.min(...datesArray));
//         newDate = minDate.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'});
//         document.getElementById('date').innerHTML = newDate;
//     }
//     }



