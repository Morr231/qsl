import React from "react";
import { Link } from "react-router-dom";

import "./Category.sass";

const Category = ({ category }) => {
  return (
    <Link
      to={`categories/${category.name}`}
      state={category}
      style={{ textDecoration: "none" }}
    >
      <div className="category">
        <div className="category__img__container">
          <img
            className="category__img"
            src={process.env.PUBLIC_URL + `categories/${category.name}.png`}
            alt={category.svg}
          />
        </div>
        <div
          className="category__desciption"
          style={{
            width: "200px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="category__level"
            style={{
              marginRight: "20px",
              height: "20px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F1F1FD",
              color: "#7879F1",
              borderRadius: "30%",
            }}
          >
            Оңай
          </div>
          <div
            className="category__amount"
            style={{
              height: "20px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            25 сөз
          </div>
        </div>
        <div className="category__name">{category.name}</div>
        <div className="category__progress">
          Прогресс: 50%
          <div className="category__progress__line">
            <div
              style={{ width: "50%" }}
              className="category__progress__line__filled"
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Category;
