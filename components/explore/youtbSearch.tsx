import * as youtubeSearch from "youtube-search";

var opts: youtubeSearch.YouTubeSearchOptions = {
  maxResults: 10,
  key: "yourkey"
};

youtubeSearch.default("jsconf", opts, (err, results) => {
  if(err) return console.log(err);

  console.dir(results);
});