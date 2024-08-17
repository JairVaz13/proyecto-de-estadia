document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const username = document.getElementById("login-input-user").value;
      const password = document.getElementById("login-input-password").value;

      // Hacer una petición AJAX para leer el archivo CSV
      fetch('usuarios.csv')
        .then(response => response.text())
        .then(data => {
          // Parsear el CSV
          const rows = data.split('\n').slice(1); // Ignorar la primera fila (encabezados)
          let authenticated = false;

          rows.forEach(row => {
            const [csvUsername, csvPassword] = row.split(',');
            if (username === csvUsername && password === csvPassword) {
              authenticated = true;
            }
          });

          if (authenticated) {
            alert("Inicio de sesión exitoso");
            // Redireccionar a otra página después del inicio de sesión exitoso
            window.location.href = "/panel/panel.html";
          } else {
            alert("Nombre de usuario o contraseña incorrectos");
          }
        })
        .catch(error => {
          console.error('Error al leer usuarios.csv:', error);
          alert('Error al intentar iniciar sesión. Inténtelo de nuevo más tarde.');
        });
    });
});
