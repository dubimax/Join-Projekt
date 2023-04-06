
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
    generateTableHTML('addTask');
    generateTableRowHTML('Title');
    generateInputFieldHTML();
    generateTableRowHTML('Description');
    generateInputFieldHTML();

    generateTableRowHTML('Category');
    generateInputFieldHTML();

    generateTableRowHTML('Assigned To');
    generateInputFieldHTML();

}

/**
 *  generates a Table in an Element
 * @param {*} id Insert the ID you want to Create the Table
 */
function generateTableHTML(id){
    document.getElementById(id).innerHTML += `
    <div class="details" id="addTaskDetails"></div>
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
 *  Add a tableRow with a <td></td> Element
 *  with param inserted as Headline for inputfields
 * @param {*} headline  
 */
function generateTableRowHTML(headline){
    document.getElementById('addTaskDetails').innerHTML += `<label id="detail">${headline}</label>`;
}

function generateInputFieldHTML(){
    document.getElementById('addTaskDetails').innerHTML += `<input>`;

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