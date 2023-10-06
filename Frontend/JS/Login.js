const loginForm = document.querySelector('.form');
const userName = document.querySelector('#user');
const userPassword = document.querySelector('#password');
const userRol = document.querySelector('#rol');

document.getElementById("send").addEventListener("click", WhereLogin);

async function WhereLogin(event) {
  event.preventDefault();
  try {
    const url = "http://localhost:3000/api/login/Where";
    const data = {
        Username: userName.value,
        Userpassword: userPassword.value,
        Rol: userRol.value
    };
    const requestOptions = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data), 
    };
    const response = await fetch(url, requestOptions);
    const Responses = await response.json();
    console.log(Responses);
    if (Responses.data[0]?.Rol === "ADMINISTRADOR") {
      loginForm.reset(); // Cambiado de form.reset() a loginForm.reset()
      window.open('indexAdmin.html', '_self');
    } else if (Responses.data[0]?.Rol === "CLIENTE") {
      loginForm.reset(); // Cambiado de form.reset() a loginForm.reset()
      window.open('indexUsers.html', '_self');
    } else {
      alert("Usuario no registrado.");
    }
    
  } catch (error) {
   
  }
}