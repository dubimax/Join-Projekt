
function checkStatusToSet(id) {
    let getStatus = document.getElementById(id);
    let addForm = getStatus.parentElement.firstChild.nextElementSibling.innerHTML;
    addForm.replace(/\s+/g, '');
    showAddNewTaskAtBoard();
    setOnSubmitForm(addForm);
    console.log('erfolgreich');
}

function generateAddTaskToBoardImg() {
    document.getElementById('dragAreaToDoTitle').innerHTML += `
        <img src="img/plusButtonDark.png" id="todoImg" onclick="checkStatusToSet('toDo')">
    `;
    document.getElementById('dragAreaIPTitle').innerHTML += `
        <img src="img/plusButtonDark.png" id="ipImg" onclick="checkStatusToSet('inProgress')">
    `;
    document.getElementById('dragAreaAFTitle').innerHTML += `
        <img src="img/plusButtonDark.png" id="awImg" onclick="checkStatusToSet('awaitingFeedback')">
    `;
    document.getElementById('dragAreaDoneTitle').innerHTML += `
    <img src="img/plusButtonDark.png" id="doneImg" onclick="checkStatusToSet('done')">
`;
}

function setOnSubmitForm(addForm) {
    let submitElement = document.getElementById('submitting');
    submitElement.onsubmit = function () {
        createNewTask(addForm);
        return false;
    };
}

function generateAddTaskHTML(id) {
    includeHTML();
    load();
    if (loggedIn) {
        addContentTitle('Add Task', id);
        document.getElementById(id).innerHTML += `
    <form id="submitting" onsubmit="" class="addTaskForm" >
    <div class="details">
        <div class="detailBox-left">
            ${generatesInputFieldHTML('label', 'input', 'Title', 'inputTextStd', 'text', 'inputTitle', 'Enter a title')}
            ${generatesTextareaFieldHTML('label', 'textarea', 'Description', 'Enter a description')}
            ${generatesOptionsFieldHTML('label', 'Category', 'dropDownMenuField', 'categoryBox', './img/dropdownIcon.png', 'task category')}
            ${generatesOptionsFieldHTML('label', 'Assigned to', 'dropDownMenuField', 'assignedTo', './img/dropdownIcon.png', 'contacts to assign')}
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
        <div class="d-flex align-c container-btns">
        <div class="clearButton" onclick="clearAllInputs()">
            Clear
        </div>
        <button class="createTaskBtn">
            Create Task  
            <img class="" src="./img/checkIconWhite.png">
        </button>
    </div>
        </div>
       
        </form>
    `;
        generateOptionsHTML('assignedTo', users, 'users');
        addOptionWithFunction('addNewCat');
        generateOptionsHTML('categoryBox', categories, 'categories');
        addEventListenerToDropDown();
    } else {
        window.location.href = 'login.html';
    }
}

function addColorChoser() {
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

function addOptionWithFunction(id) {
    document.getElementById('categoryBox').innerHTML += `
            <div class="cl_categories d-none" onclick="changeToInputField('${id}')" id="addNewCat" >New Category</div>`;
}

function generateContactDetailsTitle() {
    document.getElementById('contactDetails').innerHTML = `
    <div class="contactsTitleContainer">
        <h2 class="contactsTitle"">Contacts</h2>
        <div class="fillerDiv"></div>
        <h4>Better with a team</h4>
    </div>
    <div onclick="showAddNewContact()" class="addNewContactButton">
    New Contact
    <img src="./img/addNewContactIcon.png" class="addNewContactIcon"
    </div>
`;
}

function generateContactHead() {
    document.getElementById('contactDetails').innerHTML += `
    <div class="contactHeadContainer d-none" id="contactHeadContainer">
        <div class="colorCircle-big" id="contactDetailsLogo" style="background-color:#8AA4FF;">AB</div>
        <div class="contactHead">
            <h5 id="contactName">Name</h5>
            <div class="contactHeadAddTask" onclick="showAddNewTaskAtContacts()">
                <img src="./img/plusContacts.png" class="addTaskContacts">
                Add Task
            </div>
        </div>
        
    </div>
    `;
}

function generateContactBody() {
    document.getElementById('contactDetails').innerHTML += `
    <div class="contactInformationContainer d-none" id="contactInformationContainer">
        <div class="contactInformationTitle">
            <span>Contact Information</span>
            <div onclick="showEditContact()" class="showEditContainer">
                <div class="showEditImg"></div>
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="contactInformationContent">
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Email</h5>
                <a class="contactInformationContentLink" id="contactDetailsEmail"></a>
            </div>
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Phone</h5>
                <a class="contactInformationContentLink" id="contactDetailsPhone"></a>
            </div>
         </div>
    </div>
    `;
}

function generateLabelsHTML(field, headline) {
    return `
    <div class="detail">
        <${field}>${headline}</${field}>
        <div class="d-flex">
            <${field} id="id_urgent" value="urgent" onclick="changeStyleOfLabel('id_urgent')">Urgent <img src="img/urgentIcon.png" class="prioImg" id="urgentImgID"> </${field}>
            <${field} id="id_medium" value="medium" onclick="changeStyleOfLabel('id_medium')">Medium <img src="img/mediumIcon.png" class="prioImg" id="mediumImgID"> </${field}>
            <${field} id="id_low" value="low" onclick="changeStyleOfLabel('id_low')">Low <img src="img/lowIcon.png" class="prioImg" id="lowImgID"> </${field}>
        </div>
    </div>
    `;
}

function generatesTextareaFieldHTML(field1, field2, headline, placeholder) {
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="inputDescriptionField" type="text" id="inputDescription" placeholder="${placeholder}"></${field2}>
    </div>
    `;
}

function generatesInputFieldHTML(field1, field2, headline, properties, type, id, placeholder) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}" id="${id}" placeholder="${placeholder}" >
    </div>
    `;
}

function generatesChangedInputFieldHTML(field1, field2, headline, properties, type, id, restoreID, atClick) {
    return `
    <${field1}>${headline}</${field1}>

    <${field2} class="${properties}" type="${type}" id="${id}" >
    <div class="newCat">

        <a onclick="cancelAddNew('${restoreID}')"><img src="img/cancelIcon.png"></a>
        <div class="border-1px-solid margin0px width0-height31px"></div>
        <a onclick="${atClick}"><img src="img/checkIcon.png"></a>
    </div>  
    `;
}

function generatesOptionsFieldHTML(field1, headline, properties, id, source, selectionText) {

    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <img src="${source}" class="selectImg">
            <div class="dropDownStart" id="${headline}${id}" disabled>Select ${selectionText}
            </div>
        </div>
    </div>
    `;
}

function setBackToOptionsField(field1, headline, properties, id, source, selectionText) {
    return `
    <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <img src="${source}" class="selectImg">
            <div class="dropDownStart" id="${headline}${id}" disabled>Select ${selectionText}
            </div>
        </div>
    `;
}
function setBackToSubTaskField(field1, headline, properties, id, source) {
    return `
    <${field1}>${headline}</${field1}>
    <div class="${properties}" id="${id}">
        <div onclick="changeToInputField('${id}')" class="subTaskStart" value="" disabled selected>Add new Subtask<img src="${source}">
        </div>
    </div>
    `;
}

function generateSubTaskField(field1, headline, properties, id, source) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <div onclick="changeToInputField('${id}')" class="dropDownStart" value="" disabled selected>Add new Subtask<img src="${source}">
            </div>
        </div>
    </div>
    `;
}