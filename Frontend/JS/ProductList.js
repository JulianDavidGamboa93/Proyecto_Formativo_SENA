const tablaUsuarios = document.querySelector('#table');
getFetch();

async function getFetch() {
    var popup = document.getElementById("popupForm");
    popup.style.display = 'none';

    try {
        const url = "http://localhost:3000/api/products";
        const response = await fetch(url);
        const data = await response.json();
        showFetch(data.data);
    } catch (error) {
    }
}

function showFetch(data) {
    table.innerHTML = "";

    const headerRow = document.createElement("tr");

    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Producto";
    headerRow.appendChild(nameHeader);

    const priceHeader = document.createElement("th");
    priceHeader.textContent = "Precio";
    headerRow.appendChild(priceHeader);

    const beanHeader = document.createElement("th");
    beanHeader.textContent = "Grano";
    headerRow.appendChild(beanHeader);

    const stockHeader = document.createElement("th");
    stockHeader.textContent = "Stock";
    headerRow.appendChild(stockHeader);

    
    table.appendChild(headerRow);

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        const Row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.textContent = element.Productname;
        Row.appendChild(productName);

        const priceProduct = document.createElement("td");
        priceProduct.textContent = element.Price;
        Row.appendChild(priceProduct);
        
        const beanProduct = document.createElement("td");
        beanProduct.textContent = element.Beantype;
        Row.appendChild(beanProduct);

        const stockHeader = document.createElement("td");
        stockHeader.textContent = element.Stock;
        Row.appendChild(stockHeader);


        const btnUpdate = document.createElement("button");
        btnUpdate.textContent = "Actualizar";
        btnUpdate.classList.add('btn-update');
        Row.appendChild(btnUpdate);

        btnUpdate.addEventListener("click", Actualizar);

        function Actualizar(event) {
            event.preventDefault();
            var popup = document.getElementById("popupForm");
            
            const input1 = document.getElementById("nameProduct");
            const input2 = document.getElementById("priceProduct");
            const input3 = document.getElementById("beansProduct");
            const input4 = document.getElementById("stockProduct");;
            

            //input1.value = element.ID_Login;
            input1.value = element.Productname;
            input2.value = element.Price;
            input3.value = element.Beantype;
            input4.value = element.Stock;
            
            popup.style.display = 'block';
        }

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Eliminar';
        btnDelete.classList.add('btn-delete');
        Row.appendChild(btnDelete);

        btnDelete.addEventListener('click', eliminarRegistro);

        async function eliminarRegistro() {
            try {
                const urlDelete = "http://localhost:3000/api/products/Delete"
                const data = {
                    ID_Products: element.ID_Products,
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

const productUpdate = document.getElementById("nameProduct");
const priceUpdate = document.getElementById("priceProduct");
const beanUpdate = document.getElementById("beansProduct");
const stockUpdate = document.getElementById("stockProduct");


document.getElementById("enviarPopUp").addEventListener('click', updateRegistro);

async function updateRegistro(event) {
    event.preventDefault();
    
        const urlUpdate = "http://localhost:3000/api/products/Update";
        const dataUpdate = {
            Productname: productUpdate.value,
            Price: priceUpdate.value,
            Beantype: beanUpdate.value,
            Stock: stockUpdate.value,
            
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