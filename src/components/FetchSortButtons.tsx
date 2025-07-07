import { Button } from "./ui/button";

type FetchSortType = "popular" | "top_rated" | "upcoming";

interface FetchSortButtonsProps {
  currentSort: FetchSortType;
  onSortChange: (sort: FetchSortType) => void;
}

export default function FetchSortButtons({ currentSort, onSortChange }: FetchSortButtonsProps) {
  return (
    <div className="fetch-buttons my-4">
      <p>取得する映画の順番を並び替えるボタン</p>
      <Button variant={currentSort === "popular" ? "default" : "outline"} onClick={() => onSortChange("popular")}>
        人気順
      </Button>
      <Button variant={currentSort === "top_rated" ? "default" : "outline"} onClick={() => onSortChange("top_rated")}>
        評価順
      </Button>
      <Button variant={currentSort === "upcoming" ? "default" : "outline"} onClick={() => onSortChange("upcoming")}>
        近日公開
      </Button>
    </div>
  );
}
