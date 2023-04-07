
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
            <div class="detail">
                <label>Title</label>
                <input class="inputTextStd" type="text">
            </div>
            <div class="detail">
                <label>Description</label>
                <textarea class="inputDescriptionField" type="text"></textarea>
            </div>
            <div class="detail">
                <label>Category</label>
                <select class="dropDownMenuField">
                    <option>Kunst</option>
                    <option>Natur</option>
                </select>
            </div>
            <div class="detail">
                <label>Assigned to</label>
                <select class="dropDownMenuField">
                    <option>Kunst</option>
                    <option>Natur</option>
                </select>
            </div>
        </div>
        <div class="border-1px-solid"></div>
        <div class="detailBox-right">
            <div class="detail">
                <label>Due Date</label>
                <input type="date" class="inputTextStd" >
            </div>
            <div class="detail">
                <label>Prio</label>
                <div class="d-flex">
                    <label>Urgent</label>
                    <label>Medium</label>
                    <label>Low</label>
                </div>
            </div>
            <div class="detail">
                <label>Subtasks</label>
                <input type="text" placeholder="Add a new Subtask" class="inputTextStd">
            </div>
        </div>
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