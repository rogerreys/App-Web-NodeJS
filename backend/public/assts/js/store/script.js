document.addEventListener('DOMContentLoaded', function () {
    // Llama a tu función principal o inicializa tu módulo aquí
    get_api_products();
});

function get_api_products(){
    fetch(`http://localhost:3000/api/store/products`)
        .then(response => response.json())
        .then(data => {
            // Obtener el contenedor donde se agregarán los elementos "item"
            const container = document.getElementById('container-items');
            // Obtener el div con clase 'row' dentro del contenedor
            const rowDiv = container.querySelector('.row');

            data.message.forEach(element => {

                const item = document.createElement('div');
                item.classList.add('col-4');
                
                item.innerHTML = `
                    <figure>
                        <img src="${element.img}" alt="${element.name}">
                    </figure>
                    <div class="info-product">
                        <h2>${element.name}</h2>
                        <p class="price">$${element.price}</p>
                        <h4>Descripcion</h4>
                        <p>${element.describe_product}</p>
                        <hr>
                        <p>Categoría: ${element.catalog_product}</p>
                        <button>Añadir al carrito</button>
                    </div>
                `;
                // Agregar el nuevo elemento "item" al contenedor
                rowDiv.appendChild(item);
            });
        })
        .catch(error => console.error('Error al obtener datos desde la API:', error));

}