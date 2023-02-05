import { useState, useRef, useEffect } from "react";

import Category from "../Category/Category";

import "./Categories.sass";

function adjustLine(from, to, line) {
    var fT = from.offsetTop + from.offsetHeight / 2;
    var tT = to.offsetTop + to.offsetHeight / 2;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;

    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = (180 / Math.PI) * Math.acos(CA / H);

    if (tT > fT) {
        var top = (tT - fT) / 2 + fT;
    } else {
        var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
        var left = (tL - fL) / 2 + fL;
    } else {
        var left = (fL - tL) / 2 + tL;
    }

    if (
        (fT < tT && fL < tL) ||
        (tT < fT && tL < fL) ||
        (fT > tT && fL > tL) ||
        (tT > fT && tL > fL)
    ) {
        ANG *= -1;
    }
    top -= H / 2;

    line.style["-webkit-transform"] = "rotate(" + ANG + "deg)";
    line.style["-moz-transform"] = "rotate(" + ANG + "deg)";
    line.style["-ms-transform"] = "rotate(" + ANG + "deg)";
    line.style["-o-transform"] = "rotate(" + ANG + "deg)";
    line.style["-transform"] = "rotate(" + ANG + "deg)";
    line.style.top = top + "px";
    line.style.left = left + "px";
    line.style.height = H + "px";
}

const Categories = ({ categories }) => {
    const containers = useRef([]);
    const lines = useRef([]);

    useEffect(() => {
        if (containers.current[0]) {
            adjustLine(
                containers.current[0],
                containers.current[1],
                lines.current[0]
            );
        }
    }, [containers]);

    return (
        <div className="categories">
            {new Array(categories.length - 1).fill(0).map((_, indexi) => (
                <div className="categories__content">
                    {categories
                        .filter(
                            (_, indexj) =>
                                indexj === indexi || indexj - 1 === indexi
                        )
                        .map((category, index) => (
                            <div
                                className={`categories__content__el categories-${
                                    index % 2 === 0 ? "left" : "right"
                                }`}
                                ref={(el) => (containers.current[index] = el)}
                                style={{
                                    top: index * 100 + 20 + "px",
                                    left: index % 2 === 0 ? "20px" : 0,
                                    right: index % 2 !== 0 ? "20px" : 0,
                                }}
                            >
                                <Category category={category} />
                            </div>
                        ))}

                    {new Array(categories.length - 1)
                        .fill(0)
                        .filter(
                            (_, indexj) =>
                                indexj === indexi || indexj - 1 === indexi
                        )
                        .map((line, index) => (
                            <div
                                className="categories__line"
                                ref={(el) => (lines.current[index] = el)}
                            ></div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default Categories;
