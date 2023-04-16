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
            names.push(users[i]);
            generateAlphaContainerFor(users[i]['name'].charAt(0));

        }

    }
}

function getContactWith(i, value) {
    return names[i][value];
}

function generateAlphaContainerFor(letter) {
    for (let i = 0; i < names.length; i++) {
        let contactName = getContactWith(i, 'name');
        let userMail = getContactWith(i, 'email');
        document.getElementById('contact' + letter.toUpperCase()).innerHTML += `
        <div class="contactSelect" id="${contactName}">
            <span class="contactSelectName"> ${contactName}</span>
            <span class="contactSelectMail">${userMail}</span>

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
    generateContactBody();
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
    <div class="contactHeadContainer">
        <div class="colorCircle-big" style="background-color:#8AA4FF;">AB</div>
        <div class="contactHead">
            <h5 id="contactName">Name</h5>
            <div class="d-flex">
                <img src="./img/plusContacts.png" class="addTaskContacts">
                <span class="add-task-link">Add Task</span>
            </div>
        </div>
        
    </div>
    `;
}

function generateContactBody(){
    document.getElementById('contactDetails').innerHTML += `
    <div class="contactInformationContaier">
        <div class="contactInformationTitle">
            <span>Contact Information</span>
            <div>
                <img src="./img/editContactPen.png">
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="contactInformationContent">
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Email</h5>
                <a class="contactInformationContentLink">email@email.de</a>
            </div>
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Phone</h5>
                <a class="contactInformationContentLink">+49123456789</a>
            </div>
         </div>
    </div>
    `;
}