const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("a45a008dfe93a8dbb1fd1f4d404720a2e57491f04284e5c854de0ed2ef3c5f8d");

const params = {
  engine: "google_lens",
  url: "https://i.imgur.com/HBrB8p0.png"
};

const callback = function(data) {
  console.log(data);
};


// Show result as JSON
search.json(params, callback);