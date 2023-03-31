import { EMBED_TO } from './contants';
import { Bookmark, History } from './types';

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

export function addOrRemove<T extends Bookmark | History>(
  array: T[],
  newElement: T
): T[] {
  const existingItem = array.findIndex(element => element.id === newElement.id);

  if (existingItem === -1) {
    return [...array, newElement];
  } else {
    return array.filter(element => element.id !== newElement.id);
  }
}

export function addHistory<T extends History>(array: T[], newElement: T): T[] {
  const existingItem = array.findIndex(element => element.id === newElement.id);

  if (existingItem === -1) {
    return [...array, newElement];
  } else {
    return array.splice(existingItem, 1, newElement);
  }
}
