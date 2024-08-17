const NEWS_API_URL = 'http://localhost:8000/news';
const VIDEOS_API_URL = 'http://localhost:8000/videos';
const NEWS_PER_PAGE = 4;
const VIDEOS_PER_PAGE = 3;
let currentNewsPage = 1;
let currentVideoPage = 0;
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

async function fetchVideos(page = 0) {
    const skip = page * VIDEOS_PER_PAGE;
    try {
        const response = await fetch(`${VIDEOS_API_URL}?skip=${skip}&limit=${VIDEOS_PER_PAGE}`);
        const videos = await response.json();
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.innerHTML = '';
        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class="card video-card">
                    <video class="card-img-top" controls>
                        <source src="${video.video_url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <p class="card-text">${video.description}</p>
                    </div>
                </div>
            `;
            videoGrid.appendChild(card);
        });
        document.getElementById('prevPage').disabled = page === 0;
        document.getElementById('nextPage').disabled = videos.length < VIDEOS_PER_PAGE;
    } catch (error) {
        console.error('Error:', error);
    }
}

function changeVideoPage(delta) {
    currentVideoPage += delta;
    fetchVideos(currentVideoPage);
}

fetchNews();
fetchVideos(currentVideoPage);