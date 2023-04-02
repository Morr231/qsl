import React from "react";
import "./Button.sass";

const Button = ({ text, action, styleType, type, ...props }) => {
    return (
        <>
            <button
                onClick={action}
                className={`btn ${
                    styleType === "delete"
                        ? "btn-delete"
                        : styleType === "outline"
                        ? "btn-outline"
                        : ""
                }`}
                type={type}
                {...props}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
