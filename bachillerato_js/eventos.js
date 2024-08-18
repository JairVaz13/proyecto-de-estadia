let paginaActual = 1;
const eventosPorPagina = 2;

async function obtenerEventos() {
    const skip = (paginaActual - 1) * eventosPorPagina;
    const response = await fetch(`https://api1-estadia.onrender.com/eventos?skip=${skip}&limit=${eventosPorPagina}`);
    const eventos = await response.json();
    const container = document.getElementById('eventos-container');
    container.innerHTML = '';
    eventos.forEach(evento => {
        const eventoDiv = document.createElement('div');
        eventoDiv.classList.add('card', 'mb-3');
        eventoDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${evento.titulo}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Fecha y Hora: ${evento.fecha} | ${evento.hora}</h6>
                <p class="card-text">${evento.descripcion}</p>
                <p class="card-text">Ubicación: <small class="text-muted">${evento.ubicacion}</small></p>
            </div>
        `;
        container.appendChild(eventoDiv);
    });
}

function cambiarPagina(direccion) {
    if (direccion === 'next') {
        paginaActual++;
    } else if (direccion === 'prev' && paginaActual > 1) {
        paginaActual--;
    }
    obtenerEventos();
}

document.addEventListener('DOMContentLoaded', obtenerEventos);
