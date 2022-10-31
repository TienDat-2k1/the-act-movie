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

  media_type: 'movie' | 'tv' | 'person';

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
  now_Playing?: Item[] | undefined;
  popular?: Item[] | undefined;
  top_Rated?: Item[] | undefined;
  upcoming?: Item[] | undefined;
}

export interface HomeTv {
  trending?: Item[];
  airing_Today?: Item[];
  on_The_Air: Item[];
  popular: Item[];
  top_Rated: Item[];
}

interface IDetail extends Item {
  genres: { id: number; name: string }[];
  homepage: string | null;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  tagline: string | null;
}

export interface IDetailMovie extends IDetail {
  belongs_to_collection: null | object;
  budget: number;
  imdb_id: string | null;
  production_countries: {
    release_date: string;
    revenue: number;
    runtime: number | null;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post'
    | 'Production'
    | 'Released'
    | 'Canceled';
}

export interface IDetailTv extends IDetail {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: string;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  };
  next_episode_to_air: null;
  networks: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
}
