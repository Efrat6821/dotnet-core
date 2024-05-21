const uri = '/Users';
let users = [];

function getItems() {
    console.log("i in getItems in users");
    fetch(uri, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenObj.token}`
        }
    })
        .then(response => response.json())
        .then(data => _displayItems2(data))
        .catch(error => console.error('Unable to get Users.', error));
}

function getTokenFromLocalStorage() {
    return localStorage.getItem('dotant_token');
}
const token = getTokenFromLocalStorage();
if (!token) {
    window.location.href = "./login.html";
}
const tokenObj = JSON.parse(token);



// window.getItems = getItems;

function addItem() {
    const addUsername = document.getElementById('add-username')
    const addPasswordTextbox = document.getElementById('add-password');

    const item = {
        Id: 0,
        Name: addUsername.value.trim(),
        Password: addPasswordTextbox.value.trim(),
        IsAdmin: false
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenObj.token}`
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addUsername.value = '';
            addPasswordTextbox.value = '';
        })
        .catch(error => console.error('Unable to add user.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenObj.token}`
        },
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete user.', error));
}

function displayEditForm(id) {
    const item = users.find(item => item.id === id);
    console.log(item);
    document.getElementById('edit-username').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-password').value = item.password;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        Id: parseInt(itemId),
        Password: document.getElementById('edit-password').value.trim(),
        IsAdmin: false,
        Name: document.getElementById('edit-username').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenObj.token}`
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update user.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'User' : 'User kinds';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems2(data) {
    const tBody = document.getElementById('Users');
    console.log(data);
    tBody.innerHTML = '';

    data.forEach(user => {
        _displayCount(data.length);
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(user.id);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeName = document.createTextNode(user.name);
        td2.appendChild(textNodeName);

        let editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${user.id})`);
        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${user.id})`);
        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    users = data;
}