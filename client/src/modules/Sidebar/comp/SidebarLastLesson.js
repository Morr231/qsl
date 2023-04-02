import SidebarComp from "./SidebarCard";
import { Button } from "../../../components";

const SidebarLastLesson = () => {
    return (
        <SidebarComp title="Сабақты жалғастыру">
            <div className="sidebar__last-lesson__container">
                <h2 className="sidebar__last-lesson__header">Бүгін күн ашық</h2>
                <div className="sidebar__last-lesson__title">
                    Ауа райы топтамасында
                </div>

                <div className="sidebar__last-lesson__progress">
                    <div className="sidebar__last-lesson__progress__number">
                        Прогресс: 75%
                    </div>
                    <div className="sidebar__last-lesson__progress-bar">
                        <div
                            className="sidebar__last-lesson__progress-bar__fill"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                </div>
                <Button
                    text="Жалғастыру"
                    styleType="outline"
                    style={{ marginTop: "5px" }}
                />
            </div>
        </SidebarComp>
    );
};

export default SidebarLastLesson;
