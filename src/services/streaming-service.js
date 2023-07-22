import { translateGenres } from "../utils/Genres";
import { transformStreamingPlatforms } from "../utils/StreamingPlatform";

export const searchByTitle = async (title, showType) => {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=us&show_type=${showType}&output_language=es`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ab98ecbba5msh5cdcf52e0df3675p12ae82jsn46ac48dc8682",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
    }
  };

  try {
    const res = await fetch(url, options);
    const { result } = await res.json();
    
    let shows = [];
    console.log(result);
    for (const item of result) {
      let show = {};

      show.type = item.type;
      show.title = item.title;
      show.originalTitle = item.originalTitle
      show.overview = item.overview;
      
      if(item.streamingInfo && item.streamingInfo.us) {
        show.streamingInfo = transformStreamingPlatforms(Object.keys(item.streamingInfo.us));
      }

      if(item.backdropURLs && item.backdropURLs.original) {
        show.backdropURL = item.backdropURLs.original;
      }

      show.genres = translateGenres(item.genres.map(genre => genre.id));
      
      if(item.posterURLs && item.posterURLs.original) {
        show.posterURL = item.posterURLs.original;
      }
      
      if (showType === "movie") {
        show.year = item.year;
        show.runtime = item.runtime;
      } else {
        show.firstAirYear = item.firstAirYear;
        show.lastAirYear = item.lastAirYear;
        show.seasonCount = item.seasonCount;
        show.episodeCount = item.episodeCount;
      }

      shows.push(show);
    }
    console.log(shows);
    return shows;
  } catch(e) {
    console.log(e);
  }
};