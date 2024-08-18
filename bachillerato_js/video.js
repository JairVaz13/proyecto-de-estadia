document.addEventListener('DOMContentLoaded', fetchVideos);

// Fetch videos and add them to the carousel
async function fetchVideos() {
    const response = await fetch('https://api1-estadia.onrender.com/videos/');
    const videos = await response.json();
    const carouselInner = document.getElementById('carouselVideos');

    carouselInner.innerHTML = '';
    videos.forEach((video, index) => {
        const isActive = index === 0 ? 'active' : '';
        const videoItem = document.createElement('div');
        videoItem.className = `carousel-item ${isActive}`;
        videoItem.innerHTML = `
            <div class="video-container position-relative">
                <video id="video-${video.id}" class="d-block w-100" controls>
                    <source src="https://api1-estadia.onrender.com/videos/${video.id}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <button class="btn btn-primary fullscreen-btn position-absolute" onclick="openFullscreen(${video.id})">Pantalla Completa</button>
            </div>
            <div class="carousel-caption d-none d-md-block">
                <h5>${video.title}</h5>
            </div>
        `;
        carouselInner.appendChild(videoItem);
    });

    // Center the fullscreen button at the top
    const buttons = document.querySelectorAll('.fullscreen-btn');
    buttons.forEach(button => {
        button.style.top = '10px';
        button.style.left = '50%';
        button.style.transform = 'translateX(-50%)';
    });
}

// Open video in fullscreen
function openFullscreen(videoId) {
    const video = document.getElementById(`video-${videoId}`);
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
}
