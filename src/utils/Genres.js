import GENRES from "../constants/Genres.json";

export const translateGenres = genres => {
  const filteredGenres = GENRES.filter(genre => genres.includes(genre.id));
  const translatedGenres = filteredGenres.map(genre => genre.name);
  return translatedGenres.join(", ");
};