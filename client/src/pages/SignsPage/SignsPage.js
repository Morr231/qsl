import "./SignsPage.sass";
import { Signs } from "../../modules";
import { useLocation } from "react-router-dom";

const SignsPage = () => {
    const location = useLocation();

    const { signs } = location.state;

    return (
        <div className="signs-page">
            <Signs signs={signs} />
        </div>
    );
};

export default SignsPage;
