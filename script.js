// Define API URLs for each category
const apiUrls = {
    politics: 'https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=',
    sports: 'https://api.mediastack.com/v1/news?access_key=',
    entertainment: 'https://newsdata.io/api/1/news?apikey=',
    tech: 'https://gnews.io/api/v4/search?q=tech&token=',
    general: 'https://gnews.io/api/v4/search?q=general&token=',
    health: 'https://worldnewsapi.com/console/?apikey=',
    stockMarket: 'https://financialmodelingprep.com/api/v3/stock_market_news?apikey='
};

// Define API Keys for each category
const apiKeys = {
    politics: [
        'c51e28f22dee429f8536312bb87e4616', 'bb8ca625cbb9472f92ffc37368189259', 
        '69857e76af5a4b2192056b29b018fbe6', 'fa431e5749f34a469933aabddcfe693a'
    ],
    sports: [
        'a99ee6c059282c7aa3e69e880de401c5', 'aa9d5a8f545c9a5ed9482bbee08823f6', 
        'df96d996c3396e3f743a997b08f2cb8b', 'e905a1b9f7fe572370499359ad353605'
    ],
    entertainment: [
        'pub_61364058d1e5d42e8d5feffdc614528ad2269', 'pub_61692c2c7f2a826cb88cefe3a96c2f063653a', 
        'pub_617017c12f15fd4c67bfdf268dbd891c875c3'
    ],
    tech: [
        'pub_61702195288cf5cf19a9a0a3ec3e01f9eb71', 'd3e35d11f8d6fa9e462c64600d0bb08c', 
        'f4518d06d844ec4a94f44ef15de5a2d1', 'd58f5adca05fc96265a14f93bbb5083f'
    ],
    general: [
        'bad2353e329d1174bd9a451e07af182'
    ],
    health: [
        '1d16725f76aa4e6f8f651c33d428ceb8'
    ],
    stockMarket: [
        'ZM6Vfu42UZS4TdqfFPKGRp9MaEhZq6H4', 'EkfiGf83oSVcam9L6CpVHWo56q5UXBpD', 
        'z2bNkwqtxqUWOzmmIvj4CPHHduis6oag', 'Fgqgamcbr8k3RpLNqgLy3yFVUevHgXt'
    ]
};

// Function to display news articles
function displayNews(articles, category) {
    let newsContainer = document.getElementById(`${category}-news`);
    newsContainer.innerHTML = ''; // Clear previous news

    articles.forEach(article => {
        let articleElement = document.createElement('div');
        articleElement.classList.add('news-item');

        let title = document.createElement('h3');
        title.innerText = article.title;
        articleElement.appendChild(title);

        let description = document.createElement('p');
        description.innerText = article.description;
        articleElement.appendChild(description);

        let link = document.createElement('a');
        link.href = article.url;
        link.innerText = 'Read more';
        link.target = '_blank';
        articleElement.appendChild(link);

        newsContainer.appendChild(articleElement);
    });
}

// Function to fetch news from the API
async function fetchNews(category) {
    let apiUrl = apiUrls[category];
    let keys = apiKeys[category];
    let apiKeyIndex = 0;
    let response;

    try {
        while (apiKeyIndex < keys.length) {
            console.log(`Attempting with API key ${keys[apiKeyIndex]}`);
            response = await fetch(apiUrl + keys[apiKeyIndex]);

            if (response.status === 426) {
                console.error(`API key ${keys[apiKeyIndex]} requires upgrade. Trying next key...`);
                apiKeyIndex++;
                continue;
            }

            if (response.status === 401) {
                console.error('Unauthorized access. Please check your API key.');
                break;
            }

            if (!response.ok) {
                console.error('Failed to fetch data, status code:', response.status);
                break;
            }

            const data = await response.json();
            console.log('Fetched data:', data);  // Log the response data to check it

            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles, category);
                break; // Successfully fetched news
            } else {
                console.error('No articles found or invalid data format');
                apiKeyIndex++;
            }
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('news-category').innerHTML = 'Error fetching news. Please try again later.';
    }
}

// Function to handle category click
function handleCategoryClick(event) {
    const category = event.target.dataset.category;
    fetchNews(category);
}

// Add event listeners to category links
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', handleCategoryClick);
});
