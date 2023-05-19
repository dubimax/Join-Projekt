function generateAddTaskToBoardImg() {
    document.getElementById('dragAreaToDoTitle').innerHTML += `
        <img src="../img/plusButtonDark.png" id="todoImg" onclick="checkStatusToSet('toDo')">
    `;
    document.getElementById('dragAreaIPTitle').innerHTML += `
        <img src="../img/plusButtonDark.png" id="ipImg" onclick="checkStatusToSet('inProgress')">
    `;
    document.getElementById('dragAreaAFTitle').innerHTML += `
        <img src="../img/plusButtonDark.png" id="awImg" onclick="checkStatusToSet('awaitingFeedback')">
    `;
    document.getElementById('dragAreaDoneTitle').innerHTML += `
    <img src="../img/plusButtonDark.png" id="doneImg" onclick="checkStatusToSet('done')">
`;
}

function generateAddTaskHTML(id) {
    load();
    if (loggedIn) {
        addContentTitle('Add Task', id);
        document.getElementById(id).innerHTML += `
    <form id="submitting" onsubmit="" class="addTaskForm" >
    <div class="details detailBox">
        <div class="detailBox-left">
            ${generatesInputFieldHTML('label', 'input', 'Title', 'inputTextStd', 'text', 'inputTitle', 'Enter a title')}
            ${generatesTextareaFieldHTML('label', 'textarea', 'Description', 'Enter a description')}
            ${generatesOptionsFieldHTML('label', 'Category', 'dropDownMenuField', 'categoryBox', './img/dropdownIcon.png', 'task category')}
            ${generatesOptionsFieldHTML('label', 'Assigned to', 'dropDownMenuField', 'assignedTo', './img/dropdownIcon.png', 'contacts to assign')}
            <div class="p-relative d-flex align-c">

                <list class="d-flex" id="list-assigned-user">
                </list>
            </div>
        </div>
        
        <div class="border-1px-solid"></div>
        <div class="detailBox-right">
        ${generatesInputFieldHTML('label', 'input', 'Due Date', 'inputTextStd', 'date', 'inputDate')}
        ${generateLabelsHTML('label', 'Prio')} 
        ${generateSubTaskField('label', 'Subtasks', 'dropDownMenuField', 'addNewSubTask', './img/addIcon.png')}
            <div class="p-relative d-flex align-c">

                <list class="" id="list-subtask">
                </list>
            </div>
            <div class="d-flex align-c container-btns">
            <div class="clearButton" onclick="clearAllInputs()">
                Clear
            </div>
            <button type="submit" class="createTaskBtn">
                Create Task  
                <img class="" src="../img/checkIconWhite.png">
            </button>
    
        </div>
        </div>
    </div>
       
       
        </form>
    `;
        addInviteNewContact();
        generateOptionsHTML(users, 'users');
        addOptionWithFunction('addNewCat');
        generateOptionsHTML(categories, 'categories');
        addEventListenerToDropDown();


    } else {
        window.location.href = '../login.html';
    }
}

function addColorChoser() {
    document.getElementById('id_categoryBox').innerHTML += `
    <div class="d-flex">
        <a onclick="setActiveColor('8AA4FF')" id="8AA4FF" class="colorCircle"style="background-color:#8AA4FF;"></a>
        <a onclick="setActiveColor('FF0000')" id="FF0000" class="colorCircle"style="background-color:#FF0000;"></a>
        <a onclick="setActiveColor('2AD300')" id="2AD300" class="colorCircle"style="background-color:#2AD300;"></a>
        <a onclick="setActiveColor('FF8A00')" id="FF8A00" class="colorCircle"style="background-color:#FF8A00;"></a>
        <a onclick="setActiveColor('E200BE')" id="E200BE" class="colorCircle"style="background-color:#E200BE;"></a>
        <a onclick="setActiveColor('0038FF')" id="0038FF" class="colorCircle"style="background-color:#0038FF;"></a>
        </div>
    `;
}

