import { useState, useRef, useEffect } from "react";

import Category from "../Category/Category";

import "./Categories.sass";

const Categories = ({ categories }) => {
  return (
    <div style={{ width: "100%" }} className="categories">
      <div
        className="categories__content"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "100%",
          height: "100%",
        }}
      >
        {categories.map((category, index) => (
          <div>
            <Category category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
