import "./CategoryPage.sass";
import { Categories } from "../../modules";

const categories = [
  {
    name: "Ауа райы",
    svg: "talk",
  },
  {
    name: "Навигация",
    svg: "talk",
  },
  {
    name: "Танысу",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
  {
    name: "Отбасы",
    svg: "talk",
  },
];

const CategoryPage = () => {
  return (
    <div className="category-page" style={{ height: "100vh", width: "100wh" }}>
      {/* <div className="category-page__header">Categories</div> */}
      <div style={{ margin: "5%", height: "100%", width: "90%" }}>
        <h1 style={{ color: "#3E86F5", fontSize: "4vh" }}>Топтама</h1>
        <Categories categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
