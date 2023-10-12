const nombreCompleto = document.getElementById('fullname');
const direccionUsuario = document.getElementById('Address');

document.getElementById('EnivarPedido').addEventListener('click', RegistroCompra);

async function RegistroCompra(event) {
    event.preventDefault();
    try {
        const url = "http://localhost:3000/api/invoice/Insert";
        const data = {
            Fullname: nombreCompleto.value,
            userAddress: direccionUsuario.value
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
        console.log(data);
        if (Responses.status === 200) {
            alert('El pedido ha sido exitoso, el vendedor se comunicara con usted para acordar el metodo de pago y el metodo de envio');
            window.open('indexUsers.html', '_self');
        }else {
            alert('Error de api o de codigo');
        }
    } catch (error) {

    }
}