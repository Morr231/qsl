import { useState } from "react";
import { Link } from "react-router-dom";
import SignModal from "../../SignPage/Signs/comp/SignModal";

import "./Category.sass";

const Category = ({ category }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && <SignModal setShowModal={setShowModal} />}
            <div className="category" onClick={() => setShowModal(true)}>
                <div className="category__img__container">
                    <img
                        className="category__img"
                        src={
                            process.env.PUBLIC_URL +
                            `categories/${category.name}.png`
                        }
                        alt={category.svg}
                    />
                </div>

                <div className="category__content">
                    <div className="category__description">
                        <div className="category__level">Оңай</div>
                        <div className="category__amount">25 сөз</div>
                    </div>
                    <div className="category__name">{category.name}</div>
                    <div className="category__progress">
                        Прогресс: 50%
                        <div className="category__progress__line">
                            <div
                                className="category__progress__line__filled"
                                style={{ width: "50%" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Link>
             */}
        </>
    );
};

export default Category;
