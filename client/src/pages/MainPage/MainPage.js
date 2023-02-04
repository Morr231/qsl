import "./MainPage.sass";

import { Link } from "react-router-dom";
import { Button } from "../../components";

const MainPage = () => {
    return (
        <div className="main-page">
            <Link to="/categories">
                <Button text="Categories" />
            </Link>
        </div>
    );
};

export default MainPage;
