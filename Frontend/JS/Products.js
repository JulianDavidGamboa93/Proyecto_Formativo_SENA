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

                // Adjuntar elementos a sus respectivos padres
                starsDiv.appendChild(stars);
                description.appendChild(prodType);
                description.appendChild(prodTitle);
                description.appendChild(starsDiv);
                description.appendChild(prodPrice);
                producto.appendChild(img);
                producto.appendChild(description);
                producto.appendChild(prodCart);

                proContainer.appendChild(producto);

                contador++;
            }
        });
} catch (error) {
    console.log(error);
}
