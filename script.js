
let urgentColor = 'background-color: #FF3D00; color: #FFFFFF;';
let mediumColor = 'background-color: #FFA800;color: #FFFFFF;';
let lowColor = 'background-color: #7AE229;color: #FFFFFF;';

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function changeStyleOfLabel(id) {
    let activeID = '';
    let activeImg = '';
    document.getElementById('id_urgent').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_medium').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('id_low').style = 'background-color: #FFFFFF; color: #000000;';
    document.getElementById('urgentImgID').src = 'img/urgentIcon.png';
    document.getElementById('mediumImgID').src = 'img/mediumIcon.png';
    document.getElementById('lowImgID').src = 'img/lowIcon.png';
    if (activeID.length <= 0) {
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
            activeImg = 'mediumImgID';
            return;
        }
    } else {
        document.getElementById(activeID).style = 'background-color: #FFFFFF; color: #000000;';
        document.getElementById(activeImg).style = 'background-color: #FFFFFF; color: #000000;';
        activeID = '';
        activeImg = '';
    }

}
/**
 *  Generates Add Task HTML Content
 */
function generateAddTaskHTML() {
    addContentTitle('Add Task', 'addTask');
    document.getElementById('addTask').innerHTML += `
    <div class="details" onload="generateAddTaskHTML()">
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
                <input type="text" placeholder="Add a new Subtask" class="inputTextStd">
                <list class="d-none" id="list-subtask">
                    <input type="checkbox"> Test
                </list>
            </div>
        </div>
        </div>

    `;
    generateOptionsHTML('assignedTo', users, 'users');
    addOptionWithFunction();
    generateOptionsHTML('categoryBox', categories, 'categories');

}
let users = [];
let categories = [];
setURL('https://gruppe-527.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    await includeHTML();

    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    /*generateAddTaskHTML();*/
}


function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('userMail').value;
    let password = document.getElementById('userPassword').value;
    users.push({ 'name': name, 'email': email, 'pwd': password });
    backend.setItem('users', JSON.stringify(users));

    /*window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';*/
}

function getCategory(i) {
    return categories[i];
}

function addOptionWithFunction() {
    document.getElementById('categoryBox').innerHTML += `
            <div onselect="changeToInputField()" class="cl_categories d-none">Add new Category</div>`;
}

function cancelNewCategory() {
    document.getElementById('id_categoryBox').innerHTML = setBackToOptionsField('label', 'select', 'Category', 'dropDownMenuField', 'categoryBox');
    addOptionWithFunction();
    generateOptionsHTML('categoryBox', categories, 'categories');

}

function setBackToOptionsField(field1, field2, headline, properties, id) {
    return `
    <${field1}>${headline}</${field1}>
    <${field2} onchange="changeToInputField()" class="${properties}" id="${id}" placeholder="Choose">
    <option value="" disabled selected>Select your option</option>

    </${field2}>
    `;
}

function changeToInputField() {
    if (document.getElementById('categoryBox').value == 'Add new Category') {
        document.getElementById('id_categoryBox').innerHTML = generatesChangedInputFieldHTML('label', 'input', 'newCategory', 'inputTextStd', 'text', 'newCat');
    }
}

async function addCategory(category) {
    categories.push(category);
    backend.setItem('categories', JSON.stringify(categories));
}

function getUser(i) {
    return users[i]['name'];
}



function generateLabelsHTML(field, headline) {
    return `
    <div class="detail">
        <${field}>${headline}</${field}>
        <div class="d-flex">
            <${field} id="id_urgent" onclick="changeStyleOfLabel('id_urgent')">Urgent <img src="img/urgentIcon.png" class="prioImg" id="urgentImgID"> </${field}>
            <${field} id="id_medium" onclick="changeStyleOfLabel('id_medium')">Medium <img src="img/mediumIcon.png" class="prioImg" id="mediumImgID"> </${field}>
            <${field} id="id_low" onclick="changeStyleOfLabel('id_low')">Low <img src="img/lowIcon.png" class="prioImg" id="lowImgID"> </${field}>
        </div>
    </div>
    `;
}

function generatesTextareaFieldHTML(field1, field2, headline) {
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="inputDescriptionField" type="text"></${field2}>
    </div>
    `;
}



function generatesInputFieldHTML(field1, field2, headline, properties, type, id) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}" id="${id}" >
    </div>
    `;
}
function generatesChangedInputFieldHTML(field1, field2, headline, properties, type, id) {
    return `
    <${field1}>${headline}</${field1}>

    <${field2} class="${properties}" type="${type}" id="${id}" >
    <div class="newCat">

        <a onclick="cancelNewCategory()"><img src="img/cancelIcon.png"></a>
        <div class="border-1px-solid width0-height31px"></div>
        <a><img src="img/checkIcon.png"></a>
    </div>  
    `;
}

function generatesOptionsFieldHTML(field1, field2, headline, properties, id, usedItems) {

    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div onchange="changeToInputField()" class="${properties}" id="${id}">
            <div onclick="showDropDownItems('${usedItems}')" class="dropDownStart" value="" disabled selected>Select task category<img src="img/dropdownIcon.png">
            </div>
        </div>
    </div>
    `;
}

function showDropDownItems(usedItems) {
    if (usedItems == 'categories') {
        showCategoryItems();
    }
    if (usedItems == 'users') {
        showUsersItems();
    }
}

function showCategoryItems() {
    for (let i = 0; i < categories.length; i++) {
        if (document.getElementById(categories[i]).classList.contains('d-none')) {
            document.getElementById(categories[i]).classList.remove('d-none');
        }
    }
}

function showUsersItems() {
    for (let i = 0; i < users.length; i++) {
        if (document.getElementById(users[i]['name']).classList.contains('d-none')) {
            document.getElementById(users[i]['name']).classList.remove('d-none');
        }
    }
}

function generateOptionsHTML(id, array, nameOfArray) {
    for (let i = 0; i < array.length; i++) {
        if (nameOfArray == 'users') {
            document.getElementById(id).innerHTML += `
            <div class="cl_${nameOfArray} d-none" id="${getUser(i)}" value="${getUser(i)}">${getUser(i)}</div>
        `;
        }
        if (nameOfArray == 'categories') {
            document.getElementById(id).innerHTML += `
            <div class="cl_${nameOfArray} d-none" id="${getCategory(i)}" value="${getCategory(i)}" >${getCategory(i)}</div>
        `;
        }

    }
}



/**
 * Adds a Title to the shown Content
 * @param {*} title Insert the title which should be shown
 * @param {*} id Insert the ID you want to Create the Headline
 */
function addContentTitle(title, id) {
    document.getElementById(id).innerHTML += `
    <h2>${title}</h2>
    `;
}



/**
 * Adds the class "d-none" (display: none) to all nav Links
 * than removes "d-none" from the param id 
 * @param {*} id Insert the ID you want to get shown
 */
function showLink(id) {
    document.getElementById('summary').classList.add('d-none');
    document.getElementById('board').classList.add('d-none');
    document.getElementById('addTask').classList.add('d-none');
    document.getElementById('contacts').classList.add('d-none');

    document.getElementById(id).classList.remove('d-none');
}

function showSignUp() {
    document.getElementById('loginWindow').classList.add('d-none');

    document.getElementById('signInWindow').classList.remove('d-none');
}
/*
function showGuest(){
    document.getElementById('loginWindow').classList.add('d-none');

    document.getElementById('content').classList.remove('d-none');
}*/