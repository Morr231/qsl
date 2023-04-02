import "./Sidebar.sass";

import SidebarStreak from "./comp/SidebarStreak";
import SidebarLastLesson from "./comp/SidebarLastLesson";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarStreak />
            <SidebarLastLesson />
        </div>
    );
};

export default Sidebar;
