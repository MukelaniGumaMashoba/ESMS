import * as youtubeSearch from "youtube-search";

var opts: youtubeSearch.YouTubeSearchOptions = {
  maxResults: 10,
  key: "AIzaSyCQ0LzRru-OzTv4Va3Imb8f3HBriEW3-JI"
};

youtubeSearch.default("jsconf", opts, (err, results) => {
  if(err) return console.log(err);

  console.dir(results);
});

