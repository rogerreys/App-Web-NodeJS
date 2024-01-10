document.addEventListener('DOMContentLoaded', function () {
    let url_products = "http://localhost:3000/api/auth/login"

    // Llama a tu función principal o inicializa tu módulo aquí
    login(url_products);
});

function login(url){
    document.getElementById('login').addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const formData = new FormData(this);

        // Realizar una solicitud POST a la API
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then(response => response.json())
        .then(data => {
            // Puedes agregar aquí lógica adicional después de guardar el producto
            alert('Inicio session correctamente');
            console.log('Producto guardado:', data);
        })
        .catch(error => console.error('Error al guardar el producto:', error));
    });

}