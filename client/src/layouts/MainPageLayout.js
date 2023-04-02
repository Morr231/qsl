import "./MainPageLayout.sass";

import { Navigation, Sidebar } from "../modules";

const MainPageLayout = ({ children }) => {
    return (
        <div className="main-page-layout">
            <Navigation />
            <div className="main-page-layout__children">{children}</div>
            <Sidebar />
        </div>
    );
};

export default MainPageLayout;
