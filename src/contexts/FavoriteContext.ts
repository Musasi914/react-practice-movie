import { createContext } from "react";
import type { MovieType } from "../App";

// お気に入りContextの型定義
export interface FavoriteContextType {
  favorites: MovieType[];
  isFavorite: (movieId: number) => boolean;
  toggleFavorite: (movie: MovieType) => void;
  addFavorite: (movie: MovieType) => void;
  removeFavorite: (movieId: number) => void;
}

// Contextを作成
export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);
