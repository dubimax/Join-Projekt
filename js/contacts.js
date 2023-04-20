function load(){
    users = JSON.parse(localStorage.getItem("users") || [] );
}

load();
function generateContactsHTML() {
    includeHTML();
    addContactCategories();
    setVisibleIfnotEmpty();
    generateContactDetailsHTML();
}
let names = [];

function addContactCategories() {
    document.getElementById('contacts').innerHTML = '';
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
    for (let i = 0; i < names.length; i++) {
        let contactName = getContactWith(i, 'name');
        let userMail = getContactWith(i, 'email');
        let userPhone = getContactWith(i, 'phone');
        let userColor = getContactWith(i, 'color')
        document.getElementById('contact' + letter.toUpperCase()).innerHTML += `
        <div onclick="setContactDetails('${contactName}','${userMail}','${userPhone}','${userColor}')" class="contactSelect" id="${contactName}">
            <div class="colorCircleMedium" id="colorCircleMedium" style="background:${userColor}">${getFirstLettersOfName(contactName)}</div>
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

function showAddNewContact() {
    document.getElementById('createNewUserAtContacts').classList.remove('d-none');
}

function hideAddNewContact() {
    document.getElementById('createNewUserAtContacts').classList.add('d-none');
}

function hideEditContact() {
    document.getElementById('editUserAtContacts').classList.add('d-none');
}

function showEditContact() {
    let oldName = document.getElementById('contactName').innerHTML;
    let oldEmail = document.getElementById('contactDetailsEmail').innerHTML;
    let oldPhone = document.getElementById('contactDetailsPhone').innerHTML;
    document.getElementById('editContactName').value = oldName;
    document.getElementById('editContactEmail').value = oldEmail;
    document.getElementById('editContactPhone').value = oldPhone;
    document.getElementById('editUserAtContacts').classList.remove('d-none');
}

function createNewContact() {
    let userName = document.getElementById('createNewContactName').value;
    let userEmail = document.getElementById('createNewContactEmail').value;
    let userPhone = document.getElementById('createNewContactPhone').value;
    let userColor = randomcolor();
    users.push({ 'name': userName, 'email': userEmail, 'phone': userPhone , 'color': userColor});
    backend.setItem('users', JSON.stringify(users));
    hideAddNewContact();
}

function editContact() {
    let oldEmail = document.getElementById('contactDetailsEmail').innerHTML;
    let userName = document.getElementById('editContactName').value;
    let userEmail = document.getElementById('editContactEmail').value;
    let userPhone = document.getElementById('editContactPhone').value;
    let oldUser = users.findIndex(user => user.email == oldEmail);
    users[oldUser]['name'] = userName;
    users[oldUser]['email'] = userEmail;
    users[oldUser]['phone'] = userPhone;
    backend.setItem('users', JSON.stringify(users));
    generateContactsHTML();
    hideEditContact();
}

function setContactDetails(userName, userMail, userPhone, userColor) {
    document.getElementById('contactName').innerHTML = userName;
    document.getElementById('contactDetailsLogo').style = `background:${userColor}`;
    document.getElementById('contactDetailsLogo').innerHTML = getFirstLettersOfName(userName);
    document.getElementById('contactDetailsEmail').innerHTML = userMail;
    document.getElementById('contactDetailsPhone').innerHTML = userPhone;
    document.getElementById('contactHeadContainer').classList.remove('d-none');
    document.getElementById('contactInformationContainer').classList.remove('d-none');
}

function randomcolor() {
    let random = Math.floor(0x100000000 * Math.random());
    console.log('#' + ('00000' + random.toString(16)).slice(-6).toUpperCase());
    return '#' + ('00000' + random.toString(16)).slice(-6).toUpperCase();

}

