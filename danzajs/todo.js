const NEWS_API_URL = 'https://api2-estadia.onrender.com/news';
const NEWS_PER_PAGE = 4;
let currentNewsPage = 1;
let totalNewsPages = 1;

function fetchNews() {
    fetch(NEWS_API_URL)
        .then(response => response.json())
        .then(data => {
            totalNewsPages = Math.ceil(data.length / NEWS_PER_PAGE);
            displayNews(data);
            setupNewsPagination();
        });
}

function displayNews(newsData) {
    const start = (currentNewsPage - 1) * NEWS_PER_PAGE;
    const end = start + NEWS_PER_PAGE;
    const newsToDisplay = newsData.slice(start, end);

    let newsHtml = '<ul class="list-group">';
    newsToDisplay.forEach(news => {
        newsHtml += `
            <li class="list-group-item">
                <h5>${news.title}</h5>
                <p>${news.description}</p>
                <small>${news.date}</small>
            </li>
        `;
    });
    newsHtml += '</ul>';

    document.getElementById('newsList').innerHTML = newsHtml;
}

function setupNewsPagination() {
    const paginationHtml = [];

    if (currentNewsPage > 1) {
        paginationHtml.push(`<li class="page-item"><a class="page-link" href="#" onclick="changeNewsPage(${currentNewsPage - 1})">Anterior</a></li>`);
    }

    for (let i = 1; i <= totalNewsPages; i++) {
        paginationHtml.push(`
            <li class="page-item ${i === currentNewsPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeNewsPage(${i})">${i}</a>
            </li>
        `);
    }

    if (currentNewsPage < totalNewsPages) {
        paginationHtml.push(`<li class="page-item"><a class="page-link" href="#" onclick="changeNewsPage(${currentNewsPage + 1})">Siguiente</a></li>`);
    }

    document.getElementById('pagination').innerHTML = paginationHtml.join('');
}

function changeNewsPage(pageNumber) {
    currentNewsPage = pageNumber;
    fetchNews();
}

fetchNews();
