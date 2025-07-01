import { ShowData, PagesResponse, CastData, SearchData } from "../_types";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH;

const headers = {
  accept: "application/json",
  ...(apiKey && { Authorization: `Bearer ${accessToken}` }),
};

const BASE_URL = "https://api.themoviedb.org/3";

const fetchData = async (url: string) => {
  const res = await fetch(url, {
    headers,
    next: { revalidate: 3600 * 2 }, // ✅ cache for 2 hour
  });
  return res.json();
};

export async function getMovies(): Promise<ShowData[]> {
  const data = await fetchData(
    `${BASE_URL}/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=1`
  );
  return data.results;
}

export async function getMoviesPages(pageNum: number): Promise<PagesResponse> {
  const data = await fetchData(
    `${BASE_URL}/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=${pageNum}`
  );
  return { results: data.results, total_pages: data.total_pages };
}

export async function getSeries(): Promise<ShowData[]> {
  const data = await fetchData(
    `${BASE_URL}/discover/tv?sort_by=vote_average.desc&vote_count.gte=1000&page=1`
  );
  return data.results;
}

export async function getSeriesPages(pageNum: number): Promise<PagesResponse> {
  const data = await fetchData(
    `${BASE_URL}/discover/tv?sort_by=vote_average.desc&vote_count.gte=500&page=${pageNum}`
  );
  return { results: data.results, total_pages: data.total_pages };
}

export async function getTrending(): Promise<ShowData[]> {
  const data = await fetchData(
    `${BASE_URL}/trending/movie/week?language=en-US`
  );
  return data.results;
}

export async function getNowPlaying(): Promise<ShowData[]> {
  const data = await fetchData(
    `${BASE_URL}/movie/now_playing?language=en-US&page=1`
  );
  return data.results;
}

export async function getCovers(): Promise<ShowData[]> {
  const data = await fetchData(
    `${BASE_URL}/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=1`
  );
  return data.results.slice(0, 5);
}

export async function getAnimeShows(): Promise<ShowData[]> {
  const data = await fetchData(
    `${BASE_URL}/discover/tv?with_keywords=210024&sort_by=vote_average.desc&vote_count.gte=1000&page=1`
  );
  return data.results;
}

export async function getAnimePages(pageNum: number): Promise<PagesResponse> {
  const data = await fetchData(
    `${BASE_URL}/discover/tv?with_keywords=210024&sort_by=vote_average.desc&vote_count.gte=1000&page=${pageNum}`
  );
  return { results: data.results, total_pages: data.total_pages };
}

export async function getShow(type: string, id: string): Promise<ShowData> {
  const data = await fetchData(`${BASE_URL}/${type}/${id}`);
  return data;
}

export async function getShowCast(
  type: string,
  id: string
): Promise<CastData[]> {
  const data = await fetchData(`${BASE_URL}/${type}/${id}/credits`);
  return data.cast;
}

export async function searchShowByName(query: string): Promise<ShowData[]> {
  const data = await fetch(
    `${BASE_URL}/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  ).then((res) => res.json());

  data.results.sort((a: SearchData, b: SearchData) => {
    if ((b.vote_average || 0) === (a.vote_average || 0)) {
      if ((b.vote_count || 0) === (a.vote_count || 0)) {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      return (b.vote_count || 0) - (a.vote_count || 0);
    }
    return (b.vote_average || 0) - (a.vote_average || 0);
  });

  return data.results;
}

export async function searchSimilarShows(
  type: string,
  showId: string
): Promise<ShowData[]> {
  const data = await fetch(
    `${BASE_URL}/${type}/${showId}/similar?api_key=${apiKey}&language=en-US&page=1`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  ).then((res) => res.json());

  data.results.sort((a: SearchData, b: SearchData) => {
    if ((b.vote_average || 0) === (a.vote_average || 0)) {
      if ((b.vote_count || 0) === (a.vote_count || 0)) {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      return (b.vote_count || 0) - (a.vote_count || 0);
    }
    return (b.vote_average || 0) - (a.vote_average || 0);
  });

  return data.results;
}
