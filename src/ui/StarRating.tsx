type StarRatingProps = {
  voteAverage?: number;
};

const StarRating = ({ voteAverage }: StarRatingProps) => {
  const stars = []; // Array to store star icons
  const rating = voteAverage ? voteAverage / 2 : 0; // Convert to a 5-star scale

  // SVGs for full, half, and empty stars
  const fullStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-yellow-500"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const halfStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-yellow-500"
    >
      <path d="M12 15.4l3.76 2.27-1-4.28L18 10.5l-4.38-.38L12 6.1V15.4zm0-13.4L8.24 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27V2z" />
    </svg>
  );

  const emptyStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-yellow-500"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21zM12 4.1l2.45 5.55.61.05 5.11.43-3.9 3.38-.29.24.1.62 1.04 4.38-3.88-2.34-.34-.2-.34.2-3.88 2.34 1.04-4.38.1-.62-.29-.24-3.9-3.38 5.11-.43.61-.05L12 4.1z" />
    </svg>
  );

  // Generate full, half, and empty stars based on the rating
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<span key={`full-${i}`}>{fullStar}</span>); // Full star
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<span key={`half-${i}`}>{halfStar}</span>); // Half star
    } else {
      stars.push(<span key={`empty-${i}`}>{emptyStar}</span>); // Empty star
    }
  }

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
