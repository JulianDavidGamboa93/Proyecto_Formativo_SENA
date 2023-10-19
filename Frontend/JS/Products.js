document.addEventListener('DOMContentLoaded', () => {
    const proContainer = document.querySelector('.pro-container');
    const tableCart = document.querySelector('.table-cart');

    // Objeto para almacenar la cantidad de cada producto en el carrito
    const cartItems = {};

    fetch('../Products/data.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            datos.forEach(productoData => {
                const producto = createProductElement(productoData);
                proContainer.appendChild(producto);

                const prodCart = producto.querySelector('.cart');
                prodCart.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = prodCart.getAttribute('data-product-id');
                    const productName = productoData.nombre;

                    // Verifica si ya existe un producto con el mismo nombre en el carrito
                    if (cartItems[productId]) {
                        cartItems[productId].cantidad++;
                    } else {
                        cartItems[productId] = {
                            productoData,
                            cantidad: 1
                        };
                    }

                    // Actualiza la tabla del carrito
                    updateCartTable();

                    alert('Producto agregado al carrito');
                });
            });
        })
        .catch(error => {
            console.log(error);
        });

    function createProductElement(productoData) {
        const producto = document.createElement('div');
        producto.classList.add('pro');

        const img = document.createElement('img');
        img.classList.add('prod-img');
        img.setAttribute('src', productoData.imagenSrc);

        const description = document.createElement('div');
        description.classList.add('des');

        const prodType = document.createElement('span');
        prodType.classList.add('prod-type');
        prodType.textContent = productoData.tipo;

        const prodTitle = document.createElement('h5');
        prodTitle.classList.add('prod-title');
        prodTitle.textContent = productoData.nombre;

        const starsDiv = document.createElement('div');
        starsDiv.classList.add('star');

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fa-solid', 'fa-star', 'stars');
            starsDiv.appendChild(star);
        }

        const prodPrice = document.createElement('h4');
        prodPrice.classList.add('prod-price');
        prodPrice.textContent = productoData.precio + "$ COP";

        const prodCart = document.createElement('a');
        prodCart.classList.add('cart');
        prodCart.setAttribute('data-product-id', productoData.id);

        const cartIcon = document.createElement('i');
        cartIcon.classList.add('fa-solid', 'fa-cart-arrow-down');

        description.appendChild(prodType);
        description.appendChild(prodTitle);
        description.appendChild(starsDiv);
        description.appendChild(prodPrice);
        producto.appendChild(img);
        producto.appendChild(description);
        producto.appendChild(prodCart);
        prodCart.appendChild(cartIcon);

        return producto;
    }

    function updateCartTable() {
        // Borra todas las filas actuales en la tabla, pero no los encabezados
        while (tableCart.children.length > 1) {
            tableCart.removeChild(tableCart.lastChild);
        }

        // Recorre el objeto cartItems y agrega las filas actualizadas a la tabla
        for (const productId in cartItems) {
            if (cartItems.hasOwnProperty(productId)) {
                const { productoData, cantidad } = cartItems[productId];
                const tr = createTableRow(productoData, cantidad);
                tableCart.appendChild(tr);
            }
        }
    }

    function createTableRow(productoData, cantidad) {
        const tr = document.createElement('tr');

        const tdNames = document.createElement('td');
        tdNames.classList.add('objt-tb');
        tdNames.textContent = productoData.nombre;

        const tdPrices = document.createElement('td');
        tdPrices.classList.add('objt-tb');
        tdPrices.textContent = productoData.precio;

        const tdQuantity = document.createElement('td');
        tdQuantity.classList.add('objt-tb');
        tdQuantity.textContent = cantidad; // Mostrar la cantidad actualizada

        const tdGrams = document.createElement('td');
        tdGrams.classList.add('objt-tb');
        tdGrams.textContent = productoData.gramos;

        const tdBeans = document.createElement('td');
        tdBeans.classList.add('objt-tb');
        tdBeans.textContent = productoData.grano;

        tr.appendChild(tdNames);
        tr.appendChild(tdPrices);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdGrams);
        tr.appendChild(tdBeans);

        return tr;
    }


    // Agrega un evento click al botón con clase "proceed-btn"
const proceedBtn = document.querySelector('.proceed-btn');
proceedBtn.addEventListener('click', () => {
    // Obtén los datos de la tabla y conviértelos en un objeto
    const cartData = {};
    const tableRows = tableCart.querySelectorAll('tr');

    tableRows.forEach((row, index) => {
        console.log(tableRows);
        console.log(row, index);
        if (index !== 0) {
            const cells = row.querySelectorAll('td');
            const productName = cells[0].textContent; // Agrega esta línea
            const productPrice = cells[1].textContent;
            const productQuantity = cells[2].textContent;
            const productGrams = cells[3].textContent; // Agrega esta línea
            const productGrain = cells[4].textContent; // Agrega esta línea
            console.log(cartData[productName]);
            cartData[productName] = {
                price: productPrice,
                quantity: productQuantity,
                grams: productGrams,
                grain: productGrain
            };
        }
    });

    // Convierte los datos en una cadena JSON para pasarlos a la siguiente página
    const cartDataJSON = JSON.stringify(cartData);

    // Redirige al usuario a UserCart.html con los datos en la URL
    window.location.href = `UserCart.html?cartData=${encodeURIComponent(cartDataJSON)}`;
});




});

