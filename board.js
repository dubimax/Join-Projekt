
let currentDraggedElement;
let todos = [{
    'id': 0,
    'title': 'Putzen',
    'status': 'toDos'
}, {
    'id': 1,
    'title': 'saugen',
    'status': 'toDos'
}, {
    'id': 2,
    'title': 'essen',
    'status': 'toDos'
}, {
    'id': 3,
    'title': 'Kochen',
    'status': 'toDos'
}];

function updateHTML() {
    let toDos = todos.filter(t => t['status'] == 'toDos');
    document.getElementById('toDos').innerHTML = '';

    for (let index = 0; index < toDos.length; index++) {
        const element = toDos[index];
        document.getElementById('toDos').innerHTML += generateTodoHTML(element);
    }
    generatePseudoHTML('toDos');

    let done = todos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
    generatePseudoHTML('done');
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="card">${element['title']}</div>`
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}