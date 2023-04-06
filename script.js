

function init(){
    generateAddTaskHTML()
}

function generateAddTaskHTML(){
    addContentTitle();
    generateTableHTML();

    generateTableRowHTML('Title');
    generateTableRowHTML('Description');
    generateTableRowHTML('Category');
    generateTableRowHTML('Assigned To');

}

function generateTableHTML(){
    document.getElementById('addTask').innerHTML += `
    <table>
        <tbody id="addTaskDetails"></tbody>
    </table>
    `;
}

function addContentTitle(){
    document.getElementById('addTask').innerHTML += `
    <h2>Add Task</h2>
    `;
}

function generateTableRowHTML(headline){
    document.getElementById('addTaskDetails').innerHTML += `<tr id="detail"><td>${headline}</td></tr>`;

}

function showLink(link){
    document.getElementById('summary').classList.add('d-none');
    document.getElementById('board').classList.add('d-none');
    document.getElementById('addTask').classList.add('d-none');
    document.getElementById('contacts').classList.add('d-none');

    document.getElementById(link).classList.remove('d-none');

}