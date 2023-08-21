//Search Cats Function Conntroller
require('dotenv').config();
const serpaAPIkeys = process.env.serpKEY;
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(serpaAPIkeys);

const searchcats = async (req, res) => {
  return new Promise((resolve) => {
    const params = {
      engine: "google_lens",
      url: "https://cdn.discordapp.com/attachments/1139397747330527322/1139397815282434098/Horizontal.jpg"
    };

    const callback = function(data) {
        resolve(data);
        
    };

    search.json(params, callback);
    console.log("searchcats ran");
    
  });

  
};

module.exports = searchcats;



