document.addEventListener('DOMContentLoaded', function () {
    get_catalog();
    // Llama a tu función principal o inicializa tu módulo aquí
    new_api_products();
});

function get_catalog(){
    // Obtener el elemento select
    const categorySelect = document.getElementById('productCategory');

    // Realizar una solicitud GET a la API para obtener las categorías
    fetch('http://localhost:3000/api/store/products_catalog')
        .then(response => response.json())
        .then(data => {
            // Construir dinámicamente las opciones del select
            data.message.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; // Asigna el valor de la categoría
                option.textContent = category.name; // Asigna el texto de la categoría
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener las categorías desde la API:', error));
}

function new_api_products(){
    document.getElementById('productForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const formData = new FormData(this);
        // Agregar un valor adicional al formData
        formData.append('id', Math.floor(Math.random() * 1000));
        
        // Realizar una solicitud POST a la API
        fetch('http://localhost:3000/api/store/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then(response => response.json())
        .then(data => {
            // Puedes agregar aquí lógica adicional después de guardar el producto
            alert('Producto guardado exitosamente!');
            // Redireccionar a otra página
            setTimeout(function () {
                // Redireccionar a otra página
                window.location.href = 'http://localhost:3000/store/products';
            }, 2000);
        })
        .catch(error => console.error('Error al guardar el producto:', error));
    });

}