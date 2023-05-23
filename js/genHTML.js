/**
 * Generates the "Add Task" images for each section in the board.
 * Clicking on the image triggers the checkStatusToSet function with the specified status.
 */
function generateAddTaskToBoardImg() {
    document.getElementById('dragAreaToDoTitle').innerHTML += `
        <img class="cursor" src="../img/plusButtonDark.png" id="todoImg" onclick="checkStatusToSet('toDo')">
    `;
    document.getElementById('dragAreaIPTitle').innerHTML += `
        <img class="cursor" src="../img/plusButtonDark.png" id="ipImg" onclick="checkStatusToSet('inProgress')">
    `;
    document.getElementById('dragAreaAFTitle').innerHTML += `
        <img class="cursor" src="../img/plusButtonDark.png" id="awImg" onclick="checkStatusToSet('awaitingFeedback')">
    `;
    document.getElementById('dragAreaDoneTitle').innerHTML += `
    <img class="cursor" src="../img/plusButtonDark.png" id="doneImg" onclick="checkStatusToSet('done')">
`;
}

/**
 * Generates HTML for a checkbox item.
 * @returns {string} The HTML code for the checkbox item.
 */
function setCheckBox() {
    return `
        <li><input type="checkbox" id="list-subtask-${getValueOf('newSubtasks')}" value="${getValueOf('newSubtasks')}"> ${getValueOf('newSubtasks')}</li>
    `;
}

/**
 * Generates the HTML for an option in a dropdown menu.
 * @param {string} nameOfArray - The name of the array.
 * @param {string} content - The content of the option.
 * @returns {string} The HTML for the option.
 */
function generateTheOptionHTML(nameOfArray, content) {
    return `
            <div class="cl_${nameOfArray} d-none" id="${content}" value="${content}">
                ${content} 
                <input type="checkbox" value="${content}">
            </div>
    `;
}

/**
 * Generates the HTML for a category option in a dropdown menu.
 * @param {string} nameOfArray - The name of the array.
 * @param {number} i - The index of the category.
 * @returns {string} The HTML for the category option.
 */
function generateCategoryOptionHTML(nameOfArray, i){
    return `
        <div class="cl_${nameOfArray} d-none" id="${getCategory(i)}" value="${getCategory(i)}" >
            ${getCategory(i)}
            <div class="colorCircle" style="background:${getCategoryColor(i)}">
        </div>
    `;
}

/**
 * Generates the HTML for the "Add Task" section.
 * @param {string} id - The ID of the element to append the HTML content.
 */
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
    } else window.location.href = '../login.html';
}

/**
 * Adds a new option to the category dropdown field with a function to handle the click event.
 * @param {string} id - The ID of the option.
 */
function addOptionWithFunction(id) {
    document.getElementById('categoryBox').innerHTML += `
            <div class="cl_categories d-none" onclick="changeToInputField('${id}')" id="addNewCat" >New Category</div>`;
}

/**
 * Adds color choices to the category box in the "Add Task" form.
 */
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

/**
 * Adds a new category option with a corresponding function to the category dropdown menu.
 * @param {string} id - The ID of the new category option.
 */
function generateContactDetailsTitle() {
    document.getElementById('contactDetails').innerHTML = `
    <div class="contactsTitleContainer">
        <h2 class="contactsTitle"">Contacts</h2>
        <div class="fillerDiv"></div>
        <h4>Better with a team</h4>
    </div>
`;
}

/**
 * Adds a back arrow button to the contact details section and attaches an event listener to hide the contact details.
 */
function hideContactDetailsButton() {
    document.getElementById('contactDetails').innerHTML += `
        <img src="../img/arrowBackBlack.png" onclick="hideContactDetails()" class="backArrow">
    `;
}

/**
 * Generates the contact head section in the contact details.
 * It includes the contact's logo, name, and an option to add a new task for the contact.
 */
