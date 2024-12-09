// List of API keys for different categories
const apiKeys = {
    politics: [
        'c51e28f22dee429f8536312bb87e4616', 
        'bb8ca625cbb9472f92ffc37368189259', 
        '69857e76af5a4b2192056b29b018fbe6', 
        'fa431e5749f34a469933aabddcfe693a'
    ],
    sports: [
        'a99ee6c059282c7aa3e69e880de401c5', 
        'aa9d5a8f545c9a5ed9482bbee08823f6', 
        'df96d996c3396e3f743a997b08f2cb8b', 
        'e905a1b9f7fe572370499359ad353605'
    ],
    entertainment: [
        'pub_61364058d1e5d42e8d5feffdc614528ad2269', 
        'pub_61692c2c7f2a826cb88cefe3a96c2f063653a', 
        'pub_617017c12f15fd4c67bfdf268dbd891c875c3'
    ],
    tech: [
        'pub_61702195288cf5cf19a9a0a3ec3e01f9eb71', 
        'd3e35d11f8d6fa9e462c64600d0bb08c', 
        'f4518d06d844ec4a94f44ef15de5a2d1', 
        'd58f5adca05fc96265a14f93bbb5083f'
    ],
    general: [
        'bad2353e329d1174bd9a451e07af182'
    ],
    health: [
        '1d16725f76aa4e6f8f651c33d428ceb8'
    ],
    stockMarket: [
        'ZM6Vfu42UZS4TdqfFPKGRp9MaEhZq6H4', 
        'EkfiGf83oSVcam9L6CpVHWo56q5UXBpD', 
        'z2bNkwqtxqUWOzmmIvj4CPHHduis6oag', 
        'Fgqgamcbr8k3RpLNqgLy3yFVUevHgXt'
    ]
};

// API URLs
const apiUrls = {
    politics: "https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=",
    sports: "https://mediastack.com/v1/news?category=sports&access_key=",
    entertainment: "https://newsdata.io/api/1/news?apikey=",
    tech: "https://gnews.io/api/v4/search?q=tech&token=",
    general: "https://gnews.io/api/v4/search?q=general&token=",
    health: "https://worldnewsapi.com/console/api/v1/news?category=health&apiKey=",
    stockMarket: "https://site.financialmodelingprep.com/api/v3/stock_news?apikey="
};

// Fetch data for each category
async function fetchNews(category) {
    let apiUrl = apiUrls[category];
    let keys = apiKeys[category];
    let apiKeyIndex = 0; // Start from the first API key
    let response;
    
    try {
        // Loop through API keys if one is exhausted
        while (apiKeyIndex < keys.length) {
            response = await fetch(apiUrl + keys[apiKeyIndex]);
            
            if (response.status === 426) {
                console.error(`API key ${keys[apiKeyIndex]} requires upgrade. Trying next key...`);
                apiKeyIndex++; // Try next API key
                continue;
            }
            
            const data = await response.json();

            // Check if data is valid
            if (data.articles) {
                console.log(data); // Log data for debugging
                displayNews(data.articles, category);
                break; // Exit loop if news is fetched successfully
            } else {
                console.error('No articles found or invalid data format');
                apiKeyIndex++; // Try the next API key
            }
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('news-category').innerHTML = 'Error fetching news. Please try again later.';
    }
}

// Display the fetched news articles
function displayNews(articles, category) {
    const newsContainer = document.getElementById('news-category');
    newsContainer.innerHTML = '';

    if (articles && articles.length > 0) {
        articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    } else {
        newsContainer.innerHTML = 'No news available at the moment.';
    }
}

// Trigger news fetch for each category when clicked
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = event.target.dataset.category;
        fetchNews(category);
    });
});

// Example of triggering fetch for a specific category (e.g., politics) on page load
fetchNews('politics');
