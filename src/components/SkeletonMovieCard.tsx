import Spinner from "./Spinner";

export default function SkeletonMovieCard() {
  return (
    <article className="movie-card block cursor-pointer">
      <div>
        <div className="bg-gray-800 aspect-[500/750]" />
      </div>
      <div className="mt-4 grid items-center justify-center py-2">
        <Spinner />
      </div>
    </article>
  );
}