function generateContactHead() {
    document.getElementById('contactDetails').innerHTML += `
    <div class="contactHeadContainer d-none" id="contactHeadContainer">
        <div class="colorCircle-big" id="contactDetailsLogo" style="background-color:#8AA4FF;">AB</div>
        <div class="contactHead">
            <h5 id="contactName">Name</h5>
            <div class="contactHeadAddTask" onclick="showAddNewTaskAtContacts()">
                <img src="../img/plusContacts.png" class="addTaskContacts">
                Add Task
            </div>
        </div>
    </div>
    `;
}

/**
 * Generates the contact body section in the contact details.
 * It includes contact information such as email and phone, and an option to edit or delete the contact.
 */
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
    <div class="deleteButtonContent" id="deleteButtonContent"></div>
    `;
}

/**
 * Generates HTML for labels in the form.
 * @param {string} field - The HTML tag for the label.
 * @param {string} headline - The headline for the labels section.
 * @returns {string} - The generated HTML for the labels.
 */
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

/**
 * Generates HTML for a textarea field in the form.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} field2 - The HTML tag for the textarea field.
 * @param {string} headline - The headline for the textarea field.
 * @param {string} placeholder - The placeholder text for the textarea field.
 * @returns {string} - The generated HTML for the textarea field.
 */
function generatesTextareaFieldHTML(field1, field2, headline, placeholder) {
    return `
    <div class="detail">
        <${field1}>${headline}</${field1}>
        <${field2} class="inputDescriptionField" type="text" id="inputDescription" placeholder="${placeholder}" required></${field2}>
    </div>
    `;
}

/**
 * Generates HTML for an input field in the form.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} field2 - The HTML tag for the input field.
 * @param {string} headline - The headline for the input field.
 * @param {string} properties - The CSS properties for the input field.
 * @param {string} type - The type of the input field (e.g., text, date, etc.).
 * @param {string} id - The id of the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @returns {string} - The generated HTML for the input field.
 */
function generatesInputFieldHTML(field1, field2, headline, properties, type, id, placeholder) {
    return `
    <div class="detail" id="id_${id}">
        <${field1}>${headline}</${field1}>
        <${field2} class="${properties}" type="${type}" id="${id}" placeholder="${placeholder}" required>
    </div>
    `;
}

/**
 * Generates HTML for an input field in the form with the option to change the input field.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} field2 - The HTML tag for the input field.
 * @param {string} headline - The headline for the input field.
 * @param {string} properties - The CSS properties for the input field.
 * @param {string} type - The type of the input field (e.g., text, date, etc.).
 * @param {string} id - The id of the input field.
 * @param {string} restoreID - The id to restore when canceling the change.
 * @param {string} atClick - The function to execute when confirming the change.
 * @param {string} newclass - The CSS class for the change container.
 * @returns {string} - The generated HTML for the input field with change option.
 */
function generatesChangedInputFieldHTML(field1, field2, headline, properties, type, id, restoreID, atClick,newclass) {
    return `
    <${field1}>${headline}</${field1}>
    <${field2} class="${properties}" type="${type}" id="${id}" >
    <div class="${newclass} newCat">
        <a onclick="cancelAddNew('${restoreID}')"><img src="../img/cancelIcon.png"></a>
        <div class="border-1px-solid margin0px width0-height31px"></div>
        <a onclick="${atClick}"><img src="../img/checkIcon.png"></a>
    </div>  
    `;
}

/**
 * Generates HTML for an options field in the form.
 * @param {string} field1 - The HTML tag for the label.
 * @param {string} headline - The headline for the options field.
 * @param {string} properties - The CSS properties for the options field.
 * @param {string} id - The id of the options field.
 * @param {string} source - The path to the image source.
 * @param {string} selectionText - The text to display as the default selection.
 * @returns {string} - The generated HTML for the options field.
 */
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

/**
 * Adds the "Invite Contact" option to the assignedTo dropdown menu.
 */
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

/**
 * Generates the options field HTML with the selected value displayed.
 * @param {string} field1 - The HTML tag for the field label.
 * @param {string} headline - The headline or label text.
 * @param {string} properties - The class or properties of the field.
 * @param {string} id - The unique identifier for the field.
 * @param {string} source - The source of the image for the select button.
 * @param {string} selectionText - The text to display when no option is selected.
 * @returns {string} The generated HTML for the options field.
 */
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

/**
 * Generates the subtask field HTML with the option to add a new subtask.
 * @param {string} field1 - The HTML tag for the field label.
 * @param {string} headline - The headline or label text.
 * @param {string} properties - The class or properties of the field.
 * @param {string} id - The unique identifier for the field.
 * @param {string} source - The source of the image for the add subtask button.
 * @returns {string} The generated HTML for the subtask field.
 */
function setBackToSubTaskField(field1, headline, properties, id, source) {
    return `
    <${field1}>${headline}</${field1}>
    <div class="${properties}" id="${id}">
        <div onclick="changeToInputField('${id}')" class="subTaskStart" value="" disabled selected>Add new Subtask<img src="../${source}">
        </div>
    </div>
    `;
}

/**
 * Generates the HTML for a subtask field in the form.
 * @param {string} field1 - The type of the outer field element (e.g., "label").
 * @param {string} headline - The text for the headline of the field.
 * @param {string} properties - The class name or properties for the field element.
 * @param {string} id - The ID of the field element.
 * @param {string} source - The source URL for the image.
 * @returns {string} The generated HTML for the subtask field.
 */
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

/**
 * Generates the navigation links for the contacts page.
 */
function generateNavigationLinksContacts() {
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
    generateNavigationLinks(color, linkname);
}

/**
 * Adds a help section to the webpage.
 */
function addHelp() {
    document.body.innerHTML += `
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

