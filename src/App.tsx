import { useCallback, useEffect, useState } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { Button } from "./components/ui/button";
import SkeletonMovieCard from "./components/SkeletonMovieCard";

export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchMovies = useCallback(
    async (query?: string) => {
      if (!API_KEY) {
        setErrorMessage("APIキーが設定されていません");
        setMovieList([]);
        return;
      }
      try {
        setIsLoading(true);
        setErrorMessage("");
        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNumber}`
          : `${API_BASE_URL}/movie/popular?page=${pageNumber}`;
        const response = await fetch(endpoint, API_OPTIONS);
        console.log(response);
        if (!response.ok) {
          setErrorMessage("Failed to fetch movies");
          setMovieList([]);
          return;
        }
        const data = await response.json();
        setMovieList(data.results ?? []);
      } catch (error) {
        setErrorMessage("通信エラーが発生しました");
        setMovieList([]);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [pageNumber]
  );

  const handlePageMove = (pageMove: -1 | 1) => {
    setPageNumber((prev) => Math.max(1, prev + pageMove));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500); // 500ms待ってから実行

    return () => clearTimeout(handler); // 前のタイマーをクリア
  }, [searchTerm, fetchMovies, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm]);

  return (
    <main className="bg-[#030014] text-gray-200 min-h-screen">
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
        </header>

        <section className="all-movies">
          <h2 className="mt-10">All Movies</h2>
          {isLoading ? (
            <div className="movie-list">
              {Array.from({ length: 20 }).map((_, i) => (
                <SkeletonMovieCard key={i} />
              ))}
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <div className="mt-8 flex justify-center items-center gap-3">
                <Button onClick={() => handlePageMove(-1)} disabled={pageNumber === 1 || isLoading}>
                  back
                </Button>
                <span className="border-gray-300 border rounded-sm px-4 py-2 text-sm">{pageNumber}</span>
                <Button onClick={() => handlePageMove(1)} disabled={movieList.length < 20 || isLoading}>
                  next
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
