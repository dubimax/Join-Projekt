function generateAddTaskHTML() {
    addContentTitle('Add Task', 'addTask');
    document.getElementById('addTask').innerHTML += `
    <form onsubmit="createNewTask()" class="addTaskForm">
    <div class="details">
        <div class="detailBox-left">
            ${generatesInputFieldHTML('label', 'input', 'Title', 'inputTextStd', 'text', 'inputTitle')}
            ${generatesTextareaFieldHTML('label', 'textarea', 'Description')}
            ${generatesOptionsFieldHTML('label', 'select', 'Category', 'dropDownMenuField', 'categoryBox', 'categories')}
            ${generatesOptionsFieldHTML('label', 'select', 'Assigned to', 'dropDownMenuField', 'assignedTo', 'users')}
        </div>
        <div class="border-1px-solid"></div>
        <div class="detailBox-right">
        ${generatesInputFieldHTML('label', 'input', 'Due Date', 'inputTextStd', 'date', 'inputDate')}
        ${generateLabelsHTML('label', 'Prio')} 
            <div class="detail">
                <label>Subtasks</label>
                <div class="p-relative d-flex align-c">
                    <input type="text" placeholder="Add a new Subtask" class="inputTextStd" id="newSubtask">
                    <img onclick="generateCheckboxItem()" src="./img/addIcon.png" class="inputAddIcon">
                </div>
                <list class="" id="list-subtask">
                </list>
            </div>
        </div>
        
        </div>
        <div class="d-flex align-c container-btns">
            <div class="clearButton" onclick="clearAllInputs()">
                Clear
            </div>
            <div class="createTaskBtnContainer">
                <button class="createTaskBtn">Create Task</button>
                <img class="" src="./img/checkIconWhite.png">
            </div>
        </div>
        </form>
    `;
    generateOptionsHTML('assignedTo', users, 'users');
    addOptionWithFunction();
    generateOptionsHTML('categoryBox', categories, 'categories');
}

function createNewTask(){
    
}

function clearAllInputs() {
    clearFields('inputTitle', 'inputDescription', 'inputDate', 'newSubtask');
    clearListSubtask();
}

function clearListSubtask() {
    document.getElementById('list-subtask').innerHTML = '';
}


function clearFields(...ids) {
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).value = '';
        changeStyleOfLabel(ids[i]);
    }
}



function changeStyleOfLabel(id) {

    document.getElementById('id_urgent').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_medium').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_low').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('urgentImgID').src = 'img/urgentIcon.png';
    document.getElementById('mediumImgID').src = 'img/mediumIcon.png';
    document.getElementById('lowImgID').src = 'img/lowIcon.png';
    if (activeID.length == 0) {
        if (id == 'id_urgent') {
            document.getElementById(id).style = urgentColor;
            document.getElementById('urgentImgID').src = 'img/urgentWhiteIcon.png';
            activeID = id;
            activeImg = 'urgentImgID';
            return;
        }
        if (id == 'id_medium') {
            document.getElementById(id).style = mediumColor;
            document.getElementById('mediumImgID').src = 'img/mediumWhiteIcon.png';
            activeID = id;
            activeImg = 'mediumImgID';
            return;
        }
        if (id == 'id_low') {
            document.getElementById(id).style = lowColor;
            document.getElementById('lowImgID').src = 'img/lowWhiteIcon.png';
            activeID = id;
            activeImg = 'lowImgID';
            return;
        }
    } else {
        if (activeImg == 'urgentImgID') {
            document.getElementById(activeImg).src = 'img/urgentIcon.png';
            6
        }
        if (activeImg == 'mediumImgID') {
            document.getElementById(activeImg).src = 'img/mediumIcon.png';
        }
        if (activeImg == 'lowImgID') {
            document.getElementById(activeImg).src = 'img/lowIcon.png';

        }

        document.getElementById(activeID).style = 'background-color: #FFFFFF; color: #000000;';
        activeID = '';
        activeImg = '';
    }
}
