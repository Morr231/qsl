import Category from "../Category/Category";

const Categories = ({ categories }) => {
    return (
        <div className="categories">
            {categories.map((category) => (
                <Category />
            ))}
        </div>
    );
};

export default Categories;
