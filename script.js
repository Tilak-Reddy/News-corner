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
        default:
            console.error('Invalid category');
            return; // Exit early if no valid category
    }

    try {
        // Fetch data from the API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log(data); // Log for debugging
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Example invocation
fetchNews('politics');
