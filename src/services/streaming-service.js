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
    
    for (const item of result) {
      let show = {};

      show.imdbId = item.imdbId;
      show.type = item.type;
      show.title = item.title;
      show.originalTitle = item.originalTitle
      show.overview = item.overview;
      show.genres = translateGenres(item.genres.map(genre => genre.id));
      show.cast = item.cast.join(", ");

      if(item.streamingInfo && item.streamingInfo.us) {
        show.streamingInfo = transformStreamingPlatforms(Object.keys(item.streamingInfo.us));
      }

      if(item.backdropURLs && item.backdropURLs.original) {
        show.backdropURL = item.backdropURLs.original;
      }
      
      if(item.posterURLs && item.posterURLs.original) {
        show.posterURL = item.posterURLs.original;
      }
      
      if (showType === "movie") {
        show.directors = item.directors.join(", ");
        show.year = item.year;
        show.runtime = item.runtime;
      } else {
        show.creators = item.creators.join(", ");
        show.firstAirYear = item.firstAirYear;
        show.lastAirYear = item.lastAirYear;
        show.seasonCount = item.seasonCount;
        show.episodeCount = item.episodeCount;
      }
      
      shows.push(show);
    }
    
    return shows;
  } catch(e) {
    console.log(e);
  }
};