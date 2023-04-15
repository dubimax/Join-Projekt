function generateContactsHTML() {
    addContactCategories();
    setVisibleIfnotEmpty();
}
let names = [];


function addContactCategories() {
    for (let i = 0; i < 26; i++) {
        let ascicode = (65 + i).toString();
        let value = String.fromCharCode(ascicode);
        document.getElementById('contacts').innerHTML += `
       <div class="contactSegmentA d-none" id="contact${value}">
            <h3>${value}</h3>
       </div>`;
        getContactsWith(value);
    }
}

function getContactsWith(startLetter) {
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