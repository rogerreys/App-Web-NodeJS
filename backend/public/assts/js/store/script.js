document.addEventListener('DOMContentLoaded', function () {
    // Llama a tu función principal o inicializa tu módulo aquí
    getApi();
});

function get_api_products(){
    fetch(`http://localhost:3000/api/store/products`)
        .then(response => response.json())
        .then(data => {
            // Obtener el contenedor donde se agregarán los elementos "item"
            const container = document.getElementById('container-items');
            
            data.message.forEach(element => {
                console.log("url: "+ element.img,"name: "+ element.name,"price"+ element.price)

                const item = document.createElement('div');
                item.classList.add('item');
                
                item.innerHTML = `
                    <figure>
                        <img src="${element.img}" alt="${element.name}">
                    </figure>
                    <div class="info-product">
                        <h2>${element.name}</h2>
                        <p class="price">$${element.price}</p>
                        <button>Añadir al carrito</button>
                    </div>
                `;                

                // Agregar el nuevo elemento "item" al contenedor
                container.appendChild(item);
            });
        })
        .catch(error => console.error('Error al obtener datos desde la API:', error));

}