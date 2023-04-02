import SidebarComp from "./SidebarCard";

const sidebarStreakEls = [
    {
        svg: "fire",
        title: "Стрик",
        number: "123",
    },
    {
        svg: "hand",
        title: "Қимылдар",
        number: "123",
    },
    {
        svg: "cup",
        title: "Жетістіктер",
        number: "123",
    },
    {
        svg: "star",
        title: "Топтамалар",
        number: "123",
    },
];

const SidebarStreak = () => {
    return (
        <SidebarComp title="Сандар">
            <div className="sidebar__streak__container">
                {sidebarStreakEls.map((sidebarStreak) => (
                    <div className="sidebar__streak__el">
                        <img
                            src={`svgs/sidebar/${sidebarStreak.svg}.svg`}
                            alt={sidebarStreak.svg}
                        />
                        <div className="sidebar__streak__el__title">
                            {sidebarStreak.title}
                        </div>
                        <div className="sidebar__streak__el__number">
                            {sidebarStreak.number}
                        </div>
                    </div>
                ))}
            </div>
        </SidebarComp>
    );
};

export default SidebarStreak;
