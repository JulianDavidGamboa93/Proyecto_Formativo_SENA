const tablaUsuarios = document.querySelector('#table');
getFetch();

async function getFetch() {
    var popup = document.getElementById("popupForm");
    popup.style.display = 'none';

    try {
        const url = "http://localhost:3000/api/login";
        const response = await fetch(url);
        const data = await response.json();
        showFetch(data.data);
    } catch (error) {
    }
}

function showFetch(data) {
    table.innerHTML = "";

    const headerRow = document.createElement("tr");

    const userHeader = document.createElement("th");
    userHeader.textContent = "Usuario";
    headerRow.appendChild(userHeader);

    const emailHeader = document.createElement("th");
    emailHeader.textContent = "Email";
    headerRow.appendChild(emailHeader);

    const namesHeader = document.createElement("th");
    namesHeader.textContent = "Nombres";
    headerRow.appendChild(namesHeader);

    const lastHeader = document.createElement("th");
    lastHeader.textContent = "Apellidos";
    headerRow.appendChild(lastHeader);

    const phoneHeader = document.createElement("th");
    phoneHeader.textContent = "Celular";
    headerRow.appendChild(phoneHeader);


    const rolHeader = document.createElement("th");
    rolHeader.textContent = "Rol";
    headerRow.appendChild(rolHeader);


    const dateHeader = document.createElement("th");
    dateHeader.textContent = "Fecha de creacion";
    headerRow.appendChild(dateHeader);

    
    table.appendChild(headerRow);

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        const Row = document.createElement("tr");

        const userName = document.createElement("td");
        userName.textContent = element.Username;
        Row.appendChild(userName);

        const emailUser = document.createElement("td");
        emailUser.textContent = element.Email;
        Row.appendChild(emailUser);

        const usernames = document.createElement("td");
        usernames.textContent = element.Names;
        Row.appendChild(usernames);

        const userLastnames = document.createElement("td");
        userLastnames.textContent = element.Lastnames;
        Row.appendChild(userLastnames);

        const phoneNumber = document.createElement("td");
        phoneNumber.textContent = element.Phonenumber;
        Row.appendChild(phoneNumber);

        const rolUsers = document.createElement("td");
        rolUsers.textContent = element.Rol;
        Row.appendChild(rolUsers);

        const usersDates = document.createElement("td");
        usersDates.textContent = element.CREATED_AT;

        const btnUpdate = document.createElement("button");
        btnUpdate.textContent = "Actualizar";
        btnUpdate.classList.add('btn-update');
        Row.appendChild(btnUpdate);

        btnUpdate.addEventListener("click", Actualizar);

        function Actualizar(event) {
            event.preventDefault();
            var popup = document.getElementById("popupForm");
            const input1 = document.getElementById("Id");
            const input2 = document.getElementById("userName");
            const input3 = document.getElementById("userEmail");
            const input4 = document.getElementById("UsersNames");
            const input5 = document.getElementById("userLastnames");
            const input6 = document.getElementById("phoneNumber");
            const input7 = document.getElementById("userRol");
            const input8 = document.getElementById("userCreated");

            input1.value = element.ID_Login;
            input2.value = element.Username;
            input3.value = element.Email;
            input4.value = element.Names;
            input5.value = element.Lastnames;
            input6.value = element.Phonenumber;
            input7.value = element.Rol,
            input8.value = element.CREATED_AT;
            popup.style.display = 'block';
        }

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Eliminar';
        btnDelete.classList.add('btn-delete');
        Row.appendChild(btnDelete);

        btnDelete.addEventListener('click', eliminarRegistro);

        async function eliminarRegistro() {
            try {
                const urlDelete = "http://localhost:3000/api/login/Delete"
                const data = {
                    ID_Login: element.ID_Login,
                };
                const requestOptions = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                };
                const deleteFetch = await fetch(urlDelete, requestOptions);
                const responses = await deleteFetch.json();
                if (responses.status === 200) {
                    alert("Se Elimino de manera correcta del registro");
                    getFetch();
                }else {
                    alert("Error de api o ningun registro encontrado");
                }
            } catch (error) {
                
            }
        }

        table.appendChild(Row);
        
    }
    document.body.table?.appendChild(table);
}

const idUpdate = document.getElementById("Id");
const usernameUpdate = document.getElementById("userName");
const emailUpdate = document.getElementById("userEmail");
const namesUpdate = document.getElementById("UsersNames");
const lastnamesUpdate = document.getElementById("userLastnames");
const phomenumberUpdate = document.getElementById("phoneNumber");
const userrolUpdate = document.getElementById("userRol");
const usercreatedUpdate = document.getElementById("userCreated");

document.getElementById("enviarPopUp").addEventListener('click', updateRegistro);

async function updateRegistro(event) {
    event.preventDefault();
    try {
        const urlUpdate = "http://localhost:3000/api/login/Update";
        const data = {
            IdUser: idUpdate.value,
            usernames: usernameUpdate.value,
            useremail: emailUpdate.value,
            names: namesUpdate.value,
            lastnames: lastnamesUpdate.value,
            cellphone: phomenumberUpdate.value,
            roluser: userrolUpdate.value,
            created: usercreatedUpdate.value,
        };
        const requestOptions = {
            method: 'PATCH',
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const updateFetch = await fetch(urlUpdate, requestOptions);
        const Responses = await updateFetch.json();
        if (Responses.status === 200) {
            alert("Registro editado correctamente")
            getFetch();
        }else {
            alert ("Error de api o al actualizar el registro");
        }
    } catch (error) {
        
    }
}