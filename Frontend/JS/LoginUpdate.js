const RegisterForm = document.querySelector('#form')
const userName = document.querySelector('#user');
const userPassword = document.querySelector('#password');

document.getElementById('send').addEventListener("click", loginUpdate);

async function loginUpdate(event){
    event.preventDefault();
    try {
        const url = "http://localhost:3000/api/login/Update";
        const data = {
            Username: userName.value,
            Userpassword: userPassword.value
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
        console.log(data,responses);
        if (responses.status === 200) {
            alert("Se ha recuperado su contraseña de manera exitosa");
            try {
                const urlWhere = "http://localhost:3000/api/login/Where";
                const dataWhere = {
                    Username: userName.value,
                    Userpassword: userPassword.value
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
                if(responsesWhere?.data[0]?.Rol === "ADMINISTRADOR") {
                    window.open("../index.html", "_self")
                }else if (responsesWhere?.data[0]?.Rol === "CLIENTE") {
                    window.open("../index.html", "_self")
                }

            } catch (error) {
                
            }
        }


    } catch (error) {
        
    }
}
