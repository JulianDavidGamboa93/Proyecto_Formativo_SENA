const proContainer = document.querySelector('.pro-container');
const tableCart = document.querySelector('.table-cart');

try {
    fetch('../Products/data.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            let contador = 0;
            while (datos.length > contador) {

                let producto = document.createElement('div');
                let img = document.createElement('img');
                let description = document.createElement('div');
                let prodType = document.createElement('span');
                let prodTitle = document.createElement('h5');
                let starsDiv = document.createElement('div');
                let stars = document.createElement('i');
                let prodPrice = document.createElement('h4');
                let prodCart = document.createElement('a');
                let cartIcon = document.createElement('i');

                producto.setAttribute('class', 'pro');
                img.setAttribute('class', 'prod-img');
                img.setAttribute('src', datos[contador].imagenSrc);
                description.setAttribute('class', 'des');
                prodType.setAttribute('class', 'prod-type');
                prodType.innerHTML = datos[contador].tipo;
                prodTitle.setAttribute('class', 'prod-title');
                prodTitle.innerHTML = datos[contador].nombre;
                starsDiv.setAttribute('class', 'star');
                stars.setAttribute('class', 'fa-solid fa-star stars');
                prodPrice.setAttribute('class', 'prod-price');
                prodPrice.innerHTML = datos[contador].precio + "$ COP";
                prodCart.setAttribute('class', 'cart');
                prodCart.setAttribute('data-product-id', contador);
                cartIcon.setAttribute('class', 'fa-solid fa-cart-arrow-down');

                for (let i = 0; i < 5; i++) {
                    // Crea un elemento <i> (que generalmente se usa para íconos en Font Awesome)
                    const star = document.createElement('i');
                    
                    // Establece las clases para la estrella
                    star.setAttribute('class', 'fa-solid fa-star stars');
                    
                    // Agrega la estrella al elemento 'starsDiv'
                    starsDiv.appendChild(star);
                }

                // Adjuntar elementos a sus respectivos padres
                description.appendChild(prodType);
                description.appendChild(prodTitle);
                description.appendChild(starsDiv);
                description.appendChild(prodPrice);
                producto.appendChild(img);
                producto.appendChild(description);
                producto.appendChild(prodCart);
                prodCart.appendChild(cartIcon);

                proContainer.appendChild(producto);

                prodCart.addEventListener('click', (e) => {
                    e.preventDefault();
                    let tdGen = document.querySelectorAll('.objt-tb');
                
                    const productId = e.currentTarget.getAttribute('data-product-id');
                    const productName = datos[productId].nombre;
                
                    // Verifica si ya existe un producto con el mismo nombre en la tabla
                    let productoRepetido = false;
                    tdGen.forEach((element) => {
                        if (element.innerHTML === productName) {
                            alert('El producto ya ha sido agregado al carrito');
                            productoRepetido = true;
                        }
                    });
                
                    if (!productoRepetido) {
                        const tr = document.createElement('tr');
                        const tdNames = document.createElement('td');
                        const tdPrices = document.createElement('td');
                        const tdQuantity = document.createElement('td');
                        const tdGrams = document.createElement('td');
                        const tdBeans = document.createElement('td');
                
                        tdNames.setAttribute('class', 'objt-tb');
                        tdPrices.setAttribute('class', 'objt-tb');
                
                        tdNames.innerHTML = datos[productId].nombre;
                        tdPrices.innerHTML = datos[productId].precio;
                        tdQuantity.innerHTML = datos[productId].cantidad;
                        tdGrams.innerHTML = datos[productId].gramos;
                        tdBeans.innerHTML = datos[productId].grano;
                
                        tr.appendChild(tdNames);
                        tr.appendChild(tdPrices);
                        tr.appendChild(tdQuantity);
                        tr.appendChild(tdGrams);
                        tr.appendChild(tdBeans);
                        tableCart.appendChild(tr);
                    }
                });
                contador++;
            }
        });
} catch (error) {
    console.log(error);
}
