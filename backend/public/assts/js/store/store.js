document.addEventListener('DOMContentLoaded', function () {
    let url_products = "http://localhost:3000/api/store/products"

    // Llama a tu función principal o inicializa tu módulo aquí
    get_api_products(url_products);
    // get_api_products_catalog_by(1)
    //     .then(res => {
    //         var str = `<button type="button" class="btn btn-success">${res}</button>`
    //     })

});

function get_api_products(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener el contenedor donde se agregarán los elementos "item"
            const container = document.getElementById('container-items');
            // Obtener el div con clase 'row' dentro del contenedor
            const rowDiv = container.querySelector('.row');

            let catalog;

            data.message.forEach(element => {

                const item = document.createElement('div');
                item.classList.add('col-4');
                // Api Catalogos
                get_api_products_catalog_by(element.catalog_product).then(res => {
                    item.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <img src="${element.img}" class="card-img-top custom-image" alt="${element.name}">
                            <div class="card-body">
                                <h5 class="card-title">${element.name}</h5>
                                <p class="card-text">$${element.price}</p>
                                <p class="card-text">${element.describe_product}</p>
                                <button type="button" class="btn btn-success">${res}</button>
                                <a href="#" class="btn btn-primary">Añadir al carrito</a>
                            </div>
                        </div>
                    `;
                });
                
                // Agregar el nuevo elemento "item" al contenedor
                rowDiv.appendChild(item);
            });
        })
        .catch(error => console.error('Error al obtener datos desde la API:', error));

}

async function get_api_products_catalog_by(id) {
    let url_products_cat = `http://localhost:3000/api/store/products_catalog/${String(id)}`
    try {
        const resp = await fetch(url_products_cat);
        const data = await resp.json();
        return data.message[0].name
    } catch (error) {
        console.error('Error al obtener datos desde la API:', error);
        return "";
        // throw error; // Propaga el error para que pueda ser manejado externamente si es necesario                
    }
}