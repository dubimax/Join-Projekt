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

/**
 *  Generates Add Task HTML Content
 */


setURL('https://gruppe-527.developerakademie.net/smallest_backend_ever');

async function init() {
    await includeHTML();
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    // generateAddTaskHTML();
    generateContactsHTML();
}

// function login() {
//     let emailLogIn = document.getElementById('userMailLogIn');
//     let passwordLogIn = document.getElementById('userPasswordLogin');
//     let user = users.findIndex( u => u.email == emailLogIn.value && u.password == passwordLogIn.value ); 
//     console.log(user);
//     if(user){
//         console.log('User gefunden');
//         // window.location.href = 'summary.html';
//     }
// }

function login() {
    let userEmail = document.getElementById('userMailLogIn').value;
    let userPassword = document.getElementById('userPasswordLogIn').value;
    checkUserData(userEmail, userPassword)
}

function checkUserData(userEmail, userPassword) {
    let indexOfEmail = users.findIndex(u => u.email == userEmail);
    let indexOfPassword = users.findIndex(u => u.pwd == userPassword);
    if (indexOfEmail == -1 || indexOfPassword == -1) {
        let dataCheck = document.getElementById('dataCheck');
        dataCheck.classList.remove('d-none');
    } else {
        window.location.href = 'summary.html';
    }
}

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('userMail').value;
    let password = document.getElementById('userPassword').value;
    users.push({ 'name': name, 'email': email, 'pwd': password });
    backend.setItem('users', JSON.stringify(users));
    showFrame('signUpConfirmFrame', 'signUpFrame');
}

function addCategory() {
    let newCategory = document.getElementById('newCat').value;
    let color = getValueOfChosenColor();
    categories.push({ 'name': newCategory, 'color': color });
    backend.setItem('categories', JSON.stringify(categories));
    cancelAddNew('addNewCat');
    generateOptionsHTML('categoryBox', categories, 'categories');

}

function getCategory(i) {
    return categories[i]['name'];
}
function getCategoryColor(i) {
    return categories[i]['color'];
}

function addOptionWithFunction(id) {
    document.getElementById('categoryBox').innerHTML += `
            <div class="cl_categories d-none" onclick="changeToInputField('${id}')" id="addNewCat" >New Category</div>`;
}



function changeToInputField(id) {
    if (id == 'addNewCat') {
        document.getElementById('id_categoryBox').innerHTML = generatesChangedInputFieldHTML('label', 'input', 'Category', 'inputTextStd', 'text', 'newCat', 'addNewCat', 'addCategory()');
        addColorChoser();
        dropDown = false;
    }
    if (id == 'addNewSubTask') {
        document.getElementById('id_addNewSubTask').innerHTML = generatesChangedInputFieldHTML('label', 'input', 'Subtasks', 'inputTextStd', 'text', 'newSubtasks', 'addNewSubTask', 'generateCheckboxItem()');
    }
}

function getUser(i) {
    return users[i]['name'];
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
        <div class="border-1px-solid width0-height31px"></div>
        <a onclick="${atClick}"><img src="img/checkIcon.png"></a>
    </div>  
    `;
}
function cancelAddNew(id) {
    if (id == 'addNewCat') {
        document.getElementById('id_categoryBox').innerHTML = setBackToOptionsField('label', 'Category', 'dropDownMenuField', 'categoryBox');
        addOptionWithFunction('addNewCat');
        generateOptionsHTML('categoryBox', categories, 'categories');
        addEventListenerToDropDown();
    }
    if (id == 'addNewSubTask') {
        document.getElementById('id_addNewSubTask').innerHTML = setBackToSubTaskField('label', 'Subtasks', 'dropDownMenuField', 'addNewSubTask', './img/addIcon.png');
    }
}

function generatesOptionsFieldHTML(field1, field2, headline, properties, id, usedItems, source) {

    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <img src="${source}" class="selectImg">
            <div  class="dropDownStart" id="${headline}${id}" disabled >Select task category
            </div>
        </div>
    </div>
    `;
}

function setBackToOptionsField(field1, headline, properties, id) {
    return `
    <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <div class="dropDownStart"  id="${headline}${id}" value="" disabled>Select task category
            </div>
            <img src="./img/dropdownIcon.png" class="selectImg">
        </div>
    `;
}

