function init(){
    generateAddTaskHTML()
}

function generateAddTaskHTML(){
    addContentTitle();
    generateInputHeadline('Title');
    generateInputHeadline('Description');
    generateInputHeadline('Category');
    generateInputHeadline('Assigned To');

}

function generateTableHTML(){
    document.getElementById('content').innerHTML += `
    <table>
        <tbody id="addTaskDetails"></tbody>
    </table>
    `;
    generateTableRowHTML();
}

function addContentTitle(){
    document.getElementById('content').innerHTML += `
    <h2>Add Task</h2>
    `;
}

function generateTableRowHTML(){
    document.getElementById('addTaskDetails').innerHTML += `<tr><td id="detail"></td></tr>`;

}

function generateInputHeadline(headline){
    generateTableHTML();
    document.getElementById('detail').innerHTML += headline;
}