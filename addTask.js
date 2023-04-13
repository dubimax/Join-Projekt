function generateAddTaskHTML() {
    addContentTitle('Add Task', 'addTask');
    document.getElementById('addTask').innerHTML += `
    <div class="details">
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
                <div class="p-relative d-flex align-c">
                    <input type="text" placeholder="Add a new Subtask" class="inputTextStd" id="newSubtask">
                    <img onclick="generateCheckboxItem()" src="./img/addIcon.png" class="inputAddIcon">
                </div>
                <list class="" id="list-subtask">
                </list>
            </div>
        </div>
        </div>
    `;
    generateOptionsHTML('assignedTo', users, 'users');
    addOptionWithFunction();
    generateOptionsHTML('categoryBox', categories, 'categories');
}