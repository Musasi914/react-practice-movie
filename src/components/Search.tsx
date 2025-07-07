import { useRef } from "react";
import { Button } from "./ui/button";

type SearchProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ setSearchTerm }: SearchProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="search" />
        <input type="text" placeholder="Search through thousands of movies" ref={ref} />
        <Button variant={"outline"} onClick={() => setSearchTerm(ref.current?.value || "")}></Button>
      </div>
    </div>
  );
}
