document.addEventListener('DOMContentLoaded', function () {
    // Llama a tu función principal o inicializa tu módulo aquí
    new_api_products();
});

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
            console.log('Producto guardado:', data);
            // Puedes agregar aquí lógica adicional después de guardar el producto
        })
        .catch(error => console.error('Error al guardar el producto:', error));
    });

}