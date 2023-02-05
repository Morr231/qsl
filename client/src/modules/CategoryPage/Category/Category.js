import React from "react";
import { Link } from "react-router-dom";

import "./Category.sass";

const Category = ({ category }) => {
    return (
        <Link
            to={`categories/${category.name}`}
            style={{ zIndex: 1000 }}
            state={category}
        >
            <div className="category">
                <div className="category__name">{category.name}</div>

                <div className="category__img__container">
                    <img
                        className="category__img"
                        src={`svgs/${category.svg}.svg`}
                        alt={category.svg}
                    />
                </div>
            </div>
        </Link>
    );
};

export default Category;