function addOptionWithFunction(id) {
    document.getElementById('categoryBox').innerHTML += `
            <div class="cl_categories d-none" onclick="changeToInputField('${id}')" id="addNewCat" >New Category</div>`;
}

function generateContactDetailsTitle() {
    document.getElementById('contactDetails').innerHTML = `
    <div class="contactsTitleContainer">
        <h2 class="contactsTitle"">Contacts</h2>
        <div class="fillerDiv"></div>
        <h4>Better with a team</h4>
    </div>
`;
}

function hideContactDetailsButton() {
    document.getElementById('contactDetails').innerHTML += `
    <img src="../img/arrowBackBlack.png" onclick="hideContactDetails()" class="backArrow">
    `;
}



function generateContactHead() {
    document.getElementById('contactDetails').innerHTML += `
    <div class="contactHeadContainer d-none" id="contactHeadContainer">
        <div class="colorCircle-big" id="contactDetailsLogo" style="background-color:#8AA4FF;">AB</div>
        <div class="contactHead">
            <h5 id="contactName">Name</h5>
            <div class="contactHeadAddTask" onclick="showAddNewTaskAtContacts();setStyleOfCloseIconAtContacts()">
                <img src="../img/plusContacts.png" class="addTaskContacts">
                Add Task
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
            <div onclick="showEditContact()" class="showEditContainer">
                <div class="showEditImg"></div>
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="contactInformationContent">
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Email</h5>
                <a class="contactInformationContentLink" id="contactDetailsEmail"></a>
            </div>
            <div class="contactInformationContentContainer">
                <h5 class="contactInformationContentTitles">Phone</h5>
                <a class="contactInformationContentLink" id="contactDetailsPhone"></a>
            </div>
         </div>
    </div>
    <div class="deleteButtonContent" id="deleteButtonContent">
    `;
}

function generateLabelsHTML(field, headline) {
    return `
    <div class="detail">
        <${field}>${headline}</${field}>
        <div class="d-flex">
            <${field} id="id_urgent" value="urgent" onclick="changeStyleOfLabel('id_urgent')">Urgent <img src="../img/urgentIcon.png" class="prioImg" id="urgentImgID"> </${field}>
            <${field} id="id_medium" value="medium" onclick="changeStyleOfLabel('id_medium')">Medium <img src="../img/mediumIcon.png" class="prioImg" id="mediumImgID"> </${field}>
            <${field} id="id_low" value="low" onclick="changeStyleOfLabel('id_low')">Low <img src="../img/lowIcon.png" class="prioImg" id="lowImgID"> </${field}>
        </div>
    </div>
    `;
}

function generatesTextareaFieldHTML(field1, field2, headline, placeholder) {
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="inputDescriptionField" type="text" id="inputDescription" placeholder="${placeholder}" required></${field2}>
    </div>
    `;
}

function generatesInputFieldHTML(field1, field2, headline, properties, type, id, placeholder) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}" id="${id}" placeholder="${placeholder}" required>
    </div>
    `;
}

function generatesChangedInputFieldHTML(field1, field2, headline, properties, type, id, restoreID, atClick) {
    return `
    <${field1}>${headline}</${field1}>

    <${field2} class="${properties}" type="${type}" id="${id}" >
    <div class="newCat">

        <a onclick="cancelAddNew('${restoreID}')"><img src="../img/cancelIcon.png"></a>
        <div class="border-1px-solid margin0px width0-height31px"></div>
        <a onclick="${atClick}"><img src="../img/checkIcon.png"></a>
    </div>  
    `;
}

