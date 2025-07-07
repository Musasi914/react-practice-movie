import { useState } from "react";
import Search from "./components/Search";
import SkeletonMovieCard from "./components/SkeletonMovieCard";
import MovieList from "./components/MovieList";
import FetchSortButtons from "./components/FetchSortButtons";
import Pagination from "./components/Pagination";
import { useMovies } from "./hooks/useMovies";
import FavoriteList from "./components/FavoriteList";

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

type LocalSortType = "popularity" | "vote_average" | "release_date";

interface FilterOptions {
  year: string;
  rating: string;
}

export default function App() {
  const { searchTerm, setSearchTerm, errorMessage, movieList, isLoading, pageNumber, currentFetchSort, handlePageMove, handleFetchSort } =
    useMovies();

  const [currentLocalSort, setCurrentLocalSort] = useState<LocalSortType>("popularity");

  // FetchSortに応じてLocalSortを自動設定
  const handleFetchSortWithLocalSync = (sort: "popular" | "top_rated" | "upcoming") => {
    handleFetchSort(sort);

    // FetchSortに応じてLocalSortを自動設定
    const localSortMap: Record<"popular" | "top_rated" | "upcoming", LocalSortType> = {
      popular: "popularity",
      top_rated: "vote_average",
      upcoming: "release_date",
    };
    setCurrentLocalSort(localSortMap[sort]);
  };

  const [currentFilter, setCurrentFilter] = useState<FilterOptions>({
    year: "",
    rating: "",
  });

  const handleFilterChange = (filters: FilterOptions) => {
    setCurrentFilter(filters);
  };

  return (
    <main className="bg-[#030014] text-gray-200 min-h-screen">
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search setSearchTerm={setSearchTerm} />
        </header>

        {searchTerm === "" && <FavoriteList />}

        <section className="all-movies">
          {isLoading ? (
            <div className="movie-list">
              {Array.from({ length: 20 }).map((_, i) => (
                <SkeletonMovieCard key={i} />
              ))}
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <FetchSortButtons currentSort={currentFetchSort} onSortChange={handleFetchSortWithLocalSync} />
              <MovieList
                movies={movieList}
                currentSort={currentLocalSort}
                onSortChange={setCurrentLocalSort}
                onFilterChange={handleFilterChange}
                currentFilter={currentFilter}
              />
              <Pagination
                currentPage={pageNumber}
                onPageChange={handlePageMove}
                isLoading={isLoading}
                hasMorePages={movieList.length === 20}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
