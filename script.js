// Fetch news articles based on category
async function fetchNews(category) {
    let url = '';
    let apiKey = '';

    switch (category) {
        case 'politics':
            // Select one of the API keys for politics
            apiKey = getPoliticsApiKey();
            url = `https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=${apiKey}`;
            break;
        case 'sports':
            // Select one of the API keys for sports
            apiKey = getSportsApiKey();
            url = `https://newsapi.org/v2/top-headlines?category=sports&apiKey=${apiKey}`;
            break;
        case 'entertainment':
            // Select one of the API keys for entertainment
            apiKey = getEntertainmentApiKey();
            url = `https://newsdata.io/api/1/news?category=entertainment&apikey=${apiKey}`;
            break;
        case 'tech':
            // Select one of the API keys for tech
            apiKey = getTechApiKey();
            url = `https://newsdata.io/api/1/news?category=tech&apikey=${apiKey}`;
            break;
        case 'general':
            // Select one of the API keys for general
            apiKey = getGeneralApiKey();
            url = `https://gnews.io/api/v4/search?q=general&token=${apiKey}`;
            break;
        case 'health':
            // Select one of the API keys for health
            apiKey = getHealthApiKey();
            url = `https://worldnewsapi.com/api/1/news?category=health&apikey=${apiKey}`;
            break;
        case 'stock':
            // Select one of the API keys for stock market
            apiKey = getStockApiKey();
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

// Functions to handle API key switching logic
function getPoliticsApiKey() {
    const apiKeys = [
        'c51e28f22dee429f8536312bb87e4616',
        'bb8ca625cbb9472f92ffc37368189259',
        '69857e76af5a4b2192056b29b018fbe6',
        'fa431e5749f34a469933aabddcfe693a',
    ];
    return getApiKey(apiKeys);
}

function getSportsApiKey() {
    const apiKeys = [
        'a99ee6c059282c7aa3e69e880de401c5',
        'aa9d5a8f545c9a5ed9482bbee08823f6',
        'df96d996c3396e3f743a997b08f2cb8b',
        'e905a1b9f7fe572370499359ad353605',
    ];
    return getApiKey(apiKeys);
}

function getEntertainmentApiKey() {
    const apiKeys = [
        'pub_61364058d1e5d42e8d5feffdc614528ad2269',
        'pub_61692c2c7f2a826cb88cefe3a96c2f063653a',
        'pub_617017c12f15fd4c67bfdf268dbd891c875c3',
    ];
    return getApiKey(apiKeys);
}

function getTechApiKey() {
    const apiKeys = [
        'pub_61702195288cf5cf19a9a0a3ec3e01f9eb71',
        'd3e35d11f8d6fa9e462c64600d0bb08c',
        'f4518d06d844ec4a94f44ef15de5a2d1',
        'd58f5adca05fc96265a14f93bbb5083f',
    ];
    return getApiKey(apiKeys);
}

function getGeneralApiKey() {
    const apiKeys = ['bad2353e329d1174bd9a451e07af182'];
    return getApiKey(apiKeys);
}

function getHealthApiKey() {
    const apiKeys = ['1d16725f76aa4e6f8f651c33d428ceb8'];
    return getApiKey(apiKeys);
}

function getStockApiKey() {
    const apiKeys = [
        'ZM6Vfu42UZS4TdqfFPKGRp9MaEhZq6H4',
        'EkfiGf83oSVcam9L6CpVHWo56q5UXBpD',
        'z2bNkwqtxqUWOzmmIvj4CPHHduis6oag',
        'Fgqgamcbr8k3RpLNqgLy3yFVUevHgXt',
    ];
    return getApiKey(apiKeys);
}

// Helper function to manage API key cycling
function getApiKey(apiKeys) {
    // Try each key in sequence until a successful response is received
    for (let i = 0; i < apiKeys.length; i++) {
        if (checkApiKeyUsage(apiKeys[i])) {
            return apiKeys[i];
        }
    }
    console.error('All API keys are exhausted or invalid.');
    return '';
}

// Check if the API key can be used based on rate limits (you can implement your own logic here)
function checkApiKeyUsage(apiKey) {
    // Mock function: always returns true for now. You could implement a check against the API limits here.
    return true;
}

// Event listener for category click
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        fetchNews(category);
    });
});
