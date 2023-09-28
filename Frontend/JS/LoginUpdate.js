const RegisterForm = document.querySelector('#form')
const userName = document.querySelector('#user');
const userPassword = document.querySelector('#password');

document.getElementById('send').addEventListener("click", loginUpdate);

async function loginUpdate(event){
    event.preventDefault();
    try {
        const url = "http://localhost:4000/api/login/";
        const data = {
            Username: Username.value,
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
        if (responses.status === 200) {
            alert("Se ha recuperado su contraseña de manera exitosa");
            try {
                const urlWhere = "http://localhost:4000/api/login/Where"
                const dataWhere = {
                    Username: Username.value,
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
                if(responsesWhere?.data[0]?.Rol === "ADMIN") {
                    windows.open("index.html", "_self")
                }else if (responsesWhere?.data[0]?.Rol === "USER") {
                    windows.open("index.html", "_self")
                }

            } catch (error) {
                console.log("ERROR", error);
            }
        }


    } catch (error) {
        
    }
}