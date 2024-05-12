import React from "react";

interface StarRatingProps {
  stars: number;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ stars, onChange }) => {
  const renderStars = () => {
    const starComponents: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      starComponents.push(
        <span
          key={i}
          style={{ color: i <= stars ? "gold" : "gray", cursor: "pointer" }}
          onClick={() => onChange(i)}
        >
          &#9733;
        </span>
      );
    }
    return starComponents;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
