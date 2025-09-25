// src/components/ProductEvents.js
import React from "react";

const ProductEvents = ({ chain }) => {
  return (
    <div>
      <h4>Supply Chain Events:</h4>
      <ul>
        {chain.map((block, idx) => (
          <li key={idx}>
            {block.data.type}: {block.data.stage || block.data.note} by {block.data.actor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductEvents;
