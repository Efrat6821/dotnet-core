const uri = "/Login"


const idArrforAdmin = [];

console.log("hhhhhhhhhhhh");
let users = [];

// פונקציה לטעינת הנתונים מקובץ ה-JSON
// function loadUsers() {
//     return fetch('Data/Users.json')
//         .then(response => response.json())
//         .then(data => {
//             users = data;
//         })
//         .catch(error => console.error('Error loading users:', error));
// }

function newUser() {
    const UserName = document.getElementById('userName').value.trim();
    const Password = document.getElementById('password').value.trim();
    // loadUsers();
    // const user = users.find(u => u.Name === UserName && u.Password === Password);
    // if (user) {
        const item = {
            Id: 0,
            Name: UserName,
            IsAdmin: false,
            Password: Password
        };
    // }
    //the admin can add users by using in thats details
    idArrforAdmin.push(
        {
            Id: item.Id,
            Name: item.Name
        }
    )

    const storeTokenInLocalStorage = (token, isAdmin) => {
        const userInfo = {
            token: token,
            id: item.Id,
            isAdmin: isAdmin
        };
        const userInfoString = JSON.stringify(userInfo);
        localStorage.setItem('dotant_token', userInfoString);
    }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then((data) => {
            storeTokenInLocalStorage(data, false);
            window.location.href = "./index.html"
        })
        .catch(error => console.error('Unable to login.', error,));
}

function openPostman() {
    window.open('postman://app', '_blank');
}


