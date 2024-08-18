async function loadImages() {
    try {
        const response = await fetch('https://api1-estadia.onrender.com/images');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const images = data.images;

        if (images.length === 0) {
            console.error("No images found");
            return;
        }

        const indicators = document.querySelector('.carousel-indicators');
        const inner = document.querySelector('.carousel-inner');
        
        images.forEach((image, index) => {
            // Create indicator
            const indicator = document.createElement('li');
            indicator.setAttribute('data-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-slide-to', index);
            if (index === 0) indicator.classList.add('active');
            indicators.appendChild(indicator);
            
            // Create carousel item
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if (index === 0) item.classList.add('active');
            
            const img = document.createElement('img');
            img.src = `https://api1-estadia.onrender.com${image.url}`;
            img.classList.add('d-block', 'w-100');
            
            item.appendChild(img);
            inner.appendChild(item);
        });

        console.log("Images loaded successfully");
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

loadImages();