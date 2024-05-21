const uri = "/Login"


const idArrforAdmin = [];

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
const generateIDFromPassword = (password) => {
    let id = 0;
    let c =1;
    for (let i = 0; i < password.length; i++) {
        id += password.charCodeAt(i) * c;
        c++;
    }
    return id;
}

function newUser() {
    const UserName = document.getElementById('userName').value.trim();
    const Password = document.getElementById('password').value.trim();

    const item = {
        Id: generateIDFromPassword(Password),
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
            name: item.Name,
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
            console.log("data");
            console.log(data);
            storeTokenInLocalStorage(data, false);
            window.location.href = "./index.html";
        })
        .catch(error => console.error('Unable to login.', error,));
}

// function openPostman() {
//         var url = " http://localhost:5057";
//         window.open("postman://x-callback-url/open?url=" + encodeURIComponent(url));
// }


