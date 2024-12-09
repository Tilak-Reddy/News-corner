// Fetch news articles based on category 
async function fetchNews(category) {
    let url = '';
    let apiKey = '';

    switch (category) {
        case 'politics':
            apiKey = 'c51e28f22dee429f8536312bb87e4616'; // Example API Key for politics
            url = `https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=${apiKey}`;
            break;
        case 'sports':
            apiKey = 'a99ee6c059282c7aa3e69e880de401c5'; // Example API Key for sports
            url = `https://newsapi.org/v2/top-headlines?category=sports&apiKey=${apiKey}`;
            break;
        case 'entertainment':
            apiKey = 'pub_61364058d1e5d42e8d5feffdc614528ad2269'; // Example API Key for entertainment
            url = `https://newsdata.io/api/1/news?category=entertainment&apikey=${apiKey}`;
            break;
        case 'tech':
            apiKey = 'pub_61702195288cf5cf19a9a0a3ec3e01f9eb71'; // Example API Key for tech
            url = `https://newsdata.io/api/1/news?category=tech&apikey=${apiKey}`;
            break;
        case 'general':
            apiKey = 'bad2353e329d1174bd9a451e07af182'; // Example API Key for general
            url = `https://gnews.io/api/v4/search?q=general&token=${apiKey}`;
            break;
        case 'health':
            apiKey = '1d16725f76aa4e6f8f651c33d428ceb8'; // Example API Key for health
            url = `https://worldnewsapi.com/api/1/news?category=health&apikey=${apiKey}`;
            break;
        case 'stock':
            apiKey = 'ZM6Vfu42UZS4TdqfFPKGRp9MaEhZq6H4'; // Example API Key for stock market
            url = `https://financialmodelingprep.com/api/v3/stock_news?apikey=${apiKey}`;
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
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles, category);
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
    const newsContainer = document.getElementById('news-category');
    newsContainer.innerHTML = ''; // Clear previous content

    // Create a title for the category
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    newsContainer.appendChild(categoryTitle);

    // Loop through the articles and create HTML elements to display them
    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-item');

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
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const category = event.target.dataset.category;
            fetchNews(category);
        });
    });
});