function generatesOptionsFieldHTML(field1, headline, properties, id, source, selectionText) {

    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <img src="../${source}" class="selectImg">
            <div class="dropDownStart" id="${headline}${id}" disabled>Select ${selectionText}
            </div>
        </div>
    </div>
    `;
}

function addInviteNewContact() {
    document.getElementById('assignedTo').innerHTML += `
        <div class="cl_users d-none" id="invite" onclick="showLink('contacts.html')">
            <span>
                Invite Contact
            </span>
            <img src="../img/invite.png" style="width: 15px;height: 15px;object-fit: contain;">
        </div>
    `;
}

function setBackToOptionsField(field1, headline, properties, id, source, selectionText) {
    return `
    <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <img src="../${source}" class="selectImg">
            <div class="dropDownStart" id="${headline}${id}" disabled>Select ${selectionText}
            </div>
        </div>
    `;
}
function setBackToSubTaskField(field1, headline, properties, id, source) {
    return `
    <${field1}>${headline}</${field1}>
    <div class="${properties}" id="${id}">
        <div onclick="changeToInputField('${id}')" class="subTaskStart" value="" disabled selected>Add new Subtask<img src="../${source}">
        </div>
    </div>
    `;
}

function generateSubTaskField(field1, headline, properties, id, source) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <div class="${properties}" id="${id}">
            <div onclick="changeToInputField('${id}')" class="subTaskStart" value="" disabled selected>Add new Subtask<img src="../${source}">
            </div>
        </div>
    </div>
    `;
}



function generateNavigationLinksContacts() {
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
}

function addHelp() {
    document.body.innerHTML += /*html*/`
    <div class="help content" id="helpContent">
        <a class="back" onclick="removeHelp()"><img src="../img/backIconBlack.png" class="backImg"></a>
        <div class="helpContainer">
            <h2 class="helpHeader">Help</h2>
            <div class="helpDescriptionContainer">
                <h3>What is Join?</h3>
                    <p>Join is a project management tool that includes a kanban system, enabling team collaboration and task management.<br>With Join, your team can easily track tasks assigned to each team member, view their progress, and identify completed tasks. The intuitive drag and drop functionality makes it simple to move task cards across different stages.<br>Join is a valuable tool that supports your daily work.</p>
                <h3>How to use it</h3>
                    <div class="howToContainer">
                        <div class="howToNumbersAndTextContainer">
                            <div class="howToNumbers">1.</div> 
                            <div class="howToText">Click on the "Create Task" button and fill in the required fields such as title, description, category, date, and priority.<br>You can assign tasks to existing team members from your contacts or add new contacts through the "Contacts" menu.</div>
                        </div>
                        <div class="howToNumbersAndTextContainer">
                            <div class="howToNumbers">2.</div> 
                            <div class="howToText">Access the "Board" menu to view the added tasks. This is where the kanban system comes into play.<br>Use drag and drop to move task cards into the appropriate columns, such as "To Do," "In Progress," "Awaiting Feedback," or "Done."</div>
                        </div>
                            <div class="howToNumbersAndTextContainer">
                            <div class="howToNumbers">3.</div> 
                            <div class="howToText">The "Summary" menu provides an overview of all tasks.<br>You can quickly identify tasks in progress and those with approaching deadlines, which is crucial for urgent tasks. Additionally, you can easily track completed tasks.</div>
                        </div>
                        <div class="howToNumbersAndTextContainer">
                            <div class="howToNumbers">4.</div> 
                            <div class="howToText">In the "Contacts" section, you can invite new contacts and manage existing ones.<br>Invite team members by entering their contact information and sending them an invitation to join your project. You can also manage your contacts by editing their details or removing them when necessary. This allows you to maintain an organized and up-to-date contact list for efficient collaboration within your team.</div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
        `;
}