/**
 * Adds a legal notice section to the webpage.
 */
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

/**
 * Generates HTML code for a selected navigation link.
 * @param {string} linkname - The name of the navigation link.
 * @returns {string} The generated HTML code for the selected navigation link.
 */
function generateSelectedNavigationLinkHTML(linkname) {
    return `
    <a onclick="showLink('${firstLetterToLowerCase(linkname)}.html')" style="background:#091931;" target="_self" class="navigation-left-link" id="show${linkname}">
         <img src="../img/${linkname.toLowerCase()}.png" alt=""> ${linkname}</a>     
    `;
}

/**
 * Generates HTML code for an unselected navigation link.
 * @param {string} linkname - The name of the navigation link.
 * @returns {string} The generated HTML code for the unselected navigation link.
 */

function generateUnSelectedNavigationLinkHTML(linkname) {
    return `
    <a onclick="showLink('${firstLetterToLowerCase(linkname)}.html')" target="_self" class="navigation-left-link" id="show${linkname}">
         <img src="../img/${linkname.toLowerCase()}.png" alt=""> ${linkname}</a>     
    `;
}

/**
 * Adds a logout button to the page.
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
        <div onclick="addLegalNotice()">Legal Notice</div>
        <div onclick="addHelp()">Help</div>`;
    }
}

/**
 * Generates HTML code for a contact category section.
 * @param {string} value - The category value (e.g., a letter).
 * @returns {string} The generated HTML code for the contact category section.
 */
function addContactCategoriesHTML(value) {
    return `
    <div class="contactSegment d-none" id="contact${value}">
         <h3 class="letter">${value}</h3>
         <div class="contactListFillerDiv"></div>
    </div>`;
}

/**
 * Generates HTML code for a contact container.
 * @param {string} contactName - The name of the contact.
 * @param {string} userMail - The email address of the contact.
 * @param {string} userPhone - The phone number of the contact.
 * @param {string} userColor - The color associated with the contact.
 * @returns {string} The generated HTML code for the contact container.
 */
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
 * Adds a close button to the "Add Task" overlay at contacts.
 * @param {string} overlay - The class name for the overlay.
 */
