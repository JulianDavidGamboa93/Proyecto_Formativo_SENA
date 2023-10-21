const RegisterForm = document.querySelector('.form');
const userName = document.querySelector('#user');
const userPassword = document.querySelector('#password');
const userEmail = document.querySelector('#email');
const names = document.querySelector('#names');
const lastNames = document.querySelector('#lastnames');
const cellphone = document.querySelector('#cellphone');

document.getElementById("send").addEventListener("click", UpdateInfo);

async function UpdateInfo(event) {
  event.preventDefault();

  // Función para validar el formulario
  function validateForm() {
    if (
      userName.value.trim() === "" ||
      userPassword.value.trim() === "" ||
      userEmail.value.trim() === "" ||
      names.value.trim() === "" ||
      lastNames.value.trim() === "" ||
      cellphone.value.trim() === ""
    ) {
      alert("Debes llenar todos los campos.");
      return false; // Evitar que el formulario se envíe
    }
    return true;
  }

  // Validar el formulario antes de continuar
  if (!validateForm()) {
    return;
  }

  try {
    const urlUpdate = "http://localhost:3000/api/login/Update";
    const dataUpdate = {
      Username: userName.value,
      Userpassword: userPassword.value,
      Email: userEmail.value,
      Names: names.value,
      Lastnames: lastNames.value,
      Phonenumber: cellphone.value,
    };
    console.log(dataUpdate);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    };
    console.log(urlUpdate, requestOptions);
    const updateFetch = await fetch(urlUpdate, requestOptions);
    const Responses = await updateFetch.json();
    console.log(Responses);
    if (Responses.status === 200) {
      try {
        const urlWhere = "http://localhost:3000/api/login/Where";
        const dataWhere = {
          Username: userName.value,
          Userpassword: userPassword.value,
          Email: userEmail.value,
          Names: names.value,
          Lastnames: lastNames.value,
          Phonenumber: cellphone.value,
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataWhere),
        };
        const whereLogin = await fetch(urlWhere, requestOptions);
        const responsesWhere = await whereLogin.json();
        console.log(responsesWhere);
        if (responsesWhere?.data[0]?.Rol === "CLIENTE") {
          RegisterForm.reset();
          alert("Registro editado correctamente");
        } else {
          alert('Usuario incorrecto, asegúrese de digitar bien el nombre del usuario');
        }
      } catch (error) {
      }
    } else {
      alert("Error de API o al actualizar el registro");
    }
  } catch (error) {
    console.error(error);
  }
}
