import React from "react";
import { Link } from "react-router-dom";

import "./Category.sass";

const Category = ({ category }) => {
  return (
    <Link to={`categories/${category.name}`} state={category}>
      <div className="category">
        <div className="category__img__container">
          <img
            className="category__img"
            src={process.env.PUBLIC_URL + `categories/${category.name}.png`}
            alt={category.svg}
          />
        </div>
        <div className="category__desciption">
          <div className="category__level">Оңай</div>
          <div className="category__amount">25 сөз</div>
        </div>
        <div className="category__name">{category.name}</div>
        <div className="category__progress">
          Прогресс: 50%
          <div className="category__progress__line">
            <div className="category__progress__line__filled"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Category;
