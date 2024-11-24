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

interface searchData {
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
}
type pagesResponse = { results: ShowData[]; total_pages: number };
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH;

const options = {
  headers: {
    accept: "application/json",
    ...(apiKey && { Authorization: `Bearer ${accessToken}` }),
  },
};

export async function getMovies(): Promise<ShowData[]> {
  const url =
    "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=1";

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}
export async function getMoviesPages(pageNum: number): Promise<pagesResponse> {
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=${pageNum}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return { results: data.results, total_pages: data.total_pages };
}

export async function getSeries(): Promise<ShowData[]> {
  const url =
    "https://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&vote_count.gte=1000&page=1";

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}
export async function getSeriesPages(pageNum: number): Promise<pagesResponse> {
  const url = `https://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&vote_count.gte=500&page=${pageNum}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return { results: data.results, total_pages: data.total_pages };
}

export async function getTrending() {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getNowPlaying() {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
}

export async function getCovers() {
  const movieUrl =
    "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=1";

  const movieRes = await fetch(movieUrl, options);
  const movieData = await movieRes.json();
  return movieData.results.slice(0, 5);
}

export async function getAnimeShows(): Promise<ShowData[]> {
  const url =
    "https://api.themoviedb.org/3/discover/tv?with_keywords=210024&sort_by=vote_average.desc&vote_count.gte=1000&page=1";
  const res = await fetch(url, options);
  const data = await res.json();
  const shows = data.results;

  return shows;
}

export async function getAnimePages(pageNum: number): Promise<pagesResponse> {
  const url = `https://api.themoviedb.org/3/discover/tv?with_keywords=210024&sort_by=vote_average.desc&vote_count.gte=1000&page=${pageNum}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return { results: data.results, total_pages: data.total_pages };
}

export async function getShow(type: string, id: string): Promise<ShowData> {
  const url = `https://api.themoviedb.org/3/${type}/${id}`;
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
}

export async function getShowCast(
  type: string,
  id: string
): Promise<CastData[]> {
  const url = `https://api.themoviedb.org/3/${type}/${id}/credits`;
  const res = await fetch(url, options);
  const data = await res.json();
  return data.cast;
}

export async function searchShowByName(query: string): Promise<ShowData[]> {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  const Res = await fetch(url);
  const tvData = await Res.json();

  tvData.results.sort((a: searchData, b: searchData) => {
    if ((b.vote_average || 0) === (a.vote_average || 0)) {
      if ((b.vote_count || 0) === (a.vote_count || 0)) {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      return (b.vote_count || 0) - (a.vote_count || 0);
    }
    return (b.vote_average || 0) - (a.vote_average || 0);
  });

  return tvData.results;
}

export async function searchSimilarShows(
  type: string,
  showId: string
): Promise<ShowData[]> {
  const url = `https://api.themoviedb.org/3/${type}/${showId}/similar?api_key=${apiKey}&language=en-US&page=1`;

  const response = await fetch(url);
  const similarShowsData = await response.json();

  similarShowsData.results?.sort((a: searchData, b: searchData) => {
    if ((b.vote_average || 0) === (a.vote_average || 0)) {
      if ((b.vote_count || 0) === (a.vote_count || 0)) {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      return (b.vote_count || 0) - (a.vote_count || 0);
    }
    return (b.vote_average || 0) - (a.vote_average || 0);
  });

  return similarShowsData.results;
}
