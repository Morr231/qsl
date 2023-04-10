import { Link } from "react-router-dom";

import "./Navigation.sass";

const navigationEl = [
    {
        svg: "categories",
        title: "Топтама",
    },
    {
        svg: "achievements",
        title: "Жетістіктер",
    },
    {
        svg: "alphabet",
        title: "Әліпби",
    },
];

const Navigation = () => {
    console.log(navigationEl);

    return (
        <div className="navigation">
            <h2 className="navigation__header">QSL</h2>

            <nav className="navigation__main">
                {navigationEl.map((navEl) => (
                    <Link
                        to={`/${navEl.svg}`}
                        style={{ textDecoration: "none" }}
                    >
                        <li className="navigation__main__el">
                            <div className="navigation__main__el__img">
                                <img
                                    src={`svgs/nav/${navEl.svg}.svg`}
                                    alt={navEl.svg}
                                />
                            </div>
                            <div className="navigation__main__el__title">
                                {navEl.title}
                            </div>
                        </li>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Navigation;