function setBackToSubTaskField(field1, headline, properties, id, source) {
    return `
    <${field1}>${headline}</${field1}>
    <div class="${properties}" id="${id}">
        <div onclick="changeToInputField('${id}')" class="dropDownStart" value="" disabled selected>Add new Subtask<img src="${source}">
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

function showDropDownItems(usedItems) {
    if (usedItems == 'categories') {
        showCategoryItems();
    }
    if (usedItems == 'users') {
        showUsersItems();
    }
}

function showCategoryItems() {
    if (document.getElementById('CategorycategoryBox')) {

        checkDropDown();


        for (let i = 0; i < categories.length; i++) {
            if (document.getElementById(categories[i]['name']).classList.contains('d-none')) {
                document.getElementById(categories[i]['name']).classList.remove('d-none');
            } else {
                document.getElementById(categories[i]['name']).classList.add('d-none');

            }
        } if (selectedCategory) {
            document.getElementById(selectedCategory).classList.remove('d-none');
        }

    }

}



function checkDropDown() {
    if(!selectedCategory){
        if (!dropDown) {
            document.getElementById('CategorycategoryBox').classList.remove('d-none');
            document.getElementById('addNewCat').classList.remove('d-none');
            dropDown = true;
    
        } else {
            document.getElementById('addNewCat').classList.add('d-none');
            dropDown = false;
    
        }
    }else {
        if (!dropDown) {
            document.getElementById('CategorycategoryBox').classList.remove('d-none');
            document.getElementById('addNewCat').classList.remove('d-none');
            dropDown = true;
    
        } else {
            if(document.getElementById('addNewCat').classList.contains('d-none') && document.getElementById('addNewCat').classList.contains('d-none')){
                document.getElementById('addNewCat').classList.remove('d-none');
                document.getElementById('CategorycategoryBox').classList.remove('d-none');
            }else {
                document.getElementById('addNewCat').classList.add('d-none');
                document.getElementById('CategorycategoryBox').classList.add('d-none');
            }
           

            dropDown = false;
    
        }
    }
    
}


let subtasks = [];
function showUsersItems() {
    if (document.getElementById('Assigned toassignedTo')) {

        if (document.getElementById('Assigned toassignedTo').classList.contains('d-none')) {
            document.getElementById('Assigned toassignedTo').classList.remove('d-none');

        } else {
            document.getElementById('Assigned toassignedTo').classList.add('d-none');
        }

        for (let i = 0; i < users.length; i++) {
            if (document.getElementById(users[i]['name']).classList.contains('d-none')) {
                document.getElementById(users[i]['name']).classList.remove('d-none');
            }
            else {
                document.getElementById(users[i]['name']).classList.add('d-none');
            }
        }
    }
}

function generateCheckboxItem() {
    document.getElementById('list-subtask').innerHTML += `
    <li><input type="checkbox" id="list-subtask-${getItemFromInput()}" value="${getItemFromInput()}"> ${getItemFromInput()}</li>
    `;
    subtasks.push(getItemFromInput());
}

function getItemFromInput() {
    return document.getElementById('newSubtasks').value;
}

function generateOptionsHTML(id, array, nameOfArray) {
    for (let i = 0; i < array.length; i++) {
        if (nameOfArray == 'users') {
            document.getElementById('assignedTo').innerHTML += `
            <div  class="cl_${nameOfArray} d-none" id="${getUser(i)}" value="${getUser(i)}">
                ${getUser(i)} 
            </div>
        `;
        }
        if (nameOfArray == 'categories') {
            document.getElementById('categoryBox').innerHTML += `
            <div class="cl_${nameOfArray} d-none" id="${getCategory(i)}" value="${getCategory(i)}" >
                ${getCategory(i)}
                <div class="colorCircle" style="background:${getCategoryColor(i)}">
            </div>
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
    document.getElementById('sum').classList.add('d-none');
    // document.getElementById('board').classList.add('d-none');
    document.getElementById('addTask').classList.add('d-none');
    // document.getElementById('contacts').classList.add('d-none');
    document.getElementById(id).classList.remove('d-none');
}


function showFrame(...ids) {
    let element1 = ids[0];
    let element2 = ids[1];

    for (let i = 0; i < ids.length; i++) {

        document.getElementById(ids[i]).classList.add('d-none');
    }
    document.getElementById(element1).classList.remove('d-none');
    if (element2.length > 0) {
        document.getElementById(element2).classList.remove('d-none');
    }
}


/**
 * check if the input field length with the id user_password on index.html is longer as 0 letters and change the icon on end of input
 */

