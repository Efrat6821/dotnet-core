// const uri = '/Tasks';
// let Tasks = [];

// const getItems = () => {
//     console.log("i in get items");
//     fetch(uri)
//         .then(response => response.json())
//         .then(data => displayItems(data))
//         .catch(error => console.error('Unable to get items.', error));

// }
// function addItem() {
//     const addNameTextbox = document.getElementById('add-name');
//     const addDescriptionTextbox = document.getElementById('add-description');

//     const item = {
//         name: addNameTextbox.value.trim(),
//         description: addDescriptionTextbox.value.trim(),
//         perform: false
//     };
//     fetch((uri), {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(item)
//     })
//         .then(response => response.json())
//         .then(() => {
//             getItems();
//             addNameTextbox.value = '';
//             addDescriptionTextbox.value = '';
//         })
//         .catch(error => console.error('Unable to add item.', error));
//     console.log(`item ${item}`);

// }
// const displayEditForm = (id) => {
//     console.log(`edit id ${id}`);

//     const item = Tasks.find(item => item.id === id);

//     console.log(item);

//     document.getElementById('edit-name').value = item.name;
//     document.getElementById('edit-description').value = item.description;
//     document.getElementById('edit-id').value = item.id;
//     document.getElementById('edit-isPerform').checked = item.perform;
//     document.getElementById('editForm').style.display = 'block';
// }

// const closeInput = () => {
//     document.getElementById('editForm').style.display = 'none';
// }

// const updateItem = () => {
//     const itemId = document.getElementById('edit-id').value;
//     const item = {
//         id: parseInt(itemId, 10),
//         perform: document.getElementById('edit-isPerform').checked,
//         name: document.getElementById('edit-name').value.trim(),
//         description: document.getElementById('edit-description').value.trim(),

//     };

//     fetch(`${uri}/${itemId}`, {
//         method: 'PUT',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(item)
//     })
//         .then(() => getItems())
//         .catch(error => console.error('Unable to update item.', error));

//     closeInput();

//     return false;
// }

// const deleteItem = (id) => {
//     console.log(`delete id ${id}`);

//     fetch(`${uri}/${id}`, {
//         method: 'DELETE'
//     })
//         .then(() => getItems())
//         .catch(error => console.error('Unable to delete item.', error));
// }

// const displayItems = (data) => {
//     console.log(data);
//     const tBody = document.getElementById('tasks');
//     tBody.innerHTML = '';
//     const button = document.createElement('button');

//     data.forEach(item => {

//         let isPerform = document.createElement('input');
//         isPerform.type = 'checkbox';
//         isPerform.disabled = true;
//         isPerform.checked = item.perform;

//         let editButton = button.cloneNode(false);
//         editButton.innerText = 'Edit';
//         editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

//         let deleteButton = button.cloneNode(false);
//         deleteButton.innerText = 'Delete';
//         deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

//         let tr = tBody.insertRow();

//         let td1 = tr.insertCell(0);
//         let textName = document.createTextNode(item.name);
//         td1.appendChild(textName);

//         let td2 = tr.insertCell(1);
//         let textDescription = document.createTextNode(item.description);
//         td2.appendChild(textDescription);

//         let td3 = tr.insertCell(2);
//         td3.appendChild(isPerform);

//         let td4 = tr.insertCell(3);
//         td4.appendChild(editButton);

//         let td5 = tr.insertCell(4);
//         td5.appendChild(deleteButton);
//     });

//     Tasks = data;



// }

const uri = '/Tasks';
let tasks = [];

function getTokenFromLocalStorage() {
    return localStorage.getItem('dotant_token');
}

const token = getTokenFromLocalStorage();

if (!token) {
    window.location.href = "./login.html";
}

const tokenObj = JSON.parse(token);

const h1 = document.getElementById("h1");
h1.innerHTML = `Hello ${tokenObj.name}`;
const addNameTextbox = document.getElementById('add-name');
const addUserIdTextbox = document.getElementById('add-userId');
addNameTextbox.value = tokenObj.name;
addUserIdTextbox.value = tokenObj.id;

let tokenPayload;
document.addEventListener("DOMContentLoaded", function () {
    const tokenParts = tokenObj.token.split('.');
    if (tokenParts.length === 3) {
        tokenPayload = JSON.parse(atob(tokenParts[1]));
        console.log(`tokenPayload: ${tokenPayload} tokenPayload.type: ${tokenPayload.type}`);
        if (tokenPayload.type[0] === "Admin" && tokenPayload.type[1] === "User") {
            document.getElementById("usersButton").style.display = 'block';
        }
        else
            document.getElementById("usersButton").style.display = 'none';
    }
}
);
function getItems() {
    console.log("i in getItems in tasks");
    fetch(`${uri}/user/${tokenObj.id}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenObj.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (tokenPayload.type[0] === "Admin" && tokenPayload.type[1] === "User") {
                _displayItems(data)
                admin();
            }
            else if (tokenPayload.type === "User") {
                _displayItems(data)
            }
        }
        )

        .catch(error => console.error('Unable to get items.', error));
}

function getItemsAll() {
    fetch(uri, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenObj.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            _displayItems(data);
            admin();
        }
        )

        .catch(error => console.error('Unable to get items.', error));

}



function addItem() {
    const addDescriptionTextbox = document.getElementById('add-description');

    const item = {
        Id: 0,
        Name: addNameTextbox.value.trim(),
        UserId: addUserIdTextbox.value.trim(),
        Perform: false,
        Description: addDescriptionTextbox.value.trim(),
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
            if (tokenPayload.type[0] === "Admin" && tokenPayload.type[1] === "User")
                getItemsAll()
            else
                getItems()
            addDescriptionTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
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
        .then(() => {
            if (tokenPayload.type[0] === "Admin" && tokenPayload.type[1] === "User")
                getItemsAll()
            else
                getItems()
        })
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = tasks.find(item => item.id === id);
    console.log(item);
    document.getElementById('edit-description').value = item.description;
    document.getElementById('edit-perform').checked = item.perform;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-userId').value = item.userId;
    document.getElementById('edit-name').value = item.name;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const itemUserId = document.getElementById('edit-userId').value;
    const itemName = document.getElementById('edit-name').value;
    console.log(itemId);
    const item = {
        Id: parseInt(itemId),
        Perform: document.getElementById('edit-perform').checked,
        Description: document.getElementById('edit-description').value.trim(),
        Name: itemName,
        UserId: itemUserId
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
        .then(() => {
            if (tokenPayload.type[0] === "Admin" && tokenPayload.type[1] === "User")
                getItemsAll()
            else
                getItems()
        })
        .catch(error => console.error('Unable to update item.', error));

    closeInput();
    getItems();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}


function _displayItems(data) {
    const tBody = document.getElementById('Tasks');
    tBody.innerHTML = '';
    data.forEach(task => {
        console.log(task);
        const button = document.createElement('button');
        let isComplitedCheckbox = document.createElement('input');
        isComplitedCheckbox.type = 'checkbox';
        isComplitedCheckbox.disabled = true;
        isComplitedCheckbox.checked = task.perform;


        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${task.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${task.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isComplitedCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(task.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        let textNode2 = document.createTextNode(task.description);
        td3.appendChild(textNode2);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });
    tasks = data;
}

function admin() {
    const aUsersForAdmin = document.getElementById('aUsersForAdmin');
    const aTasksForAdmin = document.getElementById('aTasksForAdmin');
    aUsersForAdmin.style.display = "block";
    aTasksForAdmin.style.display = "block";
}