function addLegalNotice() {
    document.body.innerHTML += `
    <div class="legalNotice content" id="legalNotice">
        <a class="back" onclick="removeLegalNotice()"><img src="../img/backIconBlack.png" class="backImg"></a>
        <div class="noticeContainer">
            <div class='impressum'>
                <h1>Impressum</h1><br>
                <p>Angaben gemäß § 5 TMG</p><br>
                <p>Max Muster <br>
                    Musterweg<br>
                    12345 Musterstadt <br>
                </p><br>
                <p> <strong>Vertreten durch: </strong><br><br>
                    Max Muster<br>
                    Maxi Musterli<br>
                </p><br>
                <p><strong>Kontakt:</strong> <br><br>
                    Telefon: 01234-789456<br>
                    Fax: 1234-56789<br>
                    E-Mail: <a style="color:blue;" href='mailto:max@muster.de'>max@muster.de</a></br></p>
                </p><br>
                <p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
                    Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                    zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
                    Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                    diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                    Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                    Inhalte umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                    deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                    Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                    die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                    Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                    entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                    umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
                    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit
                    auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen)
                    erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne
                    Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
                    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                    Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
                    nicht möglich. <br>
                    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
                    Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit
                    ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte
                    im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
                </p><br>
                Website Impressum von <a style="color:blue;" href="https://www.impressum-generator.de">impressum-generator.de</a>
            </div>
        </div>
    </div>`;
}

function generateSelectedNavigationLinkHTML(linkname) {
    return `
    <a onclick="showLink('${firstLetterToLowerCase(linkname)}.html')" style="background:#091931;" target="_self" class="navigation-left-link" id="show${linkname}">
         <img src="../img/${linkname.toLowerCase()}.png" alt=""> ${linkname}</a>     
    `;
}

function generateUnSelectedNavigationLinkHTML(linkname) {
    return `
    <a onclick="showLink('${firstLetterToLowerCase(linkname)}.html')" target="_self" class="navigation-left-link" id="show${linkname}">
         <img src="../img/${linkname.toLowerCase()}.png" alt=""> ${linkname}</a>     
    `;
}

/**
 * Adds a LogoutButton to the Body
 */
function addLogoutButton() {
    let clientWidth = document.body.clientWidth;

    document.body.innerHTML += `
    <div class="logoutButton" id="optionsMenu">
        <div  id="logoutButton" onclick="logout()">
            Logout
        </div>
    </div>`;

    if (clientWidth < 1300) {
        document.getElementById('optionsMenu').innerHTML += `
        <div>Legal Notice</div>
        <div>Help</div>`;
    }
}

/**
 * Generates HTML for ContactCategories
 * @param {*} value 
 * @returns 
 */
function addContactCategoriesHTML(value) {
    return `
    <div class="contactSegment d-none" id="contact${value}">
         <h3 class="letter">${value}</h3>
         <div class="contactListFillerDiv"></div>
    </div>`;
}

function setContactsContainerHTML(contactName, userMail, userPhone, userColor) {
    return `
    <div onclick="setContactDetails('${contactName}','${userMail}','${userPhone}','${userColor}');setColorWhenSelectet('contactAt${contactName}')" class="contactSelect" id="contactAt${contactName}">
        <div class="colorCircleMedium" id="colorCircleMedium" style="background:${userColor}">${getFirstLettersOfName(contactName)}</div>
        <div class="contactsAttributeBox">
            <span class="contactSelectName"> ${contactName}</span>
            <span class="contactSelectMail">${userMail}</span>
        </div>
    </div>
    `;
}

/**
 * Function for generating all ContactDetails
 */
function generateContactDetailsHTML() {
    generateContactDetailsTitle();
    generateContactHead();
    generateContactBody();
    hideContactDetailsButton();
}

/**
 * Adds a close Button to AddTaskAtContacts
 */
function addCloseBtnToAddTaskAtContacts() {
    document.getElementById('addTaskAtContacts').innerHTML += `
    <div onclick="hideAddNewTaskAtContacts()" class="closeIconAtContacts" id="closeIconAtContacts"></div>
    `;
}

function addCloseBtnToAddTaskAtBoard() {
    document.getElementById('addTaskAtBoard').innerHTML += `
    <div onclick="hideAddNewTaskAtBoard()" class="closeIconAtContacts" id="closeIconAtContacts"></div>
    `;
}

function setStyleOfCloseIconAtContacts() {
    let clientWidth = document.body.clientWidth;
    let hideButton = document.getElementById('closeIconAtContacts');
    if (clientWidth <= 1300) {
        hideButton.style = `background-image:url('../img/closeIconEditUserAtContacts.png') !important;top: 108px !important;right: 50px !important;`;
    }
}