function addCloseBtnToAddTaskAtContacts(overlay) {
    document.getElementById('addTaskAtContacts').innerHTML += `
    <div onclick="addDisplayNone('addTaskAtContacts')" class="closeIconAtContacts ${overlay}" id="closeIconAtContacts"></div>
    `;
}

/**
 * Adds a close button to the "Add Task" overlay at the board.
 */
function addCloseBtnToAddTaskAtBoard() {
    document.getElementById('addTaskAtBoard').innerHTML += `
    <div onclick="hideAddNewTaskAtBoard()" class="closeIconAtContacts" id="closeIconAtContacts"></div>
    `;
}

/**
 * Generates HTML for an assigned circle element with the specified username.
 * @param {Object} username - The username object.
 * @param {string} username.name - The username.
 * @param {string} username.color - The color for the circle background.
 * @returns {string} The HTML for the assigned circle element.
 */
function setAssignedCircleHTML(username) {
    return `
    <div class="colorCircleMedium" id="colorCircleMedium${username.name}" style="background:${username.color}">${getFirstLettersOfName(username.name)}</div>
 `;
}

/**
 * Generates the HTML for the assigned circle element with the specified username.
 * @param {string} username - The username.
 * @returns {string} The HTML for the assigned circle element.
 */
function setStyleOfCloseIconAtContacts() {
    let clientWidth = document.body.clientWidth;
    let hideButton = document.getElementById('closeIconAtContacts');
    if (clientWidth <= 1300) {
        hideButton.style = `background-image:url('../img/closeIconEditUserAtContacts.png') !important;`;
    }
}

/**
 * Sets a confirmation message with the specified text.
 * @param {string} text - The text of the confirmation message.
 * @returns {string} The HTML string representing the confirmation message.
 */
function setConfirmMessage(text) {
    return `<div class="confirmMessage" id="confirmMessage">${text} successfully createt</div>`;
}

/**
 * Generate a card to the To do Area
 * @param {*} element Elements of the card
 * @returns the card with elements
 */
function generateTodoHTML(element, status) {
    let elementIndex = tasks.indexOf(element);
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${elementIndex})" class="card" id="card${status}${elementIndex}" onclick="openCard('${elementIndex}','${status}')">
        <div style="background:${getColor(element)}" class="taskStatus" id="cardTaskStatus">
            ${element['category']}</div>
        <div class="taskTitle" id="cardTaskTitle">
            ${element['title']}
        </div>
        <div class="taskDescription" id="cardTaskDescription${element['status']}${elementIndex}">
            ${element['description']}
        </div>  
        <div class="barContainer">
        <div class="bar" id="progressbar${element['status']}${elementIndex}">
        </div>
        <div class="taskProgressbar">
            ${getCheckedSubtasks(elementIndex)}/${element['subtasks'].length} Done 
        </div>   
       </div>
        <div class="containerUserAndPrio">
            <div class="assignedUser" id="assignedUserLogo${element['status']}${elementIndex}">
            </div>

            <div class="taskPrio">
                <img src="../img/${element['prio'].toLowerCase()}.png">
            </div>
        </div>  
    </div>`;
}

function generateProgresstStyleHTML(progress, difference){
    return `background:linear-gradient(to right,#29ABE2 ${progress}%,#F4F4F4 ${difference}%);`;
}

function generateAssignedUserHTML(username, index, status, id) {
    let category = tasks[index]['category'];
    let color = findColor(username);
    return /*html*/`
    <div class="assignedToContainer" id="${category}${id}${username}${status}${index}">
        <div class="colorCircleMedium boardCircle" style="background:${color}">
            ${getFirstLettersOfName(username)} 
        </div>
    </div>
    `;
}

