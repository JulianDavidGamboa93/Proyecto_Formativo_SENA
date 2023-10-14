let grandTotal = 0;
document.addEventListener('DOMContentLoaded', () => {


    const urlParams = new URLSearchParams(window.location.search);
    const cartDataJSON = urlParams.get('cartData');
    const cartData = JSON.parse(decodeURIComponent(cartDataJSON));

    const cartTable = document.getElementById('cart-table');
    const tbody = cartTable.querySelector('tbody');

    const totalTable = document.getElementById('total-table');
    const totalTbody = totalTable.querySelector('tbody');

    
    console.log(cartDataJSON);
    for (const productName in cartData) {
        if (cartData.hasOwnProperty(productName)) {
            const product = cartData[productName];
            const row = document.createElement('tr');

            const productNameCell = document.createElement('td');
            productNameCell.textContent = productName;

            const productPriceCell = document.createElement('td');
            productPriceCell.textContent = product.price;

            const productQuantityCell = document.createElement('td');
            productQuantityCell.textContent = product.quantity;

            const totalPriceCell = document.createElement('td');
            const totalPrice = product.price * product.quantity;
            totalPriceCell.textContent = totalPrice;
            grandTotal += totalPrice;

            row.appendChild(productNameCell);
            row.appendChild(productPriceCell);
            row.appendChild(productQuantityCell);
            row.appendChild(totalPriceCell);

            tbody.appendChild(row);
        }
    }

    // Agregar la fila para mostrar el gran total
    const totalRow = document.createElement('tr');
    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'Total';
    totalLabelCell.setAttribute('colspan', '3');
    totalRow.appendChild(totalLabelCell);

    const grandTotalCell = document.createElement('td');
    grandTotalCell.textContent = grandTotal;
    totalRow.appendChild(grandTotalCell);

    totalTbody.appendChild(totalRow);
});

const nombreCompleto = document.getElementById('fullname');
const direccionUsuario = document.getElementById('Address');
const urlParams = new URLSearchParams(window.location.search);
const cartDataJSON = urlParams.get('cartData');
    const cartData = JSON.parse(decodeURIComponent(cartDataJSON));

document.getElementById('EnivarPedido').addEventListener('click', RegistroCompra);

async function RegistroCompra(event) {
    event.preventDefault();
    for (const productName in cartData) {
        if (cartData.hasOwnProperty(productName)) {
            console.log("Aqui estoy");
            const _invoice = cartData[productName];
            console.log(_invoice);
           
                const url = "http://localhost:3000/api/invoice/Insert";
                const data = {
                    Fullname: nombreCompleto.value,
                    userAddress: direccionUsuario.value,
                    Product: productName,
                    Price: _invoice.price,
                    Quantity: _invoice.quantity,
                    TotalPrice: grandTotal
                };
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                };
                const getFetch = await fetch(url, requestOptions)
                const Responses = await getFetch.json();
                console.log(Responses);
                if (Responses.status === 200) {
                    alert('El pedido ha sido exitoso, el vendedor se comunicara con usted para acordar el metodo de pago y el metodo de envio');
                    window.open('indexUsers.html', '_self');
                }else {
                    alert('Error de api o de codigo');
                }
                try {} catch (error) {
        
            }
        }
    }
    
}
