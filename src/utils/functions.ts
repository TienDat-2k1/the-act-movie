import { EMBED_TO } from './contants';

export function capitalizeLetter(letter: string) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

// URL API : https://www.2embed.to/embed/tmdb/movie?id=TMDB ID
export function embedMovie(id: number | string) {
  return `${EMBED_TO}/movie?id=${id}`;
}

// URL API : https://www.2embed.to/embed/tmdb/tv?id=TMDB ID&s=SEASON NUMBER&e=EPISODE NUMBER

export function embedTv(
  id: number,
  season: number | string,
  episode: number | string
) {
  return `${EMBED_TO}/tv?id=${id}&s=${season}&e=${episode}`;
}
