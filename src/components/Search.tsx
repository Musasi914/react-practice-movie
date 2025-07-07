import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

type SearchProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ setSearchTerm }: SearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const ref = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const searchValue = ref.current?.value || "";
    if (!searchValue.trim()) return;

    setShowSuggestions(false);
    setSearchTerm(searchValue);

    // 重複を削除して履歴に追加
    const newHistory = [searchValue, ...searchHistory.filter((h) => h !== searchValue)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="search relative">
      <div className="flex items-center gap-2">
        <img src="/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          ref={ref}
          className="focus-visible:ring-1 focus-visible:ring-offset-purple-600 rounded-md"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Button variant={"outline"} onClick={handleSearchClick}>
          Search
        </Button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-dark-100 rounded-lg mt-2 shadow-lg z-50">
          {searchHistory.map((term, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
              onClick={() => {
                ref.current!.value = term;
                setShowSuggestions(false);
              }}
            >
              <span className="text-gray-400 mr-2">📝</span>
              {term}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
