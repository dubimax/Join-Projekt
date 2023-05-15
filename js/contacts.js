let names = [];

/**
 * initialises the contacts page
 */
async function initContacts() {
    await includeHTML();
    generateNavigationLinks('Contacts', 'Summary', 'Board', 'AddTask', 'Contacts');
    generateContactsHTML();
}

/**
 * generates the Contacts Site when user is loggedIn
 */
function generateContactsHTML() {
    load();
    if (loggedIn) {
        addContactCategories();
        setVisibleIfnotEmpty();
        generateContactDetailsHTML();
        generateAddTaskHTML('addTaskAtContacts');
        addCloseBtnToAddTaskAtContacts();
    } else {
        window.location.href = 'login.html';
    }
}

/**
 * adds Contact Categories from A to Z
 */
function addContactCategories() {
    document.getElementById('contacts').innerHTML = '';
    for (let i = 0; i < 26; i++) {
        let ascicode = (65 + i).toString();
        let value = String.fromCharCode(ascicode);
        document.getElementById('contacts').innerHTML += addContactCategoriesHTML(value);
        getContactsWith(value);
    }
}

/**
 * deletes a contact by its name
 * @param {*} contactName 
 */
function deleteContact(contactName) {
    let deleteUser = users.find(u => u.name == contactName);
    let index = users.indexOf(deleteUser);
    users.splice(index, 1);
    pushToDatabase();
}

/**
 * Adds an Eventlistener to DeleteButton
 */
function addEventListenerToDeleButton() {
    let deleteButton = document.getElementById('deleteButton');
    let contactToDelete = document.getElementById('editContactName').value;
    deleteButton.addEventListener('click', function () {
        deleteContact(contactToDelete);
        hideEditContact();
        addContactCategories();
        setVisibleIfnotEmpty();
        generateContactDetailsHTML();
        save();
    });
}

/**
 * Get all Starting letters
 * @param {*} startLetter 
 */
function getContactsWith(startLetter) {
    names = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i]['name'].charAt(0) == startLetter) {
            names.push(users[i]);
            generateAlphaContainerFor(`${users[i]['name'].charAt(0)}`);
        }
    }
}

/**
 * Get contacts information by index and a value
 * @param {*} i index
 * @param {*} value InformationValue
 * @returns Information
 */
function getContactWith(i, value) {
    return names[i][value];
}

/**
 * Generates Container with Letter and removes it from array
 * @param {*} letter 
 */
function generateAlphaContainerFor(letter) {
    for (let i = 0; i < names.length; i++) {
        let contactName = getContactWith(i, 'name');
        let userMail = getContactWith(i, 'email');
        let userPhone = getContactWith(i, 'phone');
        let userColor = getContactWith(i, 'color')
        document.getElementById('contact' + letter.toUpperCase()).innerHTML += setContactsContainerHTML(contactName, userMail, userPhone, userColor);
        names.splice(0);
    }
}

/**
 * Sets Letter Container visible if it is not empty
 */
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

/**
 * Gets the First letters of given username
 * @param {*} username 
 * @returns Acronyms of username (Surname Name)
 */
function getFirstLettersOfName(username) {
    let str = username;
    let matches = str.match(/\b(\w)/g);
    let acronym = matches.join('');
    return acronym;
}

/**
 * Removes the class "d-none" to show AddNewContact
 */
function showAddNewContact() {
    document.getElementById('createNewUserAtContacts').classList.remove('d-none');
}

/**
 * Adds the class "d-none" to hide AddNewContact
 */
function hideAddNewContact() {
    document.getElementById('createNewUserAtContacts').classList.add('d-none');
}

/**
 * Removes the class "d-none" to show AddNewTaskAtContacts page
 */
function showAddNewTaskAtContacts() {
    document.getElementById('addTaskAtContacts').classList.remove('d-none');
    addEventListenerToDropDown();
}

/**
 * Adds the class "d-none" to hide AddNewTaskAtContacts page
 */
function hideAddNewTaskAtContacts() {
    document.getElementById('addTaskAtContacts').classList.add('d-none');
}
/**
 * Adds the class "d-none" to hide editUserAtContacts page
 */
function hideEditContact() {
    document.getElementById('editUserAtContacts').classList.add('d-none');
}

/**
 * Removes the class "d-none" to show editContacts page
 * Set the value from the selected user to the inputfields
 */
function showEditContact() {
    let oldName = document.getElementById('contactName').innerHTML;
    let oldEmail = document.getElementById('contactDetailsEmail').innerHTML;
    let oldPhone = document.getElementById('contactDetailsPhone').innerHTML;
    document.getElementById('editContactName').value = oldName;
    document.getElementById('editContactEmail').value = oldEmail;
    document.getElementById('editContactPhone').value = oldPhone;
    document.getElementById('editUserAtContacts').classList.remove('d-none');
    addEventListenerToDeleButton();
}

