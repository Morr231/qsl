import { useState, useRef, useEffect } from "react";

import Category from "../Category/Category";

import "./Categories.sass";

const Categories = ({ categories }) => {
    return (
        <div className="categories">
            <div className="categories__content">
                {categories.map((category, index) => (
                    <div
                        className={`categories__content__el categories-${
                            index % 2 === 0 ? "left" : "right"
                        }`}
                        style={{
                            top: index * 200 + 20 + "px",
                            left: index % 2 === 0 ? "20px" : 0,
                            right: index % 2 !== 0 ? "20px" : 0,
                        }}
                    >
                        <Category category={category} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
