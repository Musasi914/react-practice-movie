import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
}
