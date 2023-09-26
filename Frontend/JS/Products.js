const proContainer = document.querySelector('.pro-container');

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

                contador++;
            }
        });
} catch (error) {
    console.log(error);
}
