const fetchAnuncios = async (page = 1) => {
    try {
        const response = await fetch(`https://api3-estadia.onrender.com/anuncios?page=${page}&size=4`);
        if (!response.ok) throw new Error('Error en la solicitud');
        const data = await response.json();

        const tbody = document.getElementById('anuncios-body');
        tbody.innerHTML = '';

        data.forEach(anuncio => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${anuncio.titulo}</td>
                <td>${anuncio.descripcion}</td>
                <td>${anuncio.fecha}</td>
            `;
            tbody.appendChild(row);
        });

        updatePagination(page);
    } catch (error) {
        console.error('Error al cargar los anuncios:', error);
    }
};

const updatePagination = (currentPage) => {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pages = [1, 2, 3, 4, 5]; // Asumiendo un máximo de 5 páginas para simplicidad
    pages.forEach(page => {
        const li = document.createElement('li');
        li.className = `page-item ${page === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="fetchAnuncios(${page}); return false;">${page}</a>`;
        pagination.appendChild(li);
    });
};

// Cargar la primera página por defecto
fetchAnuncios();