/**
 * Creates a new Contact
 */
function createNewContact() {
    let userName = document.getElementById('createNewContactName').value;
    let userEmail = document.getElementById('createNewContactEmail').value;
    let userPhone = document.getElementById('createNewContactPhone').value;
    let userColor = randomcolor();
    users.push({ 'name': userName, 'email': userEmail, 'phone': userPhone, 'color': userColor });
    pushToDatabase();
    hideAddNewContact();
    addConfirmMessage();
    setTimeout(function () {
        removeConfirmMessage();
        addContactCategories();
        setVisibleIfnotEmpty();
        save();
    }, 3000);
}

/**
 * Edits an existing contact
 */
function editContact() {
    let oldEmail = document.getElementById('contactDetailsEmail').innerHTML;
    let userName = document.getElementById('editContactName').value;
    let userEmail = document.getElementById('editContactEmail').value;
    let userPhone = document.getElementById('editContactPhone').value;
    let oldUser = users.findIndex(user => user.email == oldEmail);
    users[oldUser]['name'] = userName;
    users[oldUser]['email'] = userEmail;
    users[oldUser]['phone'] = userPhone;
    pushToDatabase();
    hideEditContact();
    addContactCategories();
    setVisibleIfnotEmpty();
    generateContactDetailsHTML();
    save();
}

/**
 * Adds the class "d-none" to hide contactdetails
 */
function hideContactDetails() {
    document.getElementById('contactDetails').classList.add('d-none');
    hideKPMT();
    showAddNewContactButton();
}

/**
 * Sets the properties of COntactDetails by: userName, UserMail, userPhone, userColor
 * @param {*} userName 
 * @param {*} userMail 
 * @param {*} userPhone 
 * @param {*} userColor 
 */
function setContactDetails(userName, userMail, userPhone, userColor) {
    if (document.body.clientWidth <= 350) {
        document.getElementById('contactDetailsContainer').children[5].classList.add('d-none');
        document.getElementById('navigation-top').children[1].classList.remove('d-none');
    }
    if (document.getElementById('contactDetails').classList.contains('d-none')) {
        document.getElementById('contactDetails').classList.remove('d-none');
    }
    document.getElementById('contactName').innerHTML = userName;
    document.getElementById('contactDetailsLogo').style = `background:${userColor}`;
    document.getElementById('contactDetailsLogo').innerHTML = getFirstLettersOfName(userName);
    document.getElementById('contactDetailsEmail').innerHTML = userMail;
    document.getElementById('contactDetailsEmail').href = `mailto:${userMail}`;
    document.getElementById('contactDetailsPhone').innerHTML = userPhone;
    document.getElementById('contactDetailsPhone').href = `tel:${userPhone}`;
    document.getElementById('contactHeadContainer').classList.remove('d-none');
    document.getElementById('contactInformationContainer').classList.remove('d-none');

    showKPMT();
    hideAddNewContactButton();
}

/**
 * Sets the background of an Selected user in the Userlist to #2A3647  
 * @param {*} id 
 */
function setColorWhenSelectet(id) {
    addContactCategories();
    setVisibleIfnotEmpty();
    document.getElementById(id).style = `background:#2A3647;`;
    document.getElementById(id).children[1].children[0].style = 'color:#FFFFFF';
}

/**
 * Generates a Random color code as HEX
 * @returns 
 */
function randomcolor() {
    let random = Math.floor(0x100000000 * Math.random());
    console.log('#' + ('00000' + random.toString(16)).slice(-6).toUpperCase());
    return '#' + ('00000' + random.toString(16)).slice(-6).toUpperCase();

}

function showKPMT(){
    let clientWidth = document.body.clientWidth;
    let kpmt = document.getElementById('kpmt');
    if(clientWidth <=1000){
        kpmt.style = `display:unset !important;top:120px !important;padding-left:25px !important;`;
    }
}

function hideKPMT(){
    let clientWidth = document.body.clientWidth;
    let kpmt = document.getElementById('kpmt');
    if(clientWidth <=1000){
        kpmt.style = `display:none !important;`;
    }
}

function showAddNewContactButton(){
    let clientWidth = document.body.clientWidth;
    let hideButton = document.getElementById('addNewContactButton');
    if(clientWidth <=1000){
        hideButton.style = '';
    }
}

function hideAddNewContactButton(){
    let clientWidth = document.body.clientWidth;
    let hideButton = document.getElementById('addNewContactButton');
    if(clientWidth <=1000){
        hideButton.style = `display:none !important;`;
    }
}