import React from "react";
import "./Button.sass";

const Button = ({ text, action, styleType, type, ...props }) => {
    return (
        <>
            <button
                onClick={action}
                className={`btn ${type === "delete" ? "btn-delete" : ""}`}
                type={type}
                {...props}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
