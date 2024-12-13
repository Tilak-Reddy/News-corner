async function fetchNews(category) {
    let url = ''; 
    const apiKey = 'a99ee6c059282c7aa3e69e880de401c5'; // Use your Mediastack API key here

    switch (category) {
        case 'politics':
            url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=politics&languages=en`;
            break;
        case 'sports':
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
        const response = await fetch(url); // Ensure URL is correctly passed
        console.log('API Response:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (data.data && data.data.length > 0) {
            displayNews(data.data, category);
        } else {
            console.error('No articles found for the selected category.');
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
}
