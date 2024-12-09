const apiUrls = {
    politicsIndia: 'https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=',
    politicsWorld: 'https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=',
    sports: 'https://api.mediastack.com/v1/news?access_key=',
    entertainment: 'https://newsdata.io/api/1/news?apikey=',
    tech: 'https://newsdata.io/api/1/news?apikey=',
    general: 'https://gnews.io/api/v4/search?q=general&token=',
    health: 'https://worldnewsapi.com/v2/top-headlines?country=us&category=health&apiKey=',
    stockMarket: 'https://site.financialmodelingprep.com/api/v3/stock-market-news?apikey='
};

const apiKeys = {
    politicsIndia: ['c51e28f22dee429f8536312bb87e4616', 'bb8ca625cbb9472f92ffc37368189259', '69857e76af5a4b2192056b29b018fbe6', 'fa431e5749f34a469933aabddcfe693a'],
    politicsWorld: ['7fcd9aad531f49a9b3563650aaa14da9', '7922072b454644cca2cfb08af8a66f63'],
    sports: ['a99ee6c059282c7aa3e69e880de401c5', 'aa9d5a8f545c9a5ed9482bbee08823f6', 'df96d996c3396e3f743a997b08f2cb8b', 'e905a1b9f7fe572370499359ad353605'],
    entertainment: ['pub_61364058d1e5d42e8d5feffdc614528ad2269', 'pub_61692c2c7f2a826cb88cefe3a96c2f063653a', 'pub_617017c12f15fd4c67bfdf268dbd891c875c3'],
    tech: ['pub_61702195288cf5cf19a9a0a3ec3e01f9eb71', 'd3e35d11f8d6fa9e462c64600d0bb08c', 'f4518d06d844ec4a94f44ef15de5a2d1', 'd58f5adca05fc96265a14f93bbb5083f'],
    general: ['bad2353e329d1174bd9a451e07af182'],
    health: ['1d16725f76aa4e6f8f651c33d428ceb8'],
    stockMarket: ['ZM6Vfu42UZS4TdqfFPKGRp9MaEhZq6H4', 'EkfiGf83oSVcam9L6CpVHWo56q5UXBpD', 'z2bNkwqtxqUWOzmmIvj4CPHHduis6oag', 'Fgqgamcbr8k3RpLNqgLy3yFVUevHgXt']
};

function displayNews(articles, category) {
    const categoryContainer = document.getElementById('news-' + category);
    categoryContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        categoryContainer.appendChild(articleElement);
    });
}

async function fetchNews(category) {
    let apiUrl = apiUrls[category];
    let keys = apiKeys[category];
    let apiKeyIndex = 0;
    let response;

    try {
        while (apiKeyIndex < keys.length) {
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

document.addEventListener('DOMContentLoaded', () => {
    const categories = ['politicsIndia', 'sports', 'entertainment', 'tech', 'general', 'health', 'stockMarket'];
    categories.forEach(category => {
        fetchNews(category);
    });
});
