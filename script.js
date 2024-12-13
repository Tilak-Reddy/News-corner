// Fetch news articles based on category
async function fetchNews(category) {
    const apiKey = 'a99ee6c059282c7aa3e69e880de401c5'; // Replace with your API key
    let url = '';

    // Define URL based on category
    switch (category) {
        case 'politics':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=politics&languages=en`;
            break;
        case 'sports':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=sports&languages=en`;
            break;
        case 'general':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en`;
            break;
        case 'health':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=health&languages=en`;
            break;
        case 'tech':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=technology&languages=en`;
            break;
        case 'entertainment':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=entertainment&languages=en`;
            break;
        default:
            console.error('Invalid category');
            return;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data);

        if (data.data && data.data.length > 0) {
            displayNews(data.data, category);
        } else {
            console.error('No articles found.');
            document.getElementById('news-container').innerHTML = '<p>No articles available for this category.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
}

// Display the fetched news articles
function displayNews(articles, category) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    newsContainer.appendChild(categoryTitle);

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');

        const title = document.createElement('h3');
        title.textContent = article.title || 'Untitled Article';
        articleDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';
        articleDiv.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url || '#';
        link.textContent = 'Read more';
        link.target = '_blank';
        articleDiv.appendChild(link);

        newsContainer.appendChild(articleDiv);
    });
}

// Add event listener to categories
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = event.target.dataset.category;
        if (category) {
            fetchNews(category);
        } else {
            console.error('No category data found for this link.');
        }
    });
});
