document.addEventListener('DOMContentLoaded', function () {
    let url_products = "http://localhost:3000/api/auth/login"
    // Llama a tu función principal o inicializa tu módulo aquí
    login(url_products);
});

function login(url) {
    document.getElementById('login').addEventListener('submit', function (event) {
        event.preventDefault();
        // Obtener los valores del formulario
        const formData = new FormData(this);
        const container = document.querySelector(".container");
        // Realizar una solicitud POST a la API
        console.log("formData:", formData)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    // Almacenar token en localStorage
                    localStorage.setItem('secure token', data.message);
                    // Crear el elemento div y agregarlo al contenedor
                    container.appendChild(message("alert-primary", "Inicio de sesión correctamente"));
                    // Redireccionar a otra página
                    setTimeout(function () {
                        // Redireccionar a otra página
                        window.location.href = 'http://localhost:3000/store/products';
                    }, 2000);
                } else {
                    container.appendChild(message("alert-danger", data.message));
                }
            })
            .catch(error => console.error('Error al guardar el producto:', error));
    });
}

function message(alert, msg) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alert}`; // 'alert alert-primary';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = msg; //'Inicio de sesión correctamente';
    return alertDiv;
}