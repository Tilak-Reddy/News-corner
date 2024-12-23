async function fetchNews(category) {
    const apiKey = 'a99ee6c059282c7aa3e69e880de401c5'; // Replace with your API key
    let url = '';

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

    // Log the generated API URL
    console.log('API URL:', url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Log the API response
        console.log('API Response:', data);

        if (data.data && data.data.length > 0) {
            displayNews(data.data, category);
        } else {
            console.warn('No articles found or invalid data format');
            document.getElementById('news-container').innerHTML = '<p>No articles available for this category.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
}
