document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const response = await fetch("https://api1-estadia.onrender.com/contacts/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone, message })
    });

    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = "";

    if (response.ok) {
        const alertSuccess = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Contacto creado exitosamente.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        alertContainer.innerHTML = alertSuccess;
        document.getElementById("contactForm").reset();
    } else {
        const alertError = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Error al crear el contacto.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        alertContainer.innerHTML = alertError;
    }
});
