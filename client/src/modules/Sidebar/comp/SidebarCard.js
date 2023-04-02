const SidebarComp = ({ title, children }) => {
    return (
        <div className="sidebar__card">
            <div className="sidebar__card__title">{title}</div>
            {children}
        </div>
    );
};

export default SidebarComp;
