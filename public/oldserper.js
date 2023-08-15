const apiUrl = 'https://serpapi.com/search';
const queryParams = new URLSearchParams({
  api_key: 'a45a008dfe93a8dbb1fd1f4d404720a2e57491f04284e5c854de0ed2ef3c5f8d',
  engine: 'google_lens',
  url: 'https://i.imgur.com/HBrB8p0.png'
});

const url = `${apiUrl}?${queryParams}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });