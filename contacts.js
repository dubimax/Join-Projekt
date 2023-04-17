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
            <div class="contactListFillerDiv"></div>
       </div>`;
        getContactsWith(value);
    }
}

function getContactsWith(startLetter) {
    names = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i]['name'].charAt(0) == startLetter) {
            names.push(users[i]);
            generateAlphaContainerFor(`${users[i]['name'].charAt(0)}`);

        }

    }
}

function getContactWith(i, value) {
        
    
    return names[i][value];
}

function generateAlphaContainerFor(letter) {
    for(let i = 0; i < names.length;i++){
        let contactName = getContactWith(i, 'name');
        let userMail = getContactWith(i, 'email');
        document.getElementById('contact' + letter.toUpperCase()).innerHTML += `
        <div onclick="setContactDetails('${contactName}','${userMail}')" class="contactSelect" id="${contactName}">
            <div class="colorCircleMedium" id="colorCircleMedium">${getFirstLettersOfName(contactName)}</div>
            <div class="contactsAttributeBox">
                <span class="contactSelectName"> ${contactName}</span>
                <span class="contactSelectMail">${userMail}</span>
            </div>
        </div>
        `;
        names.splice(0);

    }

       
    

}

function setVisibleIfnotEmpty() {
    for (let j = 0; j < 26; j++) {

        let ascicode = (65 + j).toString();
        let value = String.fromCharCode(ascicode);
        let child = document.getElementById('contact' + value).children;
        if (child[2]) {
            document.getElementById('contact' + value).classList.remove('d-none');

        }

    }

}

function getFirstLettersOfName(username) {
    let str = username;
    let matches = str.match(/\b(\w)/g);
    let acronym = matches.join('');

    return acronym;
}


function generateContactDetailsHTML() {
    generateContactDetailsTitle();
    generateContactHead();
    generateContactBody();
}

function generateContactDetailsTitle() {
    document.getElementById('contactDetails').innerHTML += `
    <div class="d-flex">
        <h2 class="contactsTitle"">Contacts</h2>
        <div class="fillerDiv"></div>
        <h4>Better with a team</h4>
    </div>
    <div onclick="showAddNewContact()" class="addNewContactButton">New Contact</div>
`;
}

function showAddNewContact() {
    document.getElementById('createNewUserAtContacts').classList.remove('d-none');
}

function hideAddNewContact() {
    document.getElementById('createNewUserAtContacts').classList.add('d-none');
}

function hideEditContact(){
    document.getElementById('editUserAtContacts').classList.add('d-none');

}
function showEditContact() {
    document.getElementById('editUserAtContacts').classList.remove('d-none');
}

function createNewContact() {
    let userName = document.getElementById('createNewContactName').value;
    let userEmail = document.getElementById('createNewContactEmail').value;
    let userPhone = document.getElementById('createNewContactPhone').value;
    users.push({ 'name': userName, 'email': userEmail, 'phone': userPhone });
    backend.setItem('users', JSON.stringify(users));

}


function generateContactHead() {
    document.getElementById('contactDetails').innerHTML += `
    <div class="contactHeadContainer d-none" id="contactHeadContainer">
        <div class="colorCircle-big" id="contactDetailsLogo" style="background-color:#8AA4FF;">AB</div>
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

function generateContactBody() {
    document.getElementById('contactDetails').innerHTML += `
    <div class="contactInformationContainer d-none" id="contactInformationContainer">
        <div class="contactInformationTitle">
            <span>Contact Information</span>
            <div onclick="showEditContact()">
                <img src="./img/editContactPen.png">
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="contactInformationContent">
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Email</h5>
                <a class="contactInformationContentLink" id="contactDetailsEmail">email@email.de</a>
            </div>
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Phone</h5>
                <a class="contactInformationContentLink" id="contactDetailsPhone">+49123456789</a>
            </div>
         </div>
    </div>
    `;
}

function setContactDetails(userName, userMail) {
    document.getElementById('contactName').innerHTML = userName;
    document.getElementById('contactDetailsLogo').innerHTML = getFirstLettersOfName(userName);
    document.getElementById('contactDetailsEmail').innerHTML = userMail;
    document.getElementById('contactDetailsPhone').innerHTML = 'Noch fehlend';
    document.getElementById('contactHeadContainer').classList.remove('d-none');
    document.getElementById('contactInformationContainer').classList.remove('d-none');
}