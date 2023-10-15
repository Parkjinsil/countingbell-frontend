import React, { useState } from "react";
import {} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import styled from "styled-components";

const Review = () => {
  const [starRating, setStarRating] = useState(0);
  const [contents, setContents] = useState("");

  const handleStarRatingChange = (event) => {
    setStarRating(event.target.value);
  };

  const handleContentsChange = (event) => {
    setContents(event.target.value);
  };

  return (
    <div>
      <label>별점: </label>
      <input
        type="number"
        min="1"
        max="5"
        value={starRating}
        onChange={handleStarRatingChange}
      />

      <label>리뷰 내용: </label>
      <textarea value={contents} onChange={handleContentsChange} />

      <button>리뷰 작성</button>
    </div>
  );
};

export default Review;
