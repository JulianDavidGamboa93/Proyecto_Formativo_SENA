document.addEventListener('DOMContentLoaded', () => {
    // ... (tu código existente aquí)

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
        pdf.text(`Grand Total: ${grandTotal}`, 14, pdf.autoTable.previous.finalY + 10);

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
