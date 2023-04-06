
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
    generateTableRowHTML('Description');
    generateTableRowHTML('Category');
    generateTableRowHTML('Assigned To');
}

/**
 *  generates a Table in an Element
 * @param {*} id Insert the ID you want to Create the Table
 */
function generateTableHTML(id){
    document.getElementById(id).innerHTML += `
    <table>
        <tbody id="addTaskDetails"></tbody>
    </table>
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
    document.getElementById('addTaskDetails').innerHTML += `<tr id="detail"><td>${headline}</td></tr>`;
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