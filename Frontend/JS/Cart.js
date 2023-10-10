const tablaUsuarios = document.querySelector('#table');
getFetch();

async function getFetch() {
    var popup = document.getElementById("popupForm");
    popup.style.display = 'none';

    try {
        const url = "http://localhost:3000/api/cart";
        const response = await fetch(url);
        const data = await response.json();
        showFetch(data.data);
    } catch (error) {
    }
}

function showFetch(data) {
    table.innerHTML = "";

    const headerRow = document.createElement("tr");

    const productHeader = document.createElement("th");
    productHeader.textContent = "Producto";
    headerRow.appendChild(productHeader);

    const quantityHeader = document.createElement("th");
    quantityHeader.textContent = "Cantidad";
    headerRow.appendChild(quantityHeader);

    const unitpriceHeader = document.createElement("th");
    unitpriceHeader.textContent = "Precio unidad";
    headerRow.appendChild(unitpriceHeader);
    
    table.appendChild(headerRow);

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        const Row = document.createElement("tr");

        const product = document.createElement("td");
        product.textContent = element.Productname;
        Row.appendChild(product);

        const quantity = document.createElement("td");
        quantity.textContent = element.Quantity;
        Row.appendChild(quantity);
        
        const unitPrice = document.createElement("td");
        unitPrice.textContent = element.Unitprice;
        Row.appendChild(unitPrice);

        const btnUpdate = document.createElement("button");
        btnUpdate.textContent = "Editar";
        btnUpdate.classList.add('btn-update');
        Row.appendChild(btnUpdate);

        btnUpdate.addEventListener("click", Actualizar);

        function Actualizar(event) {
            event.preventDefault();
            var popup = document.getElementById("popupForm");
        
            const input1 = document.getElementById("userName");
            const input2 = document.getElementById("userPassword");
            const input3 = document.getElementById("userEmail");
            const input4 = document.getElementById("UsersNames");
            const input5 = document.getElementById("userLastnames");
            const input6 = document.getElementById("phoneNumber");
            const input7 = document.getElementById("userRol");
    
            input1.value = element.Username;
            input2.value = element.Userpassword;
            input3.value = element.Email;
            input4.value = element.Names;
            input5.value = element.Lastnames;
            input6.value = element.Phonenumber;
            input7.value = element.Rol,
            //input8.value = element.CREATED_AT;
            popup.style.display = 'block';
        }

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Eliminar';
        btnDelete.classList.add('btn-delete');
        Row.appendChild(btnDelete);

        btnDelete.addEventListener('click', eliminarProducto);

        async function eliminarProducto() {
            try {
                const urlDelete = "http://localhost:3000/api/cart/Delete"
                const data = {
                    ID_Cart: element.ID_Cart,
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

const usernameUpdate = document.getElementById("userName");
const userpasswordUpdate = document.getElementById("userPassword");
const emailUpdate = document.getElementById("userEmail");
const namesUpdate = document.getElementById("UsersNames");
const lastnamesUpdate = document.getElementById("userLastnames");
const phomenumberUpdate = document.getElementById("phoneNumber");
const userrolUpdate = document.getElementById("userRol");

document.getElementById("enviarPopUp").addEventListener('click', updateRegistro);

async function updateRegistro(event) {
    event.preventDefault();
    
        const urlUpdate = "http://localhost:3000/api/login/Update";
        const dataUpdate = {
            Username: usernameUpdate.value,
            Userpassword: userpasswordUpdate.value,
            Email: emailUpdate.value,
            Names: namesUpdate.value,
            Lastnames: lastnamesUpdate.value,
            Phonenumber: phomenumberUpdate.value,
            Rol: userrolUpdate.value,
        };
        console.log(dataUpdate)
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
        console.log(Responses)
        if (Responses.status === 200) {
            alert("Registro editado correctamente")
            getFetch();
        }else {
            alert ("Error de api o al actualizar el registro");
        }
        try {} catch (error) {
        console.log("Error: ", error);
    }
}