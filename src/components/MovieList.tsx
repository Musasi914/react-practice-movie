import { useMemo } from "react";
import MovieCard from "./MovieCard";
import type { MovieType } from "../App";
import { Button } from "./ui/button";
import FilterPanel from "./FilterPanel";

type LocalSortType = "popularity" | "vote_average" | "release_date";

interface FilterOptions {
  year: string;
  rating: string;
}

interface MovieListProps {
  movies: MovieType[];
  currentSort: LocalSortType;
  onSortChange: (sort: LocalSortType) => void;
  onFilterChange: (filters: FilterOptions) => void;
  currentFilter: FilterOptions;
}

const sortMovies = (movies: MovieType[], sortType: LocalSortType): MovieType[] => {
  return [...movies].sort((a: MovieType, b: MovieType) => {
    switch (sortType) {
      case "popularity":
        return b.popularity - a.popularity;
      case "vote_average":
        return b.vote_average - a.vote_average;
      case "release_date":
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      default:
        return 0;
    }
  });
};

export default function MovieList({ movies, currentSort, onSortChange, onFilterChange, currentFilter }: MovieListProps) {
  const sortedMovies = useMemo(() => {
    return sortMovies(movies, currentSort);
  }, [movies, currentSort]);

  const filteredMovies = useMemo(() => {
    return sortedMovies
      .filter((movie) => {
        return movie.release_date.includes(currentFilter.year);
      })
      .filter((movie) => {
        return movie.vote_average >= Number(currentFilter.rating);
      });
  }, [sortedMovies, currentFilter]);

  return (
    <div className="movie-list-wrapper">
      <div className="sort-buttons my-4">
        <p>取得した20件の中での並び替え</p>
        <Button variant={currentSort === "popularity" ? "default" : "outline"} onClick={() => onSortChange("popularity")}>
          人気順
        </Button>
        <Button variant={currentSort === "vote_average" ? "default" : "outline"} onClick={() => onSortChange("vote_average")}>
          評価順
        </Button>
        <Button variant={currentSort === "release_date" ? "default" : "outline"} onClick={() => onSortChange("release_date")}>
          新着順
        </Button>
      </div>
      <h2 className="mt-10">All Movies</h2>
      <FilterPanel onFilterChange={onFilterChange} currentFilter={currentFilter} />
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
