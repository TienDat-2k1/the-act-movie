export interface Item {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: number;

  media_type: 'movie|tv|person';

  // movie item
  release_date?: string;
  original_title?: string;
  title?: string;
  video?: boolean;
  adult?: boolean;

  // tv item
  original_name?: string;
  name?: string;
  first_air_date?: string;
  origin_country?: string;

  // person item
  profile_path?: string;
}

export interface HomeMovie {
  trending?: Item[] | undefined;
  nowPlaying?: Item[] | undefined;
  popular?: Item[] | undefined;
  topRated?: Item[] | undefined;
  upcoming?: Item[] | undefined;
}
