export interface ShowData {
  id: string | number;
  name?: string;
  poster_path?: string;
  genres?: { id: number; name: string }[];
  first_air_date?: string;
  release_date?: string;
  title?: string;
  media_type?: string;
  overview?: string;
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | { id: number; name: string }[]
    | number[]
    | undefined;
}

export interface SearchResult {
  id: number;
  name?: string;
  title?: string;
  poster_path?: string;
  overview?: string;
}

export interface CastData {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  known_for_department?: string | null;
}

export interface PagesResponse {
  results: ShowData[];
  total_pages: number;
}

export interface SearchData {
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
}
