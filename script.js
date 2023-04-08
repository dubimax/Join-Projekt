
/**
 *  initialises the Website
 */
function init(){
    generateAddTaskHTML()
}

/**
 *  Generates Add Task HTML Content
 */
function generateAddTaskHTML(){
    addContentTitle('Add Task','addTask');
    document.getElementById('addTask').innerHTML += `
    <div class="details">
        <div class="detailBox-left">
            ${generatesInputFieldHTML('label', 'input','Title','inputTextStd','text')}
            ${generatesTextareaFieldHTML('label', 'textarea', 'Description')}
            ${generatesOptionsFieldHTML('label','select', 'option', 'Category','dropDownMenuField')}
            ${generatesOptionsFieldHTML('label','select', 'option', 'Assigned to','dropDownMenuField')}
        </div>
        <div class="border-1px-solid"></div>
        <div class="detailBox-right">
        ${generatesInputFieldHTML('label', 'input','Due Date','inputTextStd','date')}
        ${generateLabelsHTML('label', 'Prio')}
            
           
            <div class="detail">
                <label>Subtasks</label>
                <input type="text" placeholder="Add a new Subtask" class="inputTextStd">
            </div>
        </div>
    </div>
    `;
}

function generateLabelsHTML(field, headline){
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

function generatesTextareaFieldHTML(field1, field2, headline){
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="inputDescriptionField" type="text"></${field2}>
    </div>
    `;
}

function generatesInputFieldHTML(field1, field2, headline,properties,type){
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}">
    </div>
    `;
}

function generatesOptionsFieldHTML(field1,field2, field3, headline,properties){
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}">
            <${field3}>Kunst</${field3}>
            <${field3}>Natur</${field3}>
        </${field2}>
    </div>
    `;
}



/**
 * Adds a Title to the shown Content
 * @param {*} title Insert the title which should be shown
 * @param {*} id Insert the ID you want to Create the Headline
 */
function addContentTitle(title, id){
    document.getElementById(id).innerHTML += `
    <h2>${title}</h2>
    `;
}



/**
 * Adds the class "d-none" (display: none) to all nav Links
 * than removes "d-none" from the param id 
 * @param {*} id Insert the ID you want to get shown
 */
function showLink(id){
    document.getElementById('summary').classList.add('d-none');
    document.getElementById('board').classList.add('d-none');
    document.getElementById('addTask').classList.add('d-none');
    document.getElementById('contacts').classList.add('d-none');

    document.getElementById(id).classList.remove('d-none');
}