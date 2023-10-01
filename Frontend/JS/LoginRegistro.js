const RegisterForm = document.querySelector('.form')
const userName = document.querySelector('#user');
const userPassword = document.querySelector('#password');
const userEmail = document.querySelector('#email');
const names = document.querySelector('#names');
const lastNames = document.querySelector('#lastnames');
const birthDate = document.querySelector('#birthdate');
const Usergender = document.querySelector('#gender');
const cellPhone = document.querySelector('#cellphone');
const rolUser = document.querySelector('#rol');


document.getElementById("send").addEventListener("click", RegistroLogin);

async function RegistroLogin(event) {
  event.preventDefault();
  try {
    const url = "http://localhost:3000/api/login/Insert";
    const data = {
        Username: userName.value,
        Userpassword: userPassword.value,
        Email: userEmail.value,
        Names: names.value,
        Lastnames: lastNames.value,
        Birthdate: birthDate.value,
        Gender: Usergender.value,
        Phonenumber: cellPhone.value,
        Rol: rolUser.value
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
    console.log(data);
    if (Responses.status === 200) {
      alert(`El usuario${userName.value}, se ha registrado correctamente como ${rolUser.value}`);
      window.open('../index.html', '_self');
    }else {
      alert("Error al intentar registrarse");
    }
    form.reset();
  } catch (error) {
  }
}