// Fetch news articles based on category 
async function fetchNews(category) {
    let url = '';
    const apiKey = 'a99ee6c059282c7aa3e69e880de401c5'; // Use your Mediastack API key here

    switch (category) {
        case 'politics':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=politics&languages=en`;
            break;
        case 'sports':
            // Use Mediastack API for sports category
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=sports&languages=en`;
            break;
        case 'entertainment':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=entertainment&languages=en`;
            break;
        case 'tech':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=technology&languages=en`;
            break;
        case 'general':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en`;
            break;
        case 'health':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=health&languages=en`;
            break;
        case 'stock':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=business&languages=en`;
            break;
        default:
            console.error('Invalid category');
            return;
    }

    try {
        // Fetch the news data
        const response = await fetch(url);

        // Log the raw response for debugging
        console.log('API Response:', response);

        // If the response is ok, parse the JSON
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched data:', data); // Log the fetched data

            // Check if articles are returned
            if (data.data && data.data.length > 0) {
                displayNews(data.data, category);
            } else {
                console.error('No articles found or invalid data format');
            }
        } else {
            console.error('Failed to fetch news:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Function to display the fetched news articles
function displayNews(articles, category) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear previous content

    // Create a title for the category
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    newsContainer.appendChild(categoryTitle);

    // Loop through the articles and create HTML elements to display them
    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');

        const title = document.createElement('h3');
        title.textContent = article.title;
        articleDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';
        articleDiv.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        link.target = '_blank';
        articleDiv.appendChild(link);

        // Append the article to the news container
        newsContainer.appendChild(articleDiv);
    });
}

// Event listener for category click
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        fetchNews(category);
    });
});
