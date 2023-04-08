


/**
 *  Generates Add Task HTML Content
 */
function generateAddTaskHTML() {
    addContentTitle('Add Task', 'addTask');
    document.getElementById('addTask').innerHTML += `
    <div class="details">
        <div class="detailBox-left">
            ${generatesInputFieldHTML('label', 'input', 'Title', 'inputTextStd', 'text')}
            ${generatesTextareaFieldHTML('label', 'textarea', 'Description')}
            ${generatesOptionsFieldHTML('label', 'select', 'option', 'Category', 'dropDownMenuField')}
            ${generatesOptionsFieldHTML('label', 'select', 'option', 'Assigned to', 'dropDownMenuField', 'assignedTo')}
        </div>
        <div class="border-1px-solid"></div>
        <div class="detailBox-right">
        ${generatesInputFieldHTML('label', 'input', 'Due Date', 'inputTextStd', 'date')}
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
    generateOptionsHTML('assignedTo');
}
let users = [];
setURL('https://marijan-dupkovic.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    generateAddTaskHTML()

}
async function getUsers() {

    users = JSON.parse(backend.getItem('users')) || [];
    return users;
}

async function addUsers() {
    let name = 'guest';
    let email = 'guest@guest.de'
    let password = 'guest'; 
    users.push({'name': name,'email': email,'pwd': password});
    backend.setItem('users', JSON.stringify(users));
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

function generatesInputFieldHTML(field1, field2, headline, properties, type) {
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}">
    </div>
    `;
}

function generatesOptionsFieldHTML(field1, field2, field3, headline, properties , id) {
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" id="${id}">
            
        </${field2}>
    </div>
    `;
}

function generateOptionsHTML(id) {
    for (let i = 0; i < users.length; i++) {
        document.getElementById(id).innerHTML += `
            <option>${getUser(i)}</option>
        `;
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