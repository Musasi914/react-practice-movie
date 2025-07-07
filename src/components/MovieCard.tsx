import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { MovieType } from "../App";
import { useFavorites } from "../hooks/useFavorites";

type MovieCardProps = {
  movie: {
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
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { title, poster_path, vote_average, original_language, release_date } = movie;
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  // モーダルが開いている間、背景のスクロールを禁止
  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMovie]);

  // お気に入り切り替え
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <>
      <article className="movie-card block cursor-pointer relative" onClick={() => setSelectedMovie(movie)}>
        {/* お気に入りボタン */}
        <button className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 cursor-pointer" onClick={handleFavoriteToggle}>
          {isFavorite(movie.id) ? <span>❤️</span> : <span>🤍</span>}
        </button>
        <div>
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
            alt=""
            className=" aspect-[500/750]"
          />
        </div>
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="/star.svg" alt="" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>・</span>
            <p className="lang">{original_language}</p>
            <span>・</span>
            <div className="year">{release_date ? release_date.split("-")[0] + "-" + release_date.split("-")[1] : "N/A"}</div>
          </div>
        </div>
      </article>

      {selectedMovie &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto p-8"
            onClick={() => setSelectedMovie(null)}
          >
            <div className="bg-white text-black rounded-lg p-8 max-w-lg w-10/12 mx-auto relative h-full overflow-y-auto">
              <button className="fixed top-2 right-2 text-4xl" onClick={() => setSelectedMovie(null)}>
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                className="mb-4 w-full rounded aspect-[500/750]"
              />
              <p className="mb-2">{selectedMovie.overview}</p>
              <p className="text-sm text-gray-600">公開日: {selectedMovie.release_date}</p>
              <p className="text-sm text-gray-600">評価: {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : "N/A"}</p>
              <p className="text-sm text-gray-600">人気度: {selectedMovie.popularity ? selectedMovie.popularity.toFixed(1) : "N/A"}</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
