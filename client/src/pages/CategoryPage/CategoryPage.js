import "./CategoryPage.sass";
import { Categories } from "../../modules";

const categories = [
    {
        name: "Әңгіме",
        svg: "talk",
        signs: [
            {
                name: "Сәлем",
                svg: "hello",
            },
        ],
    },
    {
        name: "temp",
        svg: "talk",
    },
];

const CategoryPage = () => {
    return (
        <div className="category-page">
            {/* <div className="category-page__header">Categories</div> */}
            <Categories categories={categories} />
        </div>
    );
};

export default CategoryPage;
