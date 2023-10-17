const RegisterForm = document.querySelector('#form');
const userName = document.querySelector('#user');
const userPassword = document.querySelector('#password');

document.getElementById('send').addEventListener("click", loginUpdate);

async function loginUpdate(event) {
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    const userNameValue = userName.value;
    const userPasswordValue = userPassword.value;

    // Verificar si los campos están vacíos
    if (userNameValue.trim() === '' || userPasswordValue.trim() === '') {
        // Mostrar una alerta si uno o ambos campos están vacíos
        alert('Por favor, complete todos los campos');
        return; // Salir de la función si los campos están vacíos
    }

    try {
        const url = "http://localhost:3000/api/login/Update";
        const data = {
            Username: userNameValue,
            Userpassword: userPasswordValue
        }
        const requestOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        const UpdateLog = await fetch(url, requestOption);
        const responses = await UpdateLog.json();
        console.log(data, responses);
        if (responses.status === 200) {
            alert("Se ha recuperado su contraseña de manera exitosa");
            try {
                const urlWhere = "http://localhost:3000/api/login/Where";
                const dataWhere = {
                    Username: userNameValue,
                    Userpassword: userPasswordValue
                }
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataWhere)
                }
                const whereLogin = await fetch(urlWhere, requestOptions)
                const responsesWhere = await whereLogin.json();
                console.log(responsesWhere)
                if (responsesWhere?.data[0]?.Rol === "ADMINISTRADOR") {
                    window.open("Sesion.html", "_self")
                } else if (responsesWhere?.data[0]?.Rol === "CLIENTE") {
                    window.open("Sesion.html", "_self")
                }
            } catch (error) {
                // Manejo de errores
                console.error(error);
            }
        } else if (responses.status === 404) {
            alert('Usuario no encontrado. Asegúrese de que el nombre de usuario esté escrito correctamente.');
        }
    } catch (error) {
        // Manejo de errores
        console.error(error);
    }
}
