document.addEventListener('DOMContentLoaded', function () {
    let url_products = "http://localhost:3000/api/store/products"
    init();
    // Llama a tu función principal o inicializa tu módulo aquí
    get_api_products(url_products);
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
                item.classList.add('col-3');
                // Central los card
                item.classList.add('d-flex');
                item.classList.add('justify-content-center');
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
    }
}
async function init() {
    let data = {}
    token = get_toke();
    if (token) {
        data = await get_authentication(token);
    }
    get_menu(data);
}
function get_toke() {
    // Obtener token desde localStorage
    return localStorage.getItem('secure token')
}
async function get_authentication(accessToken) {
    const apiUrl = "http://localhost:3000/api/auth/decode";
    // Configuración de la solicitud
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            // Puedes agregar otros encabezados según sea necesario
        }
    };
    let res;

    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta exitosa aquí
            res = data.message;
        })
        .catch(error => {
            // Manejar errores aquí
            res = `Error en la solicitud: ${error}`;
        });
    return res;
}

function get_menu(data) {
    const container = document.querySelector('.dropdown-menu');

    if (data.username) {
        container.appendChild(list_menu("#", `Bienvenido '${data.username}'`))
        container.appendChild(list_menu(null, null, true))
    }
    else {
        container.appendChild(list_menu("http://localhost:3000/login/auth", "Iniciar sesion"))
    }
    container.appendChild(list_menu("#", "Catalogos"));
}

function list_menu(ref, msg, sep = false) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const hr = document.createElement('hr');

    if (sep) {
        // <li><hr class="dropdown-divider"></li>
        hr.classList.add('dropdown-divider');
        li.appendChild(hr)
    } else {
        a.classList.add('dropdown-item');
        a.setAttribute("href", ref)
        a.textContent = msg
        li.appendChild(a)
    }

    return li
}