const tablaUsuarios = document.querySelector('#table');
getFetch();

async function getFetch() {
    var popup = document.getElementById("popupForm");
    popup.style.display = 'none';

    try {
        const url = "http://localhost:3000/api/invoice";
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

    const adressHeader = document.createElement("th");
    adressHeader.textContent = "Direccion";
    headerRow.appendChild(adressHeader)

    const productHeader = document.createElement("th");
    productHeader.textContent = "Producto";
    headerRow.appendChild(productHeader)

    const priceHeader = document.createElement("th");
    priceHeader.textContent = "Precio";
    headerRow.appendChild(priceHeader)

    const quantityHeader = document.createElement("th");
    quantityHeader.textContent = "Cantidad";
    headerRow.appendChild(quantityHeader)

    const totalpriceHeader = document.createElement("th");
    totalpriceHeader.textContent = "Total";
    headerRow.appendChild(totalpriceHeader)



    const statusHeader = document.createElement("th");
    statusHeader.textContent = "Estado";
    headerRow.appendChild(statusHeader);

    const refundHeader = document.createElement("th");
    refundHeader.textContent = "Reembolso";
    headerRow.appendChild(refundHeader);


    table.appendChild(headerRow);

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const Row = document.createElement("tr");

        const fullName = document.createElement("td");
        fullName.textContent = element.Fullname;
        Row.appendChild(fullName);

        const AddressUser = document.createElement("td");
        AddressUser.textContent = element.userAddress;
        Row.appendChild(AddressUser);

        const ProductUser = document.createElement("td");
        ProductUser.textContent = element.Product;
        Row.appendChild(ProductUser);

        const ProductPrice = document.createElement("td");
        ProductPrice.textContent = element.Price;
        Row.appendChild(ProductPrice)

        const ProductQuantity = document.createElement("td");
        ProductQuantity.textContent = element.Quantity;
        Row.appendChild(ProductQuantity)

        const ProductTotal = document.createElement("td");
        ProductTotal.textContent = element.TotalPrice;
        Row.appendChild(ProductTotal)

        const statusUser = document.createElement("td");
        statusUser.textContent = element.Shipping;
        Row.appendChild(statusUser);

        const refundUser = document.createElement("td");
        refundUser.textContent = element.Refund;
        Row.appendChild(refundUser);



        const btnUpdate = document.createElement("button");
        btnUpdate.textContent = "Actualizar";
        btnUpdate.classList.add('btn-update');
        Row.appendChild(btnUpdate);

        btnUpdate.addEventListener("click", Actualizar);

        function Actualizar(event) {
            event.preventDefault();
            var popup = document.getElementById("popupForm");
            const input1 = document.getElementById("Fullname");
            const input2 = document.getElementById("Address");
            const input3 = document.getElementById('Product');
            const input4 = document.getElementById('Price');
            const input5 = document.getElementById('Quantity');
            const input6 = document.getElementById('Total');
            const input7 = document.getElementById("userStatus");
            const input8 = document.getElementById("userRefund");

            input1.value = element.Fullname;
            input2.value = element.userAddress;
            input3.value = element.Product;
            input4.value = element.Price;
            input5.value = element.Quantity;
            input6.value = element.TotalPrice;
            input7.value = element.Shipping;
            input8.value = element.Refund;
            popup.style.display = 'block';
        }

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Eliminar';
        btnDelete.classList.add('btn-delete');
        Row.appendChild(btnDelete);

        btnDelete.addEventListener('click', eliminarRegistro);

        async function eliminarRegistro() {
            try {
                const urlDelete = "http://localhost:3000/api/invoice/Delete"
                const data = {
                    ID_Invoice: element.ID_Invoice,
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
                } else {
                    alert("Error de api o ningun registro encontrado");
                }
            } catch (error) {

            }
        }

        table.appendChild(Row);

    }
    document.body.table?.appendChild(table);
}

const fullnameUpdate = document.getElementById("Fullname");
const addressUpdate = document.getElementById("Address");
const productUpdate = document.getElementById('Product');
const priceUpdate = document.getElementById('Price');
const quantityUpdate = document.getElementById('Quantity');
const totalUpdate = document.getElementById('Total');
const statusUpdate = document.getElementById("userStatus");
const refundUpdate = document.getElementById("userRefund");

document.getElementById("enviarPopUp").addEventListener('click', updateRegistro);

async function updateRegistro(event) {
    event.preventDefault();
    try {
        const urlUpdate = "http://localhost:3000/api/invoice/Update";
        const dataUpdate = {
            Fullname: fullnameUpdate.value,
            userAddress: addressUpdate.value,
            Product: productUpdate.value,
            Price: priceUpdate.value,
            Quantity: quantityUpdate.value,
            TotalPrice: totalUpdate.value,
            Shipping: statusUpdate.value,
            Refund: refundUpdate.value,
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
        } else {
            alert("Error de api o al actualizar el registro");
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}