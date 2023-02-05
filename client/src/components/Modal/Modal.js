import ReactDOM from "react-dom";

import "./Modal.sass";

const Modal = ({ children, setShowModal, showExit, top, ...props }) => {
    return ReactDOM.createPortal(
        <div className="modal" style={{ top: top }}>
            <div className="modal-main" {...props}>
                {!showExit && (
                    <div
                        className="modal-hide"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    ></div>
                )}
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default Modal;
