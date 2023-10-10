

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cartDataJSON = urlParams.get('cartData');
    const cartData = JSON.parse(decodeURIComponent(cartDataJSON));

    const cartTable = document.getElementById('cart-table');
    const tbody = cartTable.querySelector('tbody');

    const totalTable = document.getElementById('total-table');
    const totalTbody = totalTable.querySelector('tbody');

    let grandTotal = 0;

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


    // Agregar un botón para generar el PDF
    const generatePdfButton = document.getElementById('generate-pdf-button');

    generatePdfButton.addEventListener('click', () => {
        // Crear un nuevo objeto jsPDF
        const pdf = new jsPDF();

        // Agregar la tabla de productos al PDF
        pdf.autoTable({
            head: [['Product', 'Price', 'Quantity', 'Total']],
            body: getProductDataForPdf(cartData),
        });

        // Agregar el gran total al PDF
        pdf.text(`Grand Total: $${grandTotal}`, 14, pdf.autoTable.previous.finalY + 10);

        // Guardar el PDF como un archivo descargable
        pdf.save('cart_data.pdf');
    });
});

function getProductDataForPdf(cartData) {
    const data = [];
    for (const productName in cartData) {
        if (cartData.hasOwnProperty(productName)) {
            const product = cartData[productName];
            data.push([productName, product.price, product.quantity, product.price * product.quantity]);
        }
    }
    return data;
}