function generateUserNameDivHTML(username){
    return `<div>${username}</div>`;
}

/**
 * Generate a bigger card if you clicket a small card on the areas
 * @param {*} element elemts of the card 
 * @returns the bigger card with more information
 */
function generateOpenCardHTML(element,status) {
    let elementIndex = tasks.indexOf(element);
    return `
    <div class="openCard d-none" id="openCard${status}${elementIndex}">
            <img src="../img/closeBtn.png" class="closeBtnOpen" onclick="closeOpenCard('${status}',${elementIndex})">

        <div id="taskStatusCategory${status}${elementIndex}" style="background:${getColor(element)}" class="taskStatusOpen">
            ${element['category']}
        </div>
        
        <div>
            <label id="openCardTitle${status}${elementIndex}" class="d-none editcard">Title</label>
            <textarea class="taskTitleOpen" id="editTitle${status}${elementIndex}" readonly wrap="hard">${element['title']}</textarea>
        </div>
        <div>
            <label id="openCardDescription${status}${elementIndex}" class="d-none editcard">Description</label>
            <textarea class="taskDescriptionOpen" id="editDescription${status}${elementIndex}" readonly>${element['description']}</textarea>
        </div>  
        <div id="dateContainer${status}${elementIndex}" style="display:flex;">
            <label class="taskLabelOpen editcard" >Due date: </label>
            <input  class="taskDueDateOpen" id="editDate${status}${elementIndex}" readonly type="date" value="${element['dueDate']}" class="inputTextStd"/>
        </div>
        <div class="taskPrioOpen" id="taskPrioOpen${status}${elementIndex}">
            <label class="taskLabelOpen">Priority: </label>
            <img src="../img/${element['prio'].toLowerCase()}AllinOne.png">
        </div>
        <div id="editSubtasksContainer${status}${elementIndex}">
        </div>  
        <div class="taskAssignedUserOpen" id="assignedUserOpen${status}${elementIndex}"> 
        <span class="taskLabelOpen">Assigned to: </span> 

        <label class="taskLabelOpen" id="assignedUserLogoOpen${status}${elementIndex}"></label>
        </div>
        
        <div class="editDeleteBtnOpen" id="editDeleteBtnOpen${status}${elementIndex}">
            <div class="deleteBtnOpenCard" onclick="deleteTask('${element["title"]}','${status}',${elementIndex})"></div>
            <div class="editBtnOpenCard"  onclick="editCard('${status}',${elementIndex},'id_${element['prio'].toLowerCase()}')"></div>
        </div>
        <div class="editSaveBtnOpenContainer"> <button class="editSaveBtnOpen d-none" id="editSaveBtnOpen${status}${elementIndex}" onclick="editThisTask(${elementIndex},'${status}')">
                Ok<img src="../img/okWhite.png">
            </button>
        </div>
    </div>`;
}

function addCheckBoxAtBoardHTML(index,i,status) {
    return `
        <div> 
            ${tasks[index]['subtasks'][i]['item']} 
            <input type="checkbox"class="taskSubtasksOpen" onchange="setSubtaskChecked('${status}', ${index}, ${i})"
             id="editSubtasks${tasks[index]['subtasks'][i]['item']}${status}${index}" value="${tasks[index]['subtasks'][i]['item']}"/>
        </div>
    `;
}

function resetTaskPrioHTML(element) {
    return `
        <label class="taskLabelOpen">Priority: </label>
        <img src="../img/${element['prio'].toLowerCase()}.png">
    `;
}

function resetAssignedHTML(status,index){
    return `
    <span class="taskLabelOpen">Assigned to: </span> 

        <label class="taskLabelOpen" id="assignedUserLogoOpen${status}${index}"></label>
    `;
}

function generateAssignedListHTML(){
    return `
    <div class="p-relative d-flex align-c">
        <list class="d-flex" id="list-assigned-user">
        </list>
    </div>
    `;
}