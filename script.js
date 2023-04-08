


/**
 *  Generates Add Task HTML Content
 */
function generateAddTaskHTML() {
    addContentTitle('Add Task', 'addTask');
    document.getElementById('addTask').innerHTML += `
    <div class="details">
        <div class="detailBox-left">
            ${generatesInputFieldHTML('label', 'input', 'Title', 'inputTextStd', 'text', 'inputTitle')}
            ${generatesTextareaFieldHTML('label', 'textarea', 'Description')}
            ${generatesOptionsFieldHTML('label', 'select', 'Category', 'dropDownMenuField', 'categoryBox')}

            ${generatesOptionsFieldHTML('label', 'select', 'Assigned to', 'dropDownMenuField', 'assignedTo')}

        </div>
        <div class="border-1px-solid"></div>
        <div class="detailBox-right">
        ${generatesInputFieldHTML('label', 'input', 'Due Date', 'inputTextStd', 'date', 'inputDate' )}
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
    users = JSON.parse(backend.getItem('users')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
    generateAddTaskHTML();
}


async function addUsers() {
    let name = 'guest';
    let email = 'guest@guest.de'
    let password = 'guest';
    users.push({ 'name': name, 'email': email, 'pwd': password });
    backend.setItem('users', JSON.stringify(users));
}

function getCategory(i) {
    return categories[i];
}

function addOptionWithFunction(){
    document.getElementById('categoryBox').innerHTML += `
            <option><a onselect="changeToInputField()">Add new Category</a></option>`;
}

function changeToInputField(){
    if(document.getElementById('categoryBox').value == 'Add new Category'){
        document.getElementById('id_categoryBox').innerHTML = generatesChangedInputFieldHTML('label', 'input', 'newCategory', 'inputTextStd', 'text','newCat');

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
            <${field}>Urgent</${field}>
            <${field}>Medium</${field}>
            <${field}>Low</${field}>
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



function generatesInputFieldHTML(field1, field2, headline, properties, type,id) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}" id="${id}" >
    </div>
    `;
}
function generatesChangedInputFieldHTML(field1, field2, headline, properties, type,id) {
    return `
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}" id="${id}" >
    `;
}

function generatesOptionsFieldHTML(field1, field2, headline, properties, id) {
    
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <${field2} onchange="changeToInputField()" class="${properties}" id="${id}" placeholder="Choose">
        <option value="" disabled selected>Select your option</option>

        </${field2}>
    </div>
    `;
}

function generateOptionsHTML(id, array, nameOfArray) {
    for (let i = 0; i < array.length; i++) {
        if(nameOfArray == 'users'){
            document.getElementById(id).innerHTML += `
            <option value="${getUser(i)}">${getUser(i)}</option>
        `;
        }
        if(nameOfArray == 'categories'){
            document.getElementById(id).innerHTML += `
            <option value="${getCategory(i)}">${getCategory(i)}</option>
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