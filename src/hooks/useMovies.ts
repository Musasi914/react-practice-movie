import { useCallback, useEffect, useState } from "react";
import type { MovieType } from "../App";

type FetchSortType = "popular" | "top_rated" | "upcoming";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export function useMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentFetchSort, setCurrentFetchSort] = useState<FetchSortType>("popular");

  const fetchMovies = useCallback(
    async (query?: string, sort: FetchSortType = "popular") => {
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
          : `${API_BASE_URL}/movie/${sort}?page=${pageNumber}`;
        const response = await fetch(endpoint, API_OPTIONS);
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

    // ページ切り替え時にページ上部にスクロール
    setTimeout(() => {
      window.scrollTo({
        top: 800,
        behavior: "smooth",
      });
    }, 100); // 少し遅延を入れて、新しいコンテンツが読み込まれてからスクロール
  };

  const handleFetchSort = (sort: FetchSortType) => {
    setCurrentFetchSort(sort);
  };

  useEffect(() => {
    fetchMovies(searchTerm, currentFetchSort);
  }, [searchTerm, fetchMovies, pageNumber, currentFetchSort]);

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    errorMessage,
    movieList,
    setMovieList,
    isLoading,
    pageNumber,
    currentFetchSort,
    handlePageMove,
    handleFetchSort,
  };
}
