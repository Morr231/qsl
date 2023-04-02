import "./MainPageLayout.sass";

import { Navigation } from "../modules";

const MainPageLayout = ({ children }) => {
    return (
        <div className="main-page-layout">
            <Navigation />
            <div className="main-page-layout__children">{children}</div>
            <Navigation />
        </div>
    );
};

export default MainPageLayout;
