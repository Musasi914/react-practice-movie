import { useFavorites } from "../hooks/useFavorites";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

export default function FavoriteList() {
  const { favorites, removeFavorite } = useFavorites();

  useGSAP(() => {
    gsap.registerPlugin(Draggable);
    Draggable.create(".draggable", {
      type: "x",
      bounds: ".trending",
      inertia: true,
    });
  });

  return (
    <div className="trending">
      <h2>お気に入り映画: {favorites.length}件</h2>
      {favorites.length === 0 && (
        <div className="text-gray-400 text-center py-8">お気に入り映画がありません。検索結果からお気に入りに追加してください。</div>
      )}
      <div className="trending-container">
        <ul className="draggable">
          {favorites.map((movie, i) => (
            <li key={movie.id} className="relative">
              <p>{i + 1}</p>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <button
                className="absolute grid place-items-center bottom-[15%] right-[25%] cursor-pointer bg-red-500 hover:bg-red-600 leading-none text-white rounded-full w-5 h-5 transition-colors"
                onClick={() => removeFavorite(movie.id)}
                title="お気に入りから削除"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
