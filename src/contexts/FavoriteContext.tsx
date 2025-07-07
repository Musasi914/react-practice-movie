import { useState, useEffect, type ReactNode } from "react";
import type { MovieType } from "../App";
import { FavoriteContext, type FavoriteContextType } from "./FavoriteContext";

// Providerコンポーネント
export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<MovieType[]>([]);

  // 初期化時にローカルストレージから読み込み
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
      }
    }
  }, []);

  // お気に入りを追加
  const addFavorite = (movie: MovieType) => {
    setFavorites((prev) => {
      // 重複チェック
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      const newFavorites = [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // お気に入りを削除
  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((movie) => movie.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // お気に入りかどうか判定
  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // お気に入りを切り替え
  const toggleFavorite = (movie: MovieType) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  // Contextの値
  const value: FavoriteContextType = {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
}
