const uri = '/Tasks';
let Tasks = [];

const getItems = () => {
    console.log("i in get items");
    fetch(uri)
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get items.', error));

}
function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addDescriptionTextbox = document.getElementById('add-description');

    const item = {
        name: addNameTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        perform: false
    };
    fetch((uri), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addDescriptionTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
    console.log(`item ${item}`);

}
const displayEditForm = (id) => {
    console.log(`edit id ${id}`);

    const item = Tasks.find(item => item.id === id);

    console.log(item);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-description').value = item.description;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isPerform').checked = item.perform;
    document.getElementById('editForm').style.display = 'block';
}

const closeInput = () => {
    document.getElementById('editForm').style.display = 'none';
}

const updateItem = () => {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        perform: document.getElementById('edit-isPerform').checked,
        name: document.getElementById('edit-name').value.trim(),
        description: document.getElementById('edit-description').value.trim(),

    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

const deleteItem = (id) => {
    console.log(`delete id ${id}`);

    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

const displayItems = (data) => {
    console.log(data);
    const tBody = document.getElementById('tasks');
    tBody.innerHTML = '';
    const button = document.createElement('button');

    data.forEach(item => {

        let isPerform = document.createElement('input');
        isPerform.type = 'checkbox';
        isPerform.disabled = true;
        isPerform.checked = item.perform;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textName = document.createTextNode(item.name);
        td1.appendChild(textName);

        let td2 = tr.insertCell(1);
        let textDescription = document.createTextNode(item.description);
        td2.appendChild(textDescription);

        let td3 = tr.insertCell(2);
        td3.appendChild(isPerform);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    Tasks = data;



}
