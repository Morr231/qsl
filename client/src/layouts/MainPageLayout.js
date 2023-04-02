import "./MainPageLayout.sass";

import { Navigation } from "../modules";

const MainPageLayout = ({ children }) => {
    return (
        <div className="main-page-layout">
            <Navigation />
            <div className="main-page-layout__children">{children}</div>
        </div>
    );
};

export default MainPageLayout;
