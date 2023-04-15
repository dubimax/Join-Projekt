function generateAddTaskHTML() {
    addContentTitle('Add Task', 'addTask');
    document.getElementById('addTask').innerHTML += `
    <form onsubmit="createNewTask()" class="addTaskForm">
    <div class="details">
        <div class="detailBox-left">
            ${generatesInputFieldHTML('label', 'input', 'Title', 'inputTextStd', 'text', 'inputTitle', 'Enter a title')}
            ${generatesTextareaFieldHTML('label', 'textarea', 'Description', 'Enter a description')}
            ${generatesOptionsFieldHTML('label', 'select', 'Category', 'dropDownMenuField', 'categoryBox', 'categories', './img/dropdownIcon.png')}
            ${generatesOptionsFieldHTML('label', 'select', 'Assigned to', 'dropDownMenuField', 'assignedTo', 'users', './img/dropdownIcon.png')}
        </div>
        <div class="border-1px-solid"></div>
        <div class="detailBox-right">
        ${generatesInputFieldHTML('label', 'input', 'Due Date', 'inputTextStd', 'date', 'inputDate')}
        ${generateLabelsHTML('label', 'Prio')} 

        ${generateSubTaskField('label', 'Subtasks', 'dropDownMenuField', 'addNewSubTask', './img/addIcon.png')}

        <div class="p-relative d-flex align-c">

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
    addOptionWithFunction('addNewCat');
    generateOptionsHTML('categoryBox', categories, 'categories');
}

function createNewTask(){
    
}

function addColorChoser(){
    document.getElementById('id_categoryBox').innerHTML += `
    <div class="d-flex">
        <a onclick="setActiveColor('8AA4FF')" id="8AA4FF" class="colorCircle"style="background-color:#8AA4FF;"></a>
        <a onclick="setActiveColor('FF0000')" id="FF0000" class="colorCircle"style="background-color:#FF0000;"></a>
        <a onclick="setActiveColor('2AD300')" id="2AD300" class="colorCircle"style="background-color:#2AD300;"></a>
        <a onclick="setActiveColor('FF8A00')" id="FF8A00" class="colorCircle"style="background-color:#FF8A00;"></a>
        <a onclick="setActiveColor('E200BE')" id="E200BE" class="colorCircle"style="background-color:#E200BE;"></a>
        <a onclick="setActiveColor('0038FF')" id="0038FF" class="colorCircle"style="background-color:#0038FF;"></a>
        </div>
    `;
}

function getValueOfChosenColor(){
    for(let i = 0;i<colors.length;i++){
        let isActive = document.getElementById(colors[i].slice(1)).classList.contains('colorCircleisActive');
        if(isActive){
            return colors[i];
        }
    }
   

}

function setActiveColor(id){
    document.getElementById('8AA4FF').classList.remove('colorCircleisActive');
    document.getElementById('FF0000').classList.remove('colorCircleisActive');
    document.getElementById('2AD300').classList.remove('colorCircleisActive');
    document.getElementById('FF8A00').classList.remove('colorCircleisActive');
    document.getElementById('E200BE').classList.remove('colorCircleisActive');
    document.getElementById('0038FF').classList.remove('colorCircleisActive');

    document.getElementById(id).classList.add('colorCircleisActive');
    
}

function clearAllInputs() {
    clearFields('inputTitle', 'inputDescription', 'inputDate', 'newSubtasks');
    clearListSubtask();
    cancelAddNew('addNewCat');
    cancelAddNew('addNewSubTask');
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
