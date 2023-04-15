function generateContactsHTML() {
    addContactCategories();
    setVisibleIfnotEmpty();
    generateContactDetailsHTML();
}
let names = [];


function addContactCategories() {
    for (let i = 0; i < 26; i++) {
        let ascicode = (65 + i).toString();
        let value = String.fromCharCode(ascicode);
        document.getElementById('contacts').innerHTML += `
       <div class="contactSegment d-none" id="contact${value}">
            <h3 class="letter">${value}</h3>
       </div>`;
        getContactsWith(value);
    }
}

function getContactsWith(startLetter) {
    names = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i]['name'].charAt(0) == startLetter) {
            names.push(users[i]['name']);
            generateAlphaContainerFor(users[i]['name'].charAt(0));

        }

    }
}

function getContactWith(i) {
    return names[i];
}

function generateAlphaContainerFor(letter) {
    for (let i = 0; i < names.length; i++) {
        document.getElementById('contact' + letter.toUpperCase()).innerHTML += `
        <div id="${getContactWith(i, letter)}">
            ${getContactWith(i, letter)}
        </div>
        `;
    }

}

function setVisibleIfnotEmpty() {
    for (let j = 0; j < 26; j++) {

        let ascicode = (65 + j).toString();
        let value = String.fromCharCode(ascicode);
        let child = document.getElementById('contact' + value).children;
        if (child[1]) {
            document.getElementById('contact' + value).classList.remove('d-none');

        }

    }

}

function getFirstLettersOfName() {
    for(let i = 0;i< users.length;i++){
        let str = users[i]['name'];
        let matches = str.match(/\b(\w)/g); // ['J','S','O','N']
        let acronym = matches.join(''); // JSON
    
        console.log(acronym)
    }
    
}


function generateContactDetailsHTML(){
    generateContactDetailsTitle();
    generateContactHead();
}

function generateContactDetailsTitle(){
    document.getElementById('contactDetails').innerHTML += `
    <div class="d-flex">
        <h2 class="contactsTitle"">Contacts</h2>
        <div class="fillerDiv"></div>
        <h4>Better with a team</h4>
    </div>
`;
}

function generateContactHead(){
    document.getElementById('contactDetails').innerHTML += `
    <div class="d-flex">
        <img>
        <div class="contactHead">
            <h5>Name</h5>
            <div class="d-flex">
                <img src="./img/plusContacts.png" class="addTaskContacts">
                <span class="add-task-link">Add Task</span>
            </div>
        </div>
        
    </div>
    `;
}