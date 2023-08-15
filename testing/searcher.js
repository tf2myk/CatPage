function searchImages(query) {
    const apiKey = 'AIzaSyDB7Oc-bGSmGoFZeeBciKjWQSKJvM1-gWc';
    const cx = '95efce5dc355443a2';
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}&searchType=image`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the API response here
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    searchImages('https://cdn.discordapp.com/attachments/1139397747330527322/1139397815282434098/Horizontal.jpg'); // Replace with your search query
  });
